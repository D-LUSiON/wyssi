<!DOCTYPE html>
<html>
    <head>
        <base href="{$themeDir}"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi admin</title>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css" media="all"/>
        <link rel="stylesheet" type="text/css" href="css/design.css" media="all"/>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/jquery.modalWindow.js"></script>
        <script type="text/javascript" src="js/common-scripts.js"></script>
    </head>
    <body{if $method == 'edit'} class="edit_mode"{/if}>
        <div class="header">
            <div class="wrapper">
                <div class="logo">
                    <a href="index.php"><img src="img/logo.png" alt=""/></a>
                </div>
                <div class="buttons-container">
                    <div class="button"><span class="fa fa-gear"></span></div>
                    <div class="button dropdown-container">
                        <span class="fa fa-power-off"></span>
                        <div class="content-container">
                            <div class="dropdown-item">
                                <a href="admin/user">John Doe</a>
                            </div>
                            <div class="dropdown-item">
                                <a href="user/logout" >{_('Logout')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {if $method == 'edit'}
            Edit mode!
        {else}
        <div class="wrapper">
            <div class="main_container">
                <div class="main_sidebar">
                    {include file='admin/sidebar.tpl'}
                </div>
                <div class="main_content-container">
                    {if isset($system_error)}{$system_error}{/if}
                    {if isset($system_message)}{$system_message}{/if}
                    {include file=$template}
                </div>
            </div>
        </div>
        {/if}
    </body>
</html>
