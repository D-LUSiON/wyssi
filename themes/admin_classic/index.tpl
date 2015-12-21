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
        {$user|var_dump}
        <div id="MainContent-container">
            <aside>
                <a href="" class="element-container">
                    <div class="image-container" title="Last entered: {$user['last_entered']|date_format:"%A, %B %e, %Y %H:%M"}">
                        {if $user['avatar']}
                        <img src="{get_path file="admins/{$user['avatar']}"}" alt=""/>
                        {else}
                        <img src="{get_path file='admins/no_avatar.jpg'}" alt=""/>
                        {/if}
                    </div>
                    <div class="profile-link">{$user['first_name']} {$user['last_name']}</div>
                </a>
                <a href="{get_path url='admin'}" class="element-container">
                    <span class="fa fa-desktop"></span>
                    <div class="profile-link">Dashboard</div>
                </a>
                <a href="{get_path url='admin/themes'}" class="element-container">
                    <span class="fa fa-code"></span>
                    <div class="profile-link">Themes</div>
                </a>
                <a href="{get_path url='admin/articles'}" class="element-container">
                    <span class="fa fa-file-text-o"></span>
                    <div class="profile-link">Articles</div>
                </a>
                <a href="{get_path url='admin/pages'}" class="element-container">
                    <span class="fa fa-file-text"></span>
                    <div class="profile-link">Pages</div>
                </a>
                <a href="{get_path url='admin/settings'}" class="element-container">
                    <span class="fa fa-cogs"></span>
                    <div class="profile-link">Settings</div>
                </a>
            </aside>
            <div id="MainContent">
                {include file=$template}
            </div>
        </div>
        {/if}
    </body>
</html>
