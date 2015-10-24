<?php
namespace Controllers;

class Articles extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Articles/index.tpl');
    }
    
    public function view($id){
        $this->display('Articles/view.tpl');
    }

}