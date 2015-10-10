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
    <body>
        <header>
            <div class="menu-row1">
                <div class="wrapper">
                    <div class="menu-container left">
                        <div class="menu-trigger fa fa-bars"></div>
                        <div class="menu-dropdown-container">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                    <div class="menu-container right">
                        <div class="menu-trigger fa fa-sign-out"></div>
                        <div class="menu-dropdown-container">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </div>
                    </div>
                    <div class="logo-container">
                        <img src="img/logo.png" alt=""/>
                    </div>
                </div>
            </div>
            <div class="menu-row2">
                <ul class="submenu-container">
                    <li>
                        <a href="{$mainDir}admin/index" class="">Home</a>
                    </li>
                    <li>
                        <a href="{$mainDir}admin/themes" class="">Themes</a>
                    </li>
                    <li>
                        <a href="{$mainDir}admin/pages" class="">Pages</a>
                    </li>
                </ul>
            </div>
        </header>
        <div id="MainContent">
            {include file=$template}
        </div>
    </body>
</html>
