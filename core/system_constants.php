<?php
define('CORE_DIR', 'core/');
define('MODULES_DIR', 'modules/');
define('RESOURCES_DIR', 'resources/');

$_SESSION['theme'] = isset($_REQUEST['theme'])? $_REQUEST['theme'] : $_SESSION['theme'];

define('ADMIN_DIR', 'admin');