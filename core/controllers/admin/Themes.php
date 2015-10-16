<?php

namespace Controllers;

class Themes extends BaseController {

    function __construct() {
        parent::__construct();
    }

    public function index() {
        $this->display('Themes/index.tpl');
    }

    public function edit($request) {
        $this->smarty->assign('request', $request);
        $this->display('Themes/edit.tpl');
    }

    public function getResources() {
        $resources = $this->_scanDir(RESOURCES_DIR);
        $this->json_response($resources);
    }

    private function _scanDir($dir, &$results = Array()) {
        $files = scandir($dir);
        foreach ($files as $key => $value) {
            if ($value != '.' && $value != '..') {
                $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
                if (!is_dir($path)) {
                    $f = end(explode(DIRECTORY_SEPARATOR, $path));
                    if (strpos($f, '.json') > -1) {
                        $pat = explode(DIRECTORY_SEPARATOR, $path);
                        var_dump($pat);
                        $p = $p[sizeof($pat)-2];
                        if (!isset($results[$p])) {
                            $results[$p] = Array();
                        }
                        $results[$p][] = $f;
                    }
                } else {
                    $this->_scanDir($path, $results);
                }
            }
        }
        return $results;
    }

}
