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
        // TODO: Security check - if parameter "dir" is "..", function returns root of the project;
        // There has to be access rights to limit browsing the file tree
        $path = ($request['dir'] && $request['dir'] != '/') ? $request['dir'] : UPLOADS_DIR;
        //echo str_replace(str_replace(DIRECTORY_SEPARATOR, '', UPLOADS_DIR), '', $path) . ' ' . UPLOADS_DIR;
        $response = Array();
        if (!file_exists($path)) {
            http_response_code(404);
            $response = Array(
                'error' => true,
                'message' => 'Path not found!',
                'path' => $request['dir']
            );
        } else {
            $dirs = scandir($path);
            
            foreach ($dirs as $key) {
                if ($key != '.' and $key != '..') {
                    $cdir = Array(
                        'title' => $key,
                        'path' => str_replace(DIRECTORY_SEPARATOR, '/', rtrim($path, '/') . $key),
                        'type' => (is_dir($path . DIRECTORY_SEPARATOR . $key) ? 'folder' : 'file')
                    );
                    if (is_file($path . DIRECTORY_SEPARATOR . $key))
                        $cdir['size'] = (round(filesize($path . DIRECTORY_SEPARATOR . $key) / 1024)) . 'kb';
                    $response[] = $cdir;
                }
            }
        }
        
        $this->json_response($response);
    }
    
    public function update($request) {
        $path = UPLOADS_DIR . ($request['dir'] ? $request['dir'] : '') . DIRECTORY_SEPARATOR;
        if (!$request['file_name'] or !file_exists($path . $request['file_name'])) {
            http_response_code(404);
            $response = Array(
                'error' => true,
                'message' => 'File not found!'
            );
        } else {
            if (rename($path . '/' . $request['file_name'], $path . '/' . $request['new_name'])) {
                $response = Array(
                    'error' => false,
                    'message' => 'OK'
                );
            } else {
                $response = Array(
                    'error' => true,
                    'message' => 'Error renaming file!'
                );
            }
        }
        $this->json_response($response);
    }
    
    public function mkdir($request) {
        $path = UPLOADS_DIR . ($request['dir'] ? $request['dir'] : '') . DIRECTORY_SEPARATOR;
        if (!$request['new_folder']) {
            http_response_code(400);
            $response = Array(
                'error' => true,
                'message' => 'No dirname!'
            );
        } else {
            if (!file_exists($path . $request['new_folder'])) {
                mkdir($path . $request['new_folder']);
                chmod($path . $request['new_folder'], 0777);
                $response = Array(
                    'error' => false,
                    'message' => 'OK'
                );
            } else {
                http_response_code(304);
                $response = Array(
                    'error' => true,
                    'message' => 'Folder already exist and it was not created!'
                );
            }
        }
        $this->json_response($response);
    }
    
    public function remove($request){
        $response = Array(
            'error' => false,
            'message' => ''
        );
        if (is_dir($filename)) {
            $response['message'] = 'rmdir';
        } else {
            $response['message'] = 'unlink';
        }
        
        $this->json_response($response);
    }
    
    public function upload($request) {
        $response = Array(
            'request' => $_REQUEST,
            'get' => $_GET,
            'post' => $_POST,
            'files' => $_FILES
        );
        $this->json_response($response);
    }
}
