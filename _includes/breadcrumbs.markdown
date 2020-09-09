<ul class="uk-breadcrumb">
    <li>
        <a href="{{ site.url }}/index.html">Home</a>
    </li>
    <li>
        {% if page.permalink == '/about.html' %}
            <span>About me</span>
        {% else %}
            <a href="{{ site.url }}/about.html">About me</a>
        {% endif %}
    </li>
</ul>