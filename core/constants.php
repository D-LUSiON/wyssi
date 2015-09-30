<?php

define('CORE_DIR', 'core/');
define('MODULES_DIR', 'modules/');

$_SESSION['template'] = isset($_REQUEST['tmpl'])? $_REQUEST['tmpl'] : $_SESSION['template'];

define('MAIN_DIR', 'http://localhost/wyssi/');

define('DB_HOST', 'localhost');
define('DB_TABLE', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');