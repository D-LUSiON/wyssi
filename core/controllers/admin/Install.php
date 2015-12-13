<?php
namespace Controllers;

class Install extends BaseController {

    function __construct() {
        echo '__construct of Install';
    }
    
    public function index($errorText = '500: Uncaught error!'){
        echo $errorText;
    }

}
