<?php

namespace Controllers;

class Themes extends BaseController {
    public $themes;
    
    function __construct() {
        parent::__construct();
    }

    public function index() {
        $themes = $this->_scanForThemes();
        $this->smarty->assign('themes', $themes);
        $this->display('Themes/index.tpl');
    }

    public function edit($request) {
        
        $this->smarty->assign('request', $request);
        
        $this->display('Themes/edit.tpl');
    }

    public function getResources() {
        $themes = $this->_scanForThemes();
        $this->json_response($themes);
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
            $themes[] = new \Models\Theme($t_s);
        }
        
        return $this->_insertNewThemes($themes);
    }
    
    private function _insertNewThemes($themes) {
        $theme_model = new \Models\Theme();
        $db_themes = $theme_model->getAll();
        $themes_list = Array();
        
        foreach ($themes as $theme) {
            $found_theme = $theme;
            
            foreach ($db_themes as $db_theme) {
                if ($db_theme->theme_path == $theme->theme_path and $db_theme->theme_type == $theme->theme_type ){
                    $found_theme->id = $db_theme->id;
                    $found_theme->current = $db_theme->current;
                    $found_theme->preview_image = $db_theme->preview_image;
                    break;
                }
            }
            $themes_list[] = $found_theme;
        }
        
        foreach ($themes_list as $theme)
            $theme->save();
        
        return $theme_model->getAll(); 
    }
    
    public function setCurrent($request) {
        if ($request['id']) {
            $theme_model = new \Models\Theme();
            $theme = $theme_model->getByID($request['id']);
            $theme->setCurrentTheme();
            
            header('Location: ' . MAIN_DIR . ADMIN_DIR .'/themes');
        } else {
            $this->json_response(Array('error' => true, 'message' => 'Plese, provide theme ID!'));
        }
    }
    
    public function getThemeResources(){
        $dir = RESOURCES_DIR;
        $results = Array();
        $this->_scanForResources(RESOURCES_DIR, $results);
        echo json_encode($results);
    }
    
    private function _scanForResources($dir = RESOURCES_DIR, &$results = Array()) {
        $files = scandir($dir);
        foreach ($files as $key => $value) {
            if ($value != '.' && $value != '..') {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (is_file($path)) {
                    if (pathinfo($path, PATHINFO_EXTENSION) == 'json'){
                        $result = json_decode(file_get_contents($path));
                        $main_dir = str_replace('\\', DIRECTORY_SEPARATOR, str_replace('/', DIRECTORY_SEPARATOR, $_SERVER['DOCUMENT_ROOT']));
                        $result->path = str_replace('\\', '/', str_replace($main_dir, '', $dir)) . '/';
                        $result->html = $this->smarty->fetch($main_dir . $result->path . $result->resources->html);
                        $results[] = $result;
                    }
                } elseif (is_dir($path)) {
                    if (!$results[$value]) $results[$value] = Array();
                    $this->_scanForResources($path, $results[$value]);
                }
            }
        }
    }
}
