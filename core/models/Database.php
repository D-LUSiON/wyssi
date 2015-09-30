<?php
class Database extends PDO {

    function __construct() {
        parent::__construct('mysql:host='.DB_HOST.';dbname='.DB_TABLE, DB_USER, DB_PASS);
        
    }

}