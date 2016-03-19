<?php

namespace Controllers;

class Error extends BaseController {

    function __construct() {
        
    }

    public function index($errorText = '') {
        echo $errorText;
    }

    public function noImage() {
        $name = realpath(THEMES_DIR . 'base/img/no_photo.png');
        
        header('Content-Type: image/png');
        header('Content-Length: ' . filesize($name));

        readfile($name);
    }

}
