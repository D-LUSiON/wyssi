<?php

namespace Models;

class Settings extends Database {

    public $table;
    public $id;
    public $theme_name;
    public $theme_path;
    public $current;

    function __construct() {
        $this->table = 'settings';
        parent::__construct();
    }

    public function resetDatabase() {
        if (file_exists(DB_DUMP_DIR . DB_DUMP_FILE_NAME)) {
            $sql_file_orig = file_get_contents(DB_DUMP_DIR . DB_DUMP_FILE_NAME);
            $sql_file = preg_replace('/\-\-(.*)\n/', '', $sql_file_orig);
            $sql = preg_replace('/;/', ";\n", preg_replace('/\n/', "", preg_replace('/;{2,}/', "", $sql_file)));
            
            try {
                $stmt = $this->db->prepare($sql);
                $stmt->execute();
                return 'OK';
            } catch (PDOException $e) {
                return $e->getMessage();
            }
        }
    }

}
