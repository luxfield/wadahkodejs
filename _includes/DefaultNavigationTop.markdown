

<div class="uk-position-relative uk-position-z-index uk-height-small">
    <div id="homeNavbar" class="uk-position-fixed uk-width-1-1">
        <nav class="uk-navbar-container uk-navbar-transparent uk-background-muted uk-box-shadow-medium" uk-navbar>
            <div class="uk-navbar-left">
                <!--a href="#" class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-push"></a-->
                <a href="{{ site.url }}/index.html" class="uk-button uk-padding-small">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </a>
                <!--span class="uk-logo @uk-margin-small-left">
                    {{ page.title }}
                </span-->
            </div>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li class="uk-active">
                        <a href="{{ site.url }}/login.html">
                            Login
                        </a>
                    </li>
                    <li>
                        <a href="{{ site.url }}/register.html">
                            <span class="uk-badge uk-padding-small">Register</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</div>