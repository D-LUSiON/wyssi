<?php
class Application {
    public $url;
    public $admin_interface;
    public $controller_name;
    public $method_name;
    public $controller_file;
    public $controller;
    public $request;
    public $errorText = '';
    public $modules;
    
    function __construct() {
        
        $this->manageRequest();
        
        $this->_autoloadPlugins();
        
        $this->_autoloadModels();
        
        $this->setController();
        
        if (method_exists($this->controller, $this->method_name)) {
            $this->controller->{$this->method_name}($this->request, $this->errorText);
        } else {
            echo 'method not found!<br/>';
        }
    }
    
    private function manageRequest(){
        $this->url = explode('/', strtolower(rtrim($_REQUEST['url'], '/')));
        $query = Array();
        foreach ($_REQUEST as $key=>$value) {
            if ($key != 'url')
                $query[$key] = $_REQUEST[$key];
        }
        $this->request['_server'] = $_SERVER;
        $this->request = $query;
    }
    
    private function setController(){
        if (DB_HOST == '' && !($this->url[0] == ADMIN_DIR && $this->url[1] == 'install')) {
            header('Location: ' . MAIN_DIR . ADMIN_DIR . '/install');
        } else if (DB_HOST != '' && $this->url[0] == ADMIN_DIR && $this->url[1] == 'install') {
            header('Location: ' . MAIN_DIR);
        }
        
        $_SESSION['admin_interface'] = $this->admin_interface = ($this->url[0] == ADMIN_DIR);
        
        $this->controller_name = ucfirst(
                ($this->admin_interface)? 
                        (($this->url[1] == '')? 'index' : $this->url[1]) :
                        (($this->url[0] == '')? 'index' : $this->url[0]));
        
        $this->method_name = ($this->admin_interface)?
                                (($this->url[2] == '')? 'index' : $this->url[2]) :
                                (($this->url[1] == '')? 'index' : $this->url[1]);
        
        $this->controller_file = CORE_DIR . 'controllers/' . (($this->admin_interface)? ADMIN_DIR . '/' : '') . $this->controller_name . '.php';
        
        if (!file_exists($this->controller_file)) {
            
            $this->controller_file = MODULES_DIR . lcfirst($this->controller_name) . '/' . ($this->admin_interface? ADMIN_DIR . '/' : '' ) . $this->controller_name . '.php';
            
            if (!file_exists($this->controller_file)) {
                // not found
                $this->errorText = 'Controller "' . $this->controller_name . '" not found!';
                $this->controller_file = 'core/controllers/' . (($this->admin_interface)? ADMIN_DIR . '/' : ''). 'Error.php';
                $this->controller_name = 'Error';
            }
        }
        
        require $this->controller_file;
        
        $this->controller_name = 'Controllers\\' . $this->controller_name;
        
        $this->controller = new $this->controller_name;
        
    }
    
    private function _autoloadPlugins(){
        #echo 'Autoloading plugins...<br/>';
        $mods = scandir(MODULES_DIR);
        for ($i = 0; $i < count($mods); $i++) {
            if (!in_array($mods[$i], Array('.', '..'))) {
                $this->modules[] = $mods[$i];
            }
        }
    }
    
    private function _autoloadModels(){
        // load models for core
        
        $core_models_dir = CORE_DIR . 'models';
        if (file_exists($core_models_dir)) {
            $core_models = scandir($core_models_dir);
            for ($i = 0; $i < count($core_models); $i++) {
                if (!in_array($core_models[$i], Array('.', '..'))) {
                    require $core_models_dir . '/' . $core_models[$i];
                }
            }
        }
        
        // load models for modules
        for ($i = 0; $i < count($this->modules); $i++) {
            $models_dir = MODULES_DIR . $this->modules[$i] . '/models';
            if (file_exists($models_dir)) {
                $models = scandir($models_dir);
                for ($j = 0; $j < count($models); $j++) {
                    if (!in_array($models[$j], Array('.', '..'))) {
                        require_once $models_dir . '/' . $models[$j];
                    }
                }
            }
        }
    }

}