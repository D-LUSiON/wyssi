<?php
namespace Plugins;

class Index extends \Controllers\BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index(){
        $this->display('Index/index.tpl');
    }

}
