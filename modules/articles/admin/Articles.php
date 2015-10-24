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
        $this->display('Articles/edit.tpl');
    }

}