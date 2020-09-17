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
<body id="App">
    <div class="uk-position-relative uk-position-z-index">
        <div id="homeNavbar" class="uk-position-top">
            <nav class="uk-navbar-container uk-navbar-transparent" uk-navbar>
                <div class="uk-navbar-left">
                    <a href="#" class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-push"></a>
                    <!--span class="uk-logo @uk-margin-small-left">
                        {{ page.title }}
                    </span-->
                </div>
                <div class="uk-navbar-right">
                    <ul class="uk-navbar-nav">
                        <li class="uk-active">
                            <a href="{{ site.url }}/id/login.html">
                                Masuk
                            </a>
                        </li>
                        <li>
                            <a href="{{ site.url }}/register.html">
                                <span class="uk-badge uk-padding-small">Daftar</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img width="20" src="{{ site.url }}/assets/lang/indonesia.png"/>&nbsp;<span uk-icon="icon: chevron-down"></span>
                            </a>
                            <div class="uk-navbar-dropdown">
                                <span class="uk-text-muted">Ganti bahasa</span>
                                <hr/>
                                <ul class="uk-nav uk-navbar-dropdown-nav">
                                    <li class="uk-active"><a href="{{ site.url }}/id">Indonesia</a></li>
                                    <li><a href="{{ site.url }}">English</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="uk-height-large uk-background-cover uk-light uk-flex" uk-parallax="bgx: 100; bgy: -300" style="background-image: url('{{ site.url }}/assets/images/illustration-business-people-avatar/43638.jpg')">
            <div class="uk-width-1-2@m @uk-text-center uk-margin-top uk-margin-auto-vertical uk-padding uk-padding-small">
                <h1 class="">Selamat datang teman-teman</h1>
                <p class="uk-text-lead">Anda sedang melihat portofolio saya yang sangat sederhana.</p>
            </div>
        </div>
    </div>
    <div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true">
        <div class="uk-offcanvas-bar uk-background-default">
            <!--button class="uk-offcanvas-close" type="button" uk-close></button-->
            <!--h3>General</h3-->
            <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                <li class="uk-active"><a href="#">Umum</a></li>
                <li><a href="{{ site.url }}/id"><span class="uk-margin-small-right" uk-icon="icon: home"></span> Beranda</a></li>
                <li><a href="{{ site.url }}/id/about.html"><span class="uk-margin-small-right" uk-icon="icon: info"></span> Tentang saya</a></li>
            </ul>
        </div>
    </div>
    
    {{ content }}
    <script src="{{ site.url }}/vendor/jquery/dist/jquery.min.js"></script>
    <script src="{{ site.url }}/vendor/uikit/js/uikit.js"></script>
    <script src="{{ site.url }}/vendor/fontawesome/js/all.min.js"></script>
</body>
</html>