<?php /* Smarty version Smarty-3.1.7, created on 2015-09-24 17:02:07
         compiled from "./themes\base\index.tpl" */ ?>
<?php /*%%SmartyHeaderCode:120735603a4ecf254d2-61427684%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '40c5db23d12b1a925b50f62ce68955682d80e174' => 
    array (
      0 => './themes\\base\\index.tpl',
      1 => 1443103945,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '120735603a4ecf254d2-61427684',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_5603a4ed00957',
  'variables' => 
  array (
    'themeDir' => 0,
    'template' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5603a4ed00957')) {function content_5603a4ed00957($_smarty_tpl) {?><!DOCTYPE html>
<html>
    <head>
        <base href="<?php echo $_smarty_tpl->tpl_vars['themeDir']->value;?>
"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi base</title>
        <link rel="stylesheet" type="text/css" href="css/design.css" media="all"/>
        <script type="text/javascript" src="js/jquery.js"></script>
    </head>
    <body>
        template here<br/>
        <?php echo $_smarty_tpl->getSubTemplate ($_smarty_tpl->tpl_vars['template']->value, $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

    </body>
</html>
<?php }} ?>