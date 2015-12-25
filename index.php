<?php

require 'core/settings.php';
// first - check if exist site settings JSON file
// then - decide whether to install application
// or to run it
$site_settings = file_get_contents('site_settings.json');

if ($site_settings == '') {
    require 'core/Installer.php';
    $app = new Installer();
} else
    $app = new Application();