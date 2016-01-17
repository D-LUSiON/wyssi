<?php
namespace Models;

class Theme extends Database {
    public $table = 'themes';
    public $id;
    public $theme_name;
    public $theme_path;
    public $theme_type;
    public $current;
    public $preview_image;
    public $required_fields = Array('theme_name', 'theme_path', 'theme_type', 'current', 'preview_image');
    
    function __construct($data = null) {        
        if (isset($data)) {
            foreach ($data as $key => $value) {
                $this->{$key} = $value;
            }
        }
        
        parent::__construct();
    }
    
    public function getCurrent(){
        return $this->getCustom(null, null, 'theme_type="public" AND current=1');
    }
    
    public function getCurrentAdmin(){
        return $this->getCustom(null, null, 'theme_type="admin" AND current=1');
    }
    
    public function setCurrentTheme(){
        $this->current = 1;
        $this->save();
        
        $themes_model = new \Models\Theme();
        $this->db->query("UPDATE $this->table SET current=0 WHERE theme_type=\"$this->theme_type\" AND id != $this->id");
        
    }

}