<?php
class Application {
    public $url;
    public $admin;
    public $controller_name;
    public $method_name;
    public $controller_file;
    public $controller;
    public $query;
    public $errorText = '';
    public $modules;
    
    function __construct() {
        $this->_autoloadPlugins();
        
        $this->manageRequest();
        
        $this->setController();
        
        require $this->controller_file;
        
        $this->controller = new $this->controller_name();

        if (method_exists($this->controller, $this->method_name)) {
            $this->controller->{$this->method_name}($this->query, $this->errorText);
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
        
        $this->query = $query;
    }
    
    private function setController(){
        $_SESSION['admin'] = $this->admin = ($this->url[0] == 'admin');
        
        $this->controller_name = ucfirst(($this->admin)? (($this->url[1] == '')? 'index' : $this->url[1]) : (($this->url[0] == '')? 'index' : $this->url[0]));
        $this->method_name = ($this->admin)? (($this->url[2] == '')? 'index' : $this->url[2]) : (($this->url[1] == '')? 'index' : $this->url[1]);
        $this->controller_file = CORE_DIR . 'controllers/' . (($this->admin)? 'admin/' : '') . $this->controller_name . '.php';
        
        if (file_exists($this->controller_file)) {
            // if in core modules
            $this->controller_name = 'Controllers\\' . $this->controller_name;
        } else {
            $this->controller_file = MODULES_DIR . '' . 'controllers/' . $this->controller_name . '.php';
            if (true) {
                // if in custom modules
                //TODO: To be written!
                echo 'Custom module!';
            } else {
                // not found
                $this->errorText = 'Controller "' . $this->controller_name . '" not found!';
                $this->controller_file = 'core/controllers/' . (($this->admin)? 'admin/' : ''). 'Error.php';
                $this->controller_name = 'Controllers\Error';
            }
        }
    }
    
    private function _autoloadPlugins(){
        #echo 'Autoloading plugins...<br/>';
        $mods = scandir(MODULES_DIR);
        for ($index = 0; $index < count($mods); $index++) {
            if (!in_array($mods[$index], Array('.', '..'))) {
                $this->modules[] = $mods[$index];
            }
        }
    }

}