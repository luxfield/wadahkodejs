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
</head>
<body>
    {% if page.permalink == "/" %}
    <div class="uk-position-relative">
        <div class="uk-position-top">
            <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
                <div class="uk-navbar-left">
                    <a href="{{ site.url }}" class="uk-navbar-item uk-logo">{{ page.title }}</a>
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav">
                        <li class="uk-active">
                            <a href="{{ site.url }}/index.html">Home</a>
                        </li>
                        <li>
                            <a href="{{ site.url }}/about.html">About me</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
        <div class="uk-height-large uk-background-cover uk-light uk-flex" uk-parallax="bgx: 100; bgy: -300" style="background-image: url('assets/images/illustration-business-people-avatar/43638.jpg')">
            <div class="uk-width-1-2@m @uk-text-center uk-margin-top uk-margin-auto-vertical uk-padding uk-padding-small">
                <h1 class="">Welcome Friends</h1>
                <p class="uk-text-lead">You're looking at my very simple portfolio.</p>
            </div>
        </div>
    </div>
    {% endif %}
    
    {% if page.permalink == "/tools" %}
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
        <div class="uk-navbar-left">
            <a href="{{ site.url }}" class="uk-navbar-item uk-logo">{{ page.title }}</a>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li class="uk-active">
                    <a href="{{ site.url }}/index.html">Home</a>
                </li>
                <li>
                    <a href="{{ site.url }}/about.html">About me</a>
                </li>
            </ul>
        </div>
    </nav>
    {% include credit.md %}
    {% endif %}
    
    {% if page.permalink == "/about.html" %}
    <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
        <div class="uk-navbar-left">
            <a href="{{ site.url }}" class="uk-navbar-item uk-logo">{{ page.title }}</a>
        </div>
        <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
                <li class="uk-active">
                    <a href="{{ site.url }}/index.html">Home</a>
                </li>
                <li>
                    <a href="{{ site.url }}/about.html">About me</a>
                </li>
            </ul>
        </div>
    </nav>
    {% endif %}
    
    {{ content }}
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="{{ site.url }}/vendor/uikit/js/uikit.js" type="text/javascript" charset="utf-8"></script>
    <script src="{{ site.url }}/vendor/fontawesome/js/all.min.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>