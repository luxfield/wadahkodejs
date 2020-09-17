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
            margin-top: 5rem;
        }
    </style>
</head>
<body>
    <div id="content" class="uk-position-relative">
        <div class="uk-container-small">{{ content }}</div>
    </div>
    <script src="{{ site.url }}/vendor/jquery/dist/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="{{ site.url }}/vendor/uikit/js/uikit.js" type="text/javascript" charset="utf-8"></script>
    <script src="{{ site.url }}/vendor/fontawesome/js/all.min.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>