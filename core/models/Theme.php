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
        return $this->getCustom(null, null, 'current=1');
    }

}