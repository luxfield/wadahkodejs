<div class="uk-position-relative uk-position-z-index uk-height-small">
    <div id="homeNavbar" class="uk-position-fixed uk-width-1-1">
        <nav class="uk-navbar-container uk-navbar-primary uk-background-primary uk-box-shadow-medium" uk-navbar>
            <div class="uk-navbar-left">
                <a href="#" class="uk-navbar-toggle" uk-navbar-toggle-icon uk-toggle="target: #offcanvas-push"></a>
                <!--a href="{{ site.url }}/index.html" class="uk-button uk-padding-small">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>
                </a-->
                <!--span class="uk-logo @uk-margin-small-left">
                    {{ page.title }}
                </span-->
            </div>
            <div class="uk-navbar-right">
                <ul class="uk-navbar-nav">
                    <li class="uk-active">
                        <a href="#">
                            <sup class="uk-badge" style="background: #e53935;">1</sup>
                            <span uk-icon="icon: bell"></span>
                        </a>
                        <div class="uk-navbar-dropdown" uk-drop="offset: 0; boundary: !nav; boundary-align: true; pos: bottom-justify; animation: uk-animation-slide-right-small; duration: 100">
                    <ul class="uk-nav uk-navbar-dropdown-nav">
                        <li class="uk-active"><a href="#">Active</a></li>
                        <li><a href="#">Item</a></li>
                        <li class="uk-nav-header">Header</li>
                        <li><a href="#">Item</a></li>
                        <li><a href="#">Item</a></li>
                        <li class="uk-nav-divider"></li>
                        <li><a href="#">Item</a></li>
                    </ul>
                </div>
                    </li>
                    <!--li>
                        <a href="{{ site.url }}/register.html">
                            <span class="uk-badge uk-padding-small">Register</span>
                        </a>
                    </li-->
                    <li class="profile">
                        <a href="#">
                            <img width="28" height="28" src="{{ site.url }}/assets/avatar/me.jpg"/>&nbsp;<span uk-icon="icon: chevron-down"></span>
                        </a>
                        <div class="uk-navbar-dropdown">
                            <ul class="uk-nav uk-navbar-dropdown-nav">
                                <span class="uk-text-muted">wadahkode</span>
                                <hr/>
                                <li class="uk-active">
                                    <a href="{{ site.url }}">Edit profile</a>
                                </li>
                                <li>
                                    <a href="{{ site.url }}/id">Settings</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        <div id="email-verified"></div>
        <div id="notification" uk-offcanvas="flip: true; overlay: true; mode: slide;">
    <div class="uk-offcanvas-bar uk-width-auto uk-background-muted" style="margin-top: 5rem">
        <span>Notification</span>
        <hr/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
</div>
    </div>
</div>