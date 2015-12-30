<?php

namespace Models;

use \PDO;

class Database {

    protected $db;
    private $caller;
    private $caller_class;

    function __construct() {
        $this->connect();
    }
    
    private function connect(){
        $this->db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(
            PDO::ATTR_PERSISTENT => true
        ));
        $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);
    }
    
    public function __sleep() {
        return array('db', 'caller', 'caller_class');
    }
    
    public function __wakeup() {
        $this->connect();
    }

    private function getCaller() {
        $this->caller = debug_backtrace()[0];
        $this->caller_class = get_class($this->caller['object']);
    }

    public function getAll($order_by = null, $order = 'ASC', $limit = false) {
        $this->getCaller();
        $q = 'SELECT * FROM ' . $this->caller['object']->table . ((isset($order_by))? (' ORDER BY ' . $order_by . ' ' . $order) : '') . (($limit) ? ' LIMIT ' . $limit : '');
        $query = $this->db->prepare($q);
        $query->execute();
        
        return $query->fetchAll(\PDO::FETCH_CLASS, $this->caller_class);
    }

    public function getByID($id = null, $order_by = null, $order = 'ASC') {
        $this->getCaller();
        if (isset($id)) {
            $q = 'SELECT * FROM '.$this->caller['object']->table.' WHERE id=' . $id;
            $query = $this->db->prepare($q);
            $query->execute();
            if ($query->errorCode() != '00000')
                var_dump($query->errorInfo());
            
            $res =  $query->fetchAll(\PDO::FETCH_CLASS, $this->caller_class)[0];
            
            return $res;
        } else {
            return Array('error' => 'Please, provide ID!');
        }
    }

    public function getCustom($what = '*', $from = null, $where = '') {
        $this->getCaller();

        if (!isset($from))
            $from = $this->caller['object']->table;
        if (!isset($what))
            $what = '*';
        $q = 'SELECT ' . $what . ' FROM ' . $from . (isset($where) ? ' WHERE ' . $where : '');
        
        $query = $this->db->prepare($q);
        $query->execute();
        
        return $query->fetchAll(\PDO::FETCH_CLASS, $this->caller_class);
    }
    
    public function setFields($fields){
        foreach ($this as $key => $value) {
            if ($fields[$key])
                $this->{$key} = $fields[$key];
        }
    }
    
    public function save(){
        $this->getCaller();
        $fields = Array();
        foreach ($this->required_fields as $key)
            $fields[] = $key;
            
        $values = Array();
            foreach ($this->required_fields as $key)
            $values[] = '"' . $this->{$key} .'"';
            
        if ($this->id) {
            $vals = Array();
            foreach ($this->required_fields as $key) {
                $vals[] = $key. "='" . $this->{$key} . "'";
            }
            $q = 'UPDATE '.$this->table.' SET '.implode(', ', $vals).' WHERE id='.$this->id;
            $query = $this->db->prepare($q);
        } else {
            $q = 'INSERT into '.$this->table.' ('.implode(', ', $fields).') VALUES ('.implode(', ', $values).')';
            $query = $this->db->prepare($q);
        }
        
        $query->execute();
        
        if ($query->errorCode() != '00000') {
            echo $q . "\n";
            echo (($this->id)? 'UPDATE' : 'INSERT') . "\n";
            var_dump($query->errorInfo());
        }
        
        return $this->db->lastInsertId();
    }
    
    public function delete(){
        $this->getCaller();
        $q = 'DELETE from '.$this->table.' WHERE id='.$this->id;
        $query = $this->db->prepare($q);
        $query->execute();
        
        if ($query->errorCode() != '00000')
            var_dump($query->errorInfo());
    }
    
    public function update($data = Array()) {
        $columns = Array();
        $values = '';
        foreach ($data as $key=>$value) {
            $values .= $key . '=' . $value . ', ';;
        }
        
        $values = rtrim($values, ', ');
        
        $this->getCaller();
        echo $q = 'UPDATE '.$this->table.' SET ' . $values . ' WHERE id=' . $this->id;
        $query = $this->db->prepare($q);
        $query->execute();
        
        if ($query->errorCode() != '00000')
            var_dump($query->errorInfo());
        
        return $this->db->lastInsertId();
    }
    
    public function query($query, $values){
        echo here;
        $this->getCaller();
        $stmnt = $this->db->prepare($query);
        echo "$query\n";
        $stmnt->execute($values);
        
        if ($stmnt->errorCode() != '00000')
            var_dump($stmnt->errorInfo());
    }

}
