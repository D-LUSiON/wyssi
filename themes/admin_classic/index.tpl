<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi admin</title>
        {block "stylesheets"}
            <link rel="stylesheet" type="text/css" href="{get_path asset='css/font-awesome.css'}" media="all"/>
            <link rel="stylesheet" type="text/css" href="{get_path asset='css/design.css'}" media="all"/>
        {/block}
        {block "scripts"}
            <script type="text/javascript" src="{get_path asset='js/js.missing_functions.js'}"></script>
            <script type="text/javascript" src="{get_path asset='js/jquery.js'}"></script>
            <script type="text/javascript" src="{get_path asset='js/jquery-ui.js'}"></script>
            <script type="text/javascript" src="{get_path asset='js/jquery.modalWindow.js'}"></script>
            <script type="text/javascript" src="{get_path asset='js/layout.js'}"></script>
            <script type="text/javascript" src="{get_path asset='js/common-scripts.js'}"></script>
        {/block}
    </head>
    <body data-main_dir="{$mainDir}">
        {if !$smarty.session.user}
            {include file=$template}
        {else}
        <div class="loader"></div>
        <header>
            <a href="{get_path url='admin'}" id="SiteLogo" class="left">
                <img src="{get_path asset='img/logo.png'}" alt=""/>
                <span class="logo_container">
                    <img src="{get_path asset='css/img/ajax_loader1.gif'}" alt=""/>
                </span>
            </a>
            <ul class="menu-container right">
                <li>
                    <a href="" class="fa fa-search" title="Search..."></a>
                </li>
                <li>
                    <a href="{get_path url='/'}" class="fa fa-laptop" title="View public site..." target="_blank"></a>
                </li>
                <li>
                    <a href="{get_path url='admin/user'}" class="fa fa-user" title="Profile..."></a>
                </li>
                <li>
                    <a href="{get_path url='admin/user/logout'}" class="fa fa-sign-out" title="Exit..."></a>
                </li>
            </ul>
        </header>
        {assign "sidebar_path" "{$smarty.const.THEMES_DIR}admin_classic/{$controller}/{$method}-sidebar.tpl"}
        <div id="MainContent-container" data-file="{$sidebar_path}">
            {if file_exists($sidebar_path)}
                {include file="admin_classic/{$controller}/{$method}-sidebar.tpl"}
            {else}
                {include file="admin_classic/sidebar.tpl"}
            {/if}
            <div id="MainContent">
                {include file=$template}
            </div>
        </div>
        {/if}
    </body>
</html>
