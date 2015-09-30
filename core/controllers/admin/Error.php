<?php
namespace Controllers;

class Error extends BaseController {

    function __construct() {
        echo '__construct of Error.php<br/>';
    }
    
    public function index($errorText = ''){
        echo $errorText;
    }

}
