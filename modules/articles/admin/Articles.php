<?php
namespace Controllers;

class Articles extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Articles/index.tpl');
    }
    
    public function edit($request){
        $this->smarty->assign('request', $request);
        
        $template_public = 'themes/' . ($_SESSION['template']? $_SESSION['template'] : $_SESSION['template'] = 'base') . '/Articles/view.tpl';
        
        $this->smarty->assign('template_public', $template_public);
        $this->display('Articles/edit.tpl');
    }

}