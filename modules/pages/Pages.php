<?php
namespace Controllers;

class Pages extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Pages/index.tpl');
    }

}