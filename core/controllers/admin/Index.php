<?php
namespace Controllers;

class Index extends BaseController {

    function __construct() {
        parent::__construct();
        if (!isset($_SESSION['user'])) {
            header('Location: ' . MAIN_DIR . ADMIN_DIR .'/user/login');
        }
    }
    
    public function index(){
        $this->display('Index/index.tpl');
    }
    
    public function logout(){
        header('Location: ' . MAIN_DIR . ADMIN_DIR .'/user/logout');
    }

}