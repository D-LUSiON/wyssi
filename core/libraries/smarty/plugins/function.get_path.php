<?php
/*
 * Smarty plugin
 * -------------------------------------------------------------
 * File:     function.get_path.php
 * Type:     function
 * Name:     get_path
 * Purpose:  outputs asset path
 * -------------------------------------------------------------
 */
function smarty_function_get_path($params, &$smarty){
    if (!isset($params['asset']) and !isset($params['file']) and !isset($params['url'])) {
        $smarty->trigger_error('Please, provide asset or path!');
        return;
    }
    if (isset($params['asset']) and isset($params['file'])) {
        $smarty->trigger_error('Please, provide only asset or file path!');
        return;
    }
    
    if (isset($params['asset']) and gettype($params['asset']) != 'string') {
        $smarty->trigger_error('Asset have to be string!');
        return;
    }
    if (isset($params['file']) and gettype($params['file']) != 'string') {
        $smarty->trigger_error('File have to be string!');
        return;
    }
    
    /* main function */
    if (isset($params['asset'])) {
        return rtrim(MAIN_DIR, '/') . DIRECTORY_SEPARATOR . preg_replace('/[^\da-z]/i', '', $smarty->getTemplateDir()[0]) . DIRECTORY_SEPARATOR . $smarty->current_theme . DIRECTORY_SEPARATOR . $params['asset'];
    }
    if (isset($params['file'])) {
        return MAIN_DIR . UPLOADS_DIR . $params['file'];
    }
    if (isset($params['url'])) {
        if ($params['url'] == '' or $params['url'] == '/' or $params['url'] == 'mainDir') {
            return MAIN_DIR;
        }
        return MAIN_DIR . $params['url'];
    }
    
}
?>