<!DOCTYPE html>
<html>
    <head>
        <base href="{$themeDir}"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Wyssi admin</title>
        <link rel="stylesheet" type="text/css" href="css/font-awesome.css" media="all"/>
        <link rel="stylesheet" type="text/css" href="css/design.css" media="all"/>
        <script type="text/javascript" src="js/js.missing_functions.js"></script>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/jquery-ui.js"></script>
        <script type="text/javascript" src="js/jquery.modalWindow.js"></script>
        <script type="text/javascript" src="js/common-scripts.js"></script>
    </head>
    <body data-main_dir="{$mainDir}">
        <header>
            <div class="menu-row1">
                <div class="wrapper">
                    <div class="menu-container left">
                        <div class="menu-trigger fa fa-bars"></div>
                        <div class="menu-dropdown-container">
                            <a href="{$mainDir}admin/index" class="menu-item">
                                <span class="fa fa-home"></span> Home
                            </a>
                            <a href="{$mainDir}admin/themes" class="menu-item">
                                <span class="fa fa-pencil-square-o"></span> Themes
                            </a>
                            <a href="{$mainDir}admin/pages" class="menu-item">
                                <span class="fa fa-file-text-o"></span> Pages
                            </a>
                            <a href="{$mainDir}admin/articles" class="menu-item">
                                <span class="fa fa-file-text-o"></span> Articles
                            </a>
                        </div>
                    </div>
                    <div class="menu-container right">
                        <div class="menu-trigger fa fa-sign-out"></div>
                        <div class="menu-dropdown-container">
                            <a href="{$mainDir}admin/user" class="menu-item">
                                <div class="image-container">
                                    <img src="{$mainDir}uploads/admins/no_avatar.jpg" alt=""/>
                                </div>
                                <span class="user-name">John Doe</span>
                            </a>
                            <a href="{$mainDir}admin/logout" class="menu-item border top">Log out</a>
                        </div>
                    </div>
                    <div class="logo-container">
                        <img src="img/logo.png" alt=""/>
                    </div>
                </div>
            </div>
            <div class="menu-row2">
                {if $controller == 'themes' and $method == 'edit'}
                <div class="layouts-container">
                    <img src="{$mainDir}resources/layouts/design01.jpg" alt=""/>
                </div>
                {else}
                <ul class="submenu-container">
                    <li>
                        <a href="{$mainDir}admin/help" class="">Help</a>
                    </li>
                </ul>
                {/if}
            </div>
        </header>
        <div id="MainContent">
            {include file=$template}
        </div>
    </body>
</html>
