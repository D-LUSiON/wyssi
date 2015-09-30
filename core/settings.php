<?php

if ($debug = false) {
    error_reporting(E_ERROR);
    ini_set('display_errors', 1);
    ini_set('html_errors', 0);
} else {
    error_reporting(false);
    ini_set('display_errors', 0);
    ini_set('html_errors', 0);
}

session_start();

require 'core/constants.php';

require 'core/Application.php';
require 'core/controllers/BaseController.php';

require_once 'core/libraries/smarty/SmartyBC.class.php';
require_once 'core/libraries/smarty/SmartyInstance.class.php';

$smarty = \SmartyInstance::getInstance()->smarty;

$smarty->setTemplateDir('./themes')
               ->setCompileDir('./smarty_compile')
               ->setCacheDir('./smarty_cache');