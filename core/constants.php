<?php

define('CORE_DIR', 'core/');
define('MODULES_DIR', 'modules/');
define('RESOURCES_DIR', 'resources/');

$_SESSION['template'] = isset($_REQUEST['tmpl'])? $_REQUEST['tmpl'] : $_SESSION['template'];

define('MAIN_DIR', 'http://localhost/wyssi/');

define('ADMIN_DIR', 'admin');

define('DB_HOST', 'localhost');
define('DB_TABLE', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');