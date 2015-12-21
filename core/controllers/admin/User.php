<?php

namespace Controllers;

class User extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $user_model = new \Models\User();
        $user = $user_model->getByID($_SESSION['user']['id']);
        $this->smarty->assign('profile', $user);
        $this->display('User/profile.tpl');
    }

    public function login() {
        $this->display('User/login.tpl');
    }

    public function logUser($request) {
        if (!$_SESSION['user']) {
            $user_model = new \Models\User();
            $user = $user_model->logUser($request);
            if ($user) {
                $user->updateLastLogin();
                $user = $user_model->getByID($user->id);
                $_SESSION['user'] = Array();
                foreach ($user as $key => $value)
                    $_SESSION['user'][$key] = $value;
                
            }
            header('Location: ' . MAIN_DIR . (($user->admin == 1)? ADMIN_DIR : '')) . '/';
        } else {
            header('Location: ' . MAIN_DIR . (($_SESSION['admin_interface'])? ADMIN_DIR . '/user/login' : '/'));
        }
    }
    
    public function logout(){
        unset($_SESSION['user']);
        header('Location: ' . MAIN_DIR . (($_SESSION['admin_interface'])? 'admin/' : '/'));
    }

}
