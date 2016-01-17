<?php
namespace Models;

class User extends Database {
    public $table = 'users';
    public $id;
    public $username;
    public $password;
    public $first_name;
    public $last_name;
    public $date_created;
    public $date_updated;
    public $last_entered;
    public $admin;
    public $avatar;
    public $required_fields = Array('username', 'password', 'first_name', 'last_name', 'admin', 'avatar');
    
    function __construct() {
        parent::__construct();
    }
    
    public function logUser($request){
        return $this->getCustom(NULL, NULL, 'username="' . $request['username'] . '" AND password="' . $request['password'] . '"')[0];
    }
    
    public function updateLastLogin(){
        $this->update(Array(
            'last_entered' => CURRENT_TIMESTAMP
        ));
    }

}