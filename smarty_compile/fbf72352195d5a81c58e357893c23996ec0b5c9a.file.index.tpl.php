<?php /* Smarty version Smarty-3.1.7, created on 2015-09-24 17:15:55
         compiled from "./themes\admin\index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:169975603fcbf3a1643-47522489%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'fbf72352195d5a81c58e357893c23996ec0b5c9a' => 
    array (
      0 => './themes\\admin\\index.tpl',
      1 => 1443107754,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '169975603fcbf3a1643-47522489',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_5603fcbf3c8bf',
  'variables' => 
  array (
    'themeDir' => 0,
    'template' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5603fcbf3c8bf')) {function content_5603fcbf3c8bf($_smarty_tpl) {?><!DOCTYPE html>
<html>
    <head>
        <base href="<?php echo $_smarty_tpl->tpl_vars['themeDir']->value;?>
"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi admin</title>
        <link rel="stylesheet" type="text/css" href="css/design.css" media="all"/>
        <script type="text/javascript" src="js/jquery.js"></script>
    </head>
    <body>
        <div class="mainMenu-container">
            <div class="mainMenu-item">Dashboard</div>
            <div class="mainMenu-item">Pages</div>
            <div class="mainMenu-item">Stuff</div>
        </div>
        <?php echo $_smarty_tpl->getSubTemplate ($_smarty_tpl->tpl_vars['template']->value, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    </body>
</html>
<?php }} ?>