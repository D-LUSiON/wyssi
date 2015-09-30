<?php
namespace Controllers;

class Error extends BaseController {

    function __construct() {
        echo '__construct of Error.php<br/>';
    }
    
    public function index($errorText = 'Method not found!'){
        echo $errorText;
    }

}
