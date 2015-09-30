<?php
namespace Controllers;

class Index extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Index/index.tpl');
    }

}
