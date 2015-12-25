<?php
class Installer {

    function __construct() {
        /*
         * 1. show welcome screen - DB connection data
         * 2. check if database exist if yes - drop it and enter definitions
         * 3. register admin account
         * 4. choose templates for public and admin
         * 5. choose plugins to be activated
         * 6. collect website data - site name, owner, contact info and other optional data
         * 7. where do you want to go - public or admin
         */
        
        $this->smarty = \SmartyInstance::getInstance()->smarty;
        $this->smarty->current_theme = 'base';
        $this->step1();
    }
    
    public function step1() {
        $this->smarty->assign('template', $this->smarty->current_theme . '/Installer/index.tpl');
        $this->smarty->display('base/index.tpl');
    }

}