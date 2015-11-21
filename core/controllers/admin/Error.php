<?php
namespace Controllers;

class Error extends BaseController {

    function __construct() {
        
    }
    
    public function index($errorText = ''){
        echo $errorText;
    }

}
