<?php
namespace Controllers;

class Help extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Help/index.tpl');
    }

}