<?php
namespace Controllers;

class Pages extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Pages/index.tpl');
    }
    
    public function edit($request){
        $this->smarty->assign('request', $request);
        $this->display('Pages/edit.tpl');
    }

}