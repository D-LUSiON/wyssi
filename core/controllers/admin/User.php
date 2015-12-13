<?php

namespace Controllers;

class User extends BaseController {

    function __construct() {
        parent::__construct();
    }

    public function login() {
        $this->display('User/login.tpl');
    }

    public function logUser($request) {
        if (!$_SESSION['user']) {
            $user_model = new \Models\User();
            $user = $user_model->logUser($request);
            if ($user) {
                $_SESSION['user'] = Array();
                foreach ($user as $key => $value)
                    $_SESSION['user'][$key] = $value;
                
            }
            header('Location: ' . MAIN_DIR . (($user->admin == 1)? 'admin/' : '/'));
        } else {
            header('Location: ' . MAIN_DIR . (($_SESSION['admin_interface'])? 'admin/user/login' : '/'));
        }
    }
    
    public function logout(){
        $_SESSION['user'] = null;
        header('Location: ' . MAIN_DIR . (($_SESSION['admin_interface'])? 'admin/' : '/'));
    }

}
