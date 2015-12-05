<?php
define('MAIN_DIR', $_SERVER['REQUEST_SCHEME'] . "://" . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . '/');
define('CORE_DIR', 'core/');
define('MODULES_DIR', 'modules/');
define('RESOURCES_DIR', 'resources/');
define('THEMES_DIR', 'themes/');
define('ADMIN_DIR', 'admin');

$_SESSION['theme'] = isset($_REQUEST['theme'])? $_REQUEST['theme'] : $_SESSION['theme'];