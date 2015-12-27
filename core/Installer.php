<?php

class Installer {

    private $db_conn;

    function __construct() {
        /*
         * 1. welcome screen
         * 2. DB connection data
         * 3. check if database exist if yes - drop it and enter definitions
         * 4. register admin account
         * 5. choose templates for public and admin
         * 6. choose plugins to be activated
         * 7. collect website data - site name, owner, contact info and other optional data
         * 8. where do you want to go - public or admin
         */
        $request = $_REQUEST;
        
        $this->smarty = \SmartyInstance::getInstance()->smarty;
        $this->smarty->current_theme = 'base';

        $step = isset($request['step']) ? 'step_' . $request['step'] : 'step_begin';
        $next_step = isset($request['next_step']) ? 'step_' . $request['next_step'] : 'step_begin';
        
        switch ($step) {
            case 'step_begin':
                $this->{$next_step}();
                break;
            case 'step_db_data':
                $db_data = $_REQUEST;
                if (!isset($db_data['db_host']) or $db_data['db_host'] == '') {
                    $db_data['db_host'] = 'localhost';
                }
                if (!isset($db_data['db_name']) or $db_data['db_name'] == '') {
                    $db_data['db_name'] = 'wyssi';
                }
                $this->saveDbConnectionData($db_data);
                break;
            case 'step_reg_admin':
                $this->registerAdmin($request);
                $this->{$next_step}();
                break;
            case 'step_choose_themes':
                $this->setSelectedThemes($request);
                $this->{$next_step}();
                break;
            case 'step_collect_data':
                $this->saveSiteData($request);
                echo json_encode(Array('redirect_url' => MAIN_DIR . ADMIN_DIR));
                break;

            default:
                break;
        }
    }

