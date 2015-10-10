<?php
namespace Controllers;

class Themes extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Themes/index.tpl');
    }
    
    public function edit($request){
        $this->smarty->assign('request', $request);
        $this->display('Themes/edit.tpl');
    }

}
