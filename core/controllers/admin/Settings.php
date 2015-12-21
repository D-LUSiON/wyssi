<?php

namespace Controllers;

class Settings extends BaseController {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->display('Settings/index.tpl');
    }
    
    public function resetDatabase($request, $error){
        if ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
            $settings = new \Models\Settings();
            $mess = $settings->resetDatabase();
            $this->json_response( Array( 'error' => !($mess == 'OK'), 'message' => $mess ) );
        } else {
            $this->json_response( Array(
                'error' => true,
                'message' => 'You cannot access this method directly!',
                'data' => Array(
                    'server' => $_SERVER,
                    'request' => $request),
                    'curl' => curl_setopt($ch,CURLOPT_HTTPHEADER,array("X-Requested-With : XMLHttpRequest"))
                )
            );
        }
    }

}