    public function step_begin() {
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $this->smarty->display($this->smarty->current_theme . '/Installer/index.tpl');
        } else {
            $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/index.tpl');
            $this->smarty->display($this->smarty->current_theme . '/index.tpl');
        }
    }

    public function step_db_data() {
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $this->smarty->display($this->smarty->current_theme . '/Installer/db_data.tpl');
        } else {
            $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/index.tpl');
            $this->smarty->display($this->smarty->current_theme . '/index.tpl');
        }
    }

    public function saveDbConnectionData($data) {
        $user_constants_file = fopen(CORE_DIR . 'user_constants.php', 'w') or die('Unable to open file!');
        $file_content = "<?php\n";
        $file_content .= "define('DB_HOST', '" . $data['db_host'] . "');\n";
        $file_content .= "define('DB_NAME', '" . $data['db_name'] . "');\n";
        $file_content .= "define('DB_USER', '" . $data['db_user'] . "');\n";
        $file_content .= "define('DB_PASS', '" . $data['db_pass'] . "');\n";
        $file_content .= "?>";
        fwrite($user_constants_file, $file_content);
        fclose($user_constants_file);
        $this->connectToDB();
        $this->setupDatabase();
        $this->step_reg_admin();
    }

    public function connectToDB() {
        try {
            $this->db_conn = new PDO('mysql:host=' . DB_HOST, DB_USER, DB_PASS, array(
                PDO::ATTR_PERSISTENT => true
            ));
        } catch (PDOException $ex) {
            var_dump($ex->getMessage());
        }
    }

    public function setupDatabase() {
        if (file_exists(DB_DUMP_DIR . DB_DUMP_FILE_NAME)) {
            $sql_file_orig = file_get_contents(DB_DUMP_DIR . DB_DUMP_FILE_NAME);
            $sql_file = preg_replace('/\-\-(.*)\n/', '', $sql_file_orig);
            $sql = preg_replace('/;/', ";\n", preg_replace('/\n/', "", preg_replace('/;{2,}/', "", $sql_file)));

            try {
                $this->db_conn->exec('CREATE DATABASE IF NOT EXISTS ' . DB_NAME);
                $this->db_conn->exec('USE ' . DB_NAME);

                $stmt = $this->db_conn->prepare($sql);
                $stmt->execute();
            } catch (PDOException $ex) {
                var_dump($ex->getMessage());
            }
        } else {
            die('Database definition file is mising!');
        }
    }

    public function step_reg_admin() {
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $this->smarty->display($this->smarty->current_theme . '/Installer/register_admin.tpl');
        } else {
            $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/register_admin.tpl');
            $this->smarty->display($this->smarty->current_theme . '/index.tpl');
        }
    }

    public function registerAdmin($request) {
        $this->connectToDB();
        
        try {
            $q = 'INSERT INTO users (username, password, first_name, last_name, role, avatar) VALUES ("' . $request['username'] . '", "' . $request['password'] . '", "' . $request['first_name'] . '", "' . $request['last_name'] . '", "admin", "")';
            $stmnt = $this->db_conn->prepare($q);
            $stmnt->execute();
            
            $_SESSION['user'] = Array();
            unset($request['step']);
            unset($request['next_step']);
            foreach ($request as $key => $value)
                $_SESSION['user'][$key] = $value;
            
        } catch (PDOException $ex) {
            var_dump($ex->getMessage());
        }
    }

    public function step_choose_themes() {
        
        $themes = $this->_scanForThemes();
        
        $this->smarty->assign('themes', $themes);
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $this->smarty->display($this->smarty->current_theme . '/Installer/choose_themes.tpl');
        } else {
            $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/choose_themes.tpl');
            $this->smarty->display($this->smarty->current_theme . '/index.tpl');
        }
    }
    
    private function _scanForThemes($dir = THEMES_DIR) {
        $results = Array();
        $files = scandir($dir);
        foreach ($files as $key => $value) {
            if ($value != '.' && $value != '..') {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (is_dir($path) and file_exists($path . DIRECTORY_SEPARATOR . 'settings.json')) {
                    $results[] = $path . DIRECTORY_SEPARATOR . 'settings.json';
                }
                // if you want to search recursively:
                // else {
                //    $this->_scanForThemes($path, $results);
                //}
            }
        }
        $themes = Array();
        foreach ($results as $theme) {
            $t_s = json_decode(file_get_contents($theme));
            $ta = explode(DIRECTORY_SEPARATOR, $theme);
            $t_s->theme_path = $ta[count($ta)-2];
            $themes[] = $t_s;
        }
        
        return $this->_insertThemes($themes);
    }
    
    private function _insertThemes($themes){
        $values = '';
        foreach ($themes as $theme) {
            $values .= '(';
            $values .= "'" . $theme->theme_name . "', '" . $theme->theme_type . "', '" . $theme->theme_path . "'";
            $values .= '),';
        }
        $values = rtrim($values, ",");
        
        $this->connectToDB();
        
        try {
            $q = 'INSERT INTO themes (theme_name, theme_type, theme_path) VALUES ' . $values;
            $stmnt = $this->db_conn->prepare($q);
            $stmnt->execute();
        } catch (PDOException $ex) {
            var_dump($ex->getMessage());
        }
        
        return $this->_getInsertedThemes();
    }
    
    private function _getInsertedThemes(){
        try {
            $q = 'SELECT * FROM themes';
            $stmnt = $this->db_conn->prepare($q);
            $stmnt->execute();
        } catch (PDOException $ex) {
            var_dump($ex->getMessage());
        }
        $all_themes = $stmnt->fetchAll(PDO::FETCH_OBJ);
        
        return $all_themes;
    }
    
    private function setSelectedThemes($request){
        $this->connectToDB();
        try {
            $q = 'UPDATE themes SET current=1 WHERE id IN('.$request['theme_admin'].', '.$request['theme_public'].')';
            $stmnt = $this->db_conn->prepare($q);
            $stmnt->execute();
        } catch (PDOException $ex) {
            var_dump($ex->getMessage());
        }
    }
    
    public function step_collect_data() {
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $this->smarty->display($this->smarty->current_theme . '/Installer/collect_data.tpl');
        } else {
            $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/collect_data.tpl');
            $this->smarty->display($this->smarty->current_theme . '/index.tpl');
        }
    }
    
    public function saveSiteData($request){
        unset($request['step']);
        unset($request['next_step']);
        $site_settings_file = fopen('site_settings.json', 'w') or die('Unable to open file!');
        fwrite($site_settings_file, json_encode($request));
        fclose($site_settings_file);
    }

}
