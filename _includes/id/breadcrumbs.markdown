<ul class="uk-breadcrumb">
    <li>
        <a href="{{ site.url }}/id">Beranda</a>
    </li>
    <li>
        {% if page.permalink == '/about.html' %}
            <span>Tentang saya</span>
        {% else %}
            <a href="{{ site.url }}/id/about.html">Tentang saya</a>
        {% endif %}
    </li>
</ul>