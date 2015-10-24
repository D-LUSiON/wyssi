<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="no-js ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="no-js ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 8)|!(IE)]><!--><html class="no-js" lang="en"> <!--<![endif]-->
    <head>
        <!--- Basic Page Needs
        ================================================== -->
        <base href="{$themeDir}"/>
        <meta charset="utf-8">
        <title>Sparrow - Free Responsive HTML5/CSS3 Template</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- Mobile Specific Metas
        ================================================== -->
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <!-- CSS
        ================================================== -->
        <link rel="stylesheet" href="css/default.css">
        <link rel="stylesheet" href="css/layout.css">
        <link rel="stylesheet" href="css/media-queries.css">
        <!-- Script
        ================================================== -->
        <script src="js/modernizr.js"></script>
        <!-- Favicons
             ================================================== -->
        <link rel="shortcut icon" href="favicon.ico" > 
    </head>
    <body>
        <!-- Header
        ================================================== -->
        <header>
            <div class="row">
                <div class="twelve columns">
                    <div class="logo">
                        <a href="index.html"><img alt="" src="images/logo.png"></a>
                    </div>
                    <nav id="nav-wrap">
                        <a class="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                        <a class="mobile-btn" href="#" title="Hide navigation">Hide navigation</a>
                        <ul id="nav" class="nav">
                            <li class="current"><a href="index.htm">Home</a></li>
                            <li><span><a href="blog.html">Blog</a></span>
                                <ul>
                                    <li><a href="blog.html">Blog Index</a></li>
                                    <li><a href="single.html">Post</a></li>
                                </ul>
                            </li>
                            <li><span><a href="portfolio-index.html">Portfolio</a></span>
                                <ul>
                                    <li><a href="portfolio-index.html">Portfolio Index</a></li>
                                    <li><a href="portfolio.html">Portfolio Entry</a></li>
                                </ul>
                            </li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="styles.html">Features</a></li>
                        </ul> <!-- end #nav -->
                    </nav> <!-- end #nav-wrap -->
                </div>
            </div>
        </header> <!-- Header End -->
        <!-- Intro Section
        ================================================== -->
        
        {include file=$template}

        <!-- footer
        ================================================== -->
        <footer>
            <div class="row">
                <div class="twelve columns">
                    <ul class="footer-nav">
                        <li><a href="#">Home.</a></li>
                        <li><a href="#">Blog.</a></li>
                        <li><a href="#">Portfolio.</a></li>
                        <li><a href="#">About.</a></li>
                        <li><a href="#">Contact.</a></li>
                        <li><a href="#">Features.</a></li>
                    </ul>
                    <ul class="footer-social">
                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i class="fa fa-skype"></i></a></li>
                        <li><a href="#"><i class="fa fa-rss"></i></a></li>
                    </ul>
                    <ul class="copyright">
                        <li>Copyright &copy; 2014 Sparrow</li> 
                        <li>Design by <a href="http://www.styleshout.com/">Styleshout</a></li>               
                    </ul>
                </div>
                <div id="go-top" style="display: block;"><a title="Back to Top" href="#">Go To Top</a></div>
            </div>
        </footer> <!-- Footer End-->
        <!-- Java Script
        ================================================== -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>');</script>
        <script type="text/javascript" src="js/jquery-migrate-1.2.1.min.js"></script>
        <script src="js/jquery.flexslider.js"></script>
        <script src="js/doubletaptogo.js"></script>
        <script src="js/init.js"></script>
    </body>
</html>