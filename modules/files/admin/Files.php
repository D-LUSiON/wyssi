<?php

namespace Controllers;

class Files extends BaseController {

    public $themes;

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->display('Files/index.tpl');
    }

    public function getList($request) {
        //TODO: Security check - if parameter "dir" is "..", function returns root of the project;
        // There has to be access rights to limit browsing the file tree
        $path = UPLOADS_DIR . ($request['dir'] ? $request['dir'] : "");
        
        $response = Array();
        if (!file_exists($path)) {
            $response = json_encode(Array(
                'error' => true,
                'message' => 'Path not found!'
            ));
        } else {
            $dirs = scandir($path);

            foreach ($dirs as $key) {
                if ($key != '.' and $key != '..') {
                    $cdir = Array(
                        'title' => $key,
                        'type' => (is_dir($path . DIRECTORY_SEPARATOR . $key) ? 'folder' : 'file')
                    );
                    if (is_file($path . DIRECTORY_SEPARATOR . $key))
                        $cdir['size'] = (round(filesize($path . DIRECTORY_SEPARATOR . $key) / 1024)) . 'kb';
                    $response[] = $cdir;
                }
            }
        }
        echo json_encode($response);
    }

}
