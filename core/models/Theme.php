<?php
namespace Models;

class Theme extends Database {
    public $table;
    public $id;
    public $theme_name;
    public $theme_path;
    public $current;
    
    function __construct() {
        $this->table = 'themes';
        parent::__construct();
    }
    
    public function getCurrent(){
        return $this->getCustom(null, null, 'theme_type="public" AND current=1');
    }
    
    public function getCurrentAdmin(){
        return $this->getCustom(null, null, 'theme_type="admin" AND current=1');
    }

}