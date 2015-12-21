<?php
namespace Models\Pages;

use Models;

class Page extends Models\Database {
    
    public $id;
    public $title;
    public $description;
    public $content;
    public $creation_date;
    public $update_date;
    public $main_image;
    public $table;
    public $required_fields = Array('title', 'description', 'content');
    
    function __construct() {
        $this->table = 'pages';
        parent::__construct();
    }

}