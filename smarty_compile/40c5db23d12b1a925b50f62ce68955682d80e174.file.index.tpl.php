<?php /* Smarty version Smarty-3.1.7, created on 2016-02-20 13:29:37
         compiled from "./themes\base\index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:1474556c85c3191e8b1-97612988%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '40c5db23d12b1a925b50f62ce68955682d80e174' => 
    array (
      0 => './themes\\base\\index.tpl',
      1 => 1451040756,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '1474556c85c3191e8b1-97612988',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'template' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_56c85c31947d3',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_56c85c31947d3')) {function content_56c85c31947d3($_smarty_tpl) {?><?php if (!is_callable('smarty_function_get_path')) include 'C:\\xampp\\htdocs\\wyssi\\core\\libraries\\smarty\\plugins\\function.get_path.php';
?><!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi base</title>
        <link rel="stylesheet" type="text/css" href="<?php echo smarty_function_get_path(array('asset'=>"css/font-awesome.css"),$_smarty_tpl);?>
" media="all"/>
        <link rel="stylesheet" type="text/css" href="<?php echo smarty_function_get_path(array('asset'=>"css/design.css"),$_smarty_tpl);?>
" media="all"/>
        <script type="text/javascript" src="<?php echo smarty_function_get_path(array('asset'=>"js/jquery.js"),$_smarty_tpl);?>
"></script>
        <script type="text/javascript" src="<?php echo smarty_function_get_path(array('asset'=>"js/common.js"),$_smarty_tpl);?>
"></script>
    </head>
    <body>
        <div class="wrapper">
            <div id="MainContent">
                <?php echo $_smarty_tpl->getSubTemplate ($_smarty_tpl->tpl_vars['template']->value, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
        </div>
    </body>
</html>
<?php }} ?>