<?php
namespace Controllers;

class BaseController {
    
    public $templateDir;
    public $editTemplateDir;
    public $editTemplateFile;
    public $xhr;
    public $caller;
    public $caller_controller;
    public $caller_method;

    function __construct() {
        $this->xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
        
        $theme_model = new \Models\Theme();
        $current_theme = $theme_model->getCurrent()[0];
        $current_admin_theme = $theme_model->getCurrentAdmin()[0];
        
        $this->templateDir = ($_SESSION['admin_interface'] == ADMIN_DIR)? $current_admin_theme->theme_path : (isset($current_theme)? $current_theme->theme_path : 'base');
        
        
        $this->smarty = \SmartyInstance::getInstance()->smarty;
        $this->smarty->current_theme = $this->templateDir;
        if ($_SESSION['admin_interface'] == ADMIN_DIR) {
            $this->editTemplateDir = MAIN_DIR . THEMES_DIR . $current_theme->theme_path . '/';
            $this->smarty->assign('editTemplateDir', $this->editTemplateDir);
        }
            
        
        $this->smarty->assign('siteDir', MAIN_DIR);
        $this->smarty->assign('mainDir', MAIN_DIR . (($_SESSION['admin_interface'] == ADMIN_DIR)? ADMIN_DIR : '') . DIRECTORY_SEPARATOR);
        $this->smarty->assign('themeDir', MAIN_DIR . THEMES_DIR . $this->templateDir . '/');
//        echo rtrim(MAIN_DIR, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . preg_replace('/[^\da-z]/i', '', $this->smarty->getTemplateDir()[0]) . DIRECTORY_SEPARATOR . $this->smarty->current_theme . DIRECTORY_SEPARATOR;
    }
    
    public function display($template = false, $assigns, $master = 'index.tpl'){
        $this->caller = debug_backtrace()[1];
        $this->caller_controller = explode('\\', strtolower(rtrim($this->caller['class'])))[1];
        $this->caller_method = $this->caller['function'];
        $this->smarty->assign('controller', $this->caller_controller);
        $this->smarty->assign('method', $this->caller_method);
        
        if ($_SESSION['admin_interface'] == ADMIN_DIR) {
            $this->editTemplateFile = $this->editTemplateDir . explode('\\', strtolower(rtrim($this->caller['class'])))[1] . '/' . $this->caller['function'] . '.tpl';
            $this->smarty->assign('editTemplateFile', $this->editTemplateFile);
        }
        
        $master = $this->templateDir . '/' . (($this->xhr)? 'ajax.tpl' : $master);
        $template = $this->templateDir . '/' . (($template)? $template : explode('\\', get_class($this))[1] . '/index.tpl');
        
        $this->smarty->assign('user', $_SESSION['user']);
        $this->smarty->assign('template', $template);
        
        foreach ($assigns as $key => $value) {
            $this->smarty->assign($key, $value);
        }
        $this->smarty->display($master);
    }
    
    public function json_response($json = []) {
        echo json_encode($json);
    }

}