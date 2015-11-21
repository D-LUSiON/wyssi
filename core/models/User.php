<?php
namespace Models;

class User extends Database {
    public $table;
    public $id;
    public $username;
    public $password;
    public $first_name;
    public $last_name;
    public $date_created;
    public $date_updated;
    public $last_entered;
    public $admin;
    
    function __construct() {
        $this->table = 'users';
        parent::__construct();
    }
    
    public function logUser($request){
        return $this->getCustom(NULL, NULL, 'username="' . $request['username'] . '" AND password="' . $request['password'] . '"')[0];
    }

}