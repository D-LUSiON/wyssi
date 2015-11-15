<?php
namespace Models;

class Theme extends Database {

    function __construct() {
        $this->table = 'themes';
        parent::__construct();
    }
    
    public function getCurrent(){
        return $this->getCustom(null, null, 'current=1');
    }

}