<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ page.title }} | {{ page.description }}</title>
    <link rel="stylesheet" href="{{ site.url }}/vendor/uikit/css/uikit.css" />
    <link rel="stylesheet" href="{{ site.url }}/vendor/fontawesome/css/all.min.css">
    <link rel="shortcut icon" href="{{ site.url }}/favicon.jpg" type="image/x-icon" />
    <style>
        #content {
            margin-top: -4.5rem;
        }
    </style>
</head>
<body id="App">
    {% include users/navigation/index.markdown %}
    <div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true">
        <div class="uk-offcanvas-bar uk-background-default">
            <!--button class="uk-offcanvas-close" type="button" uk-close></button-->
            <!--h3>General</h3-->
            <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                <li class="uk-active"><a href="#">General</a></li>
                <li><a href="{{ site.url }}/home/index.html"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Homepage</a></li>
                <li class="uk-parent">
                    <a href="#">
                        <span class="uk-margin-small-right" uk-icon="icon: file-text"></span>&nbsp;Product
                    </a>
                    <ul class="uk-nav-sub">
                        <li>
                            <a href="{{ site.url }}/home/product/index.html">
                                <span uk-icon="icon: hashtag"></span>&nbsp;All product
                            </a>
                        </li>
                        <li>
                            <a href="{{ site.url }}/home/product/create.html">
                                <span uk-icon="icon: pencil"></span>&nbsp;Create product
                            </a>
                        </li>
                        <li>
                            <a href="{{ site.url }}/home/product/draft.html">
                                <span uk-icon="icon: file"></span>&nbsp;Draft product
                            </a>
                        </li>
                    </ul>
                </li>
                <li><a href="{{ site.url }}/home/version.html"><span class="uk-margin-small-right" uk-icon="icon: info"></span> version 1.0.8</a></li>
            </ul>
        </div>
    </div>
    <div id="content" class="uk-position-relative uk-background-muted">
        <div class="uk-container-small">
            {{ content }}
        </div>
    </div>
    <script src="{{ site.url }}/vendor/jquery/dist/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="{{ site.url }}/vendor/uikit/js/uikit.js" type="text/javascript" charset="utf-8"></script>
    <script src="{{ site.url }}/vendor/fontawesome/js/all.min.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>