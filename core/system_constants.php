<?php
define('MAIN_DIR', $_SERVER['REQUEST_SCHEME'] . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));
define('CORE_DIR', 'core' . DIRECTORY_SEPARATOR);
define('MODULES_DIR', 'modules' . DIRECTORY_SEPARATOR);
define('RESOURCES_DIR', 'resources' . DIRECTORY_SEPARATOR);
define('DB_DUMP_DIR', 'sql' . DIRECTORY_SEPARATOR);
define('DB_DUMP_FILE_NAME', 'wyssi.sql');
define('THEMES_DIR', 'themes' . DIRECTORY_SEPARATOR);
define('UPLOADS_DIR', 'uploads' . DIRECTORY_SEPARATOR);
define('ADMIN_DIR', 'admin');