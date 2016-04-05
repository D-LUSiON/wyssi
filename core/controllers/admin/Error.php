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
        //header('HTTP/1.0 404 Not Found');
        header('Content-Type: image/png');
        header('Content-Length: ' . filesize($name));

        readfile($name);
    }

}
