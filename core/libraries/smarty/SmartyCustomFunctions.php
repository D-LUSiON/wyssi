<?php

$smarty->register_function('get_asset', 'get_asset');

function get_asset($path, &$smarty) {
    return MAIN_DIR . $path;
}
