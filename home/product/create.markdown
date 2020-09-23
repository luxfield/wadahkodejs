---
layout: users/dashboard
title: Wadahkode
description: Create
---

<div class="uk-container uk-background-default">
<h4 class="uk-margin-top">Buat product</h4>

<div>
    <form id="form-create" method="POST">
    <fieldset class="uk-fieldset">
        <!--legend class="uk-legend">Judul</legend-->
        <div class="uk-margin">
            <input class="uk-input" id="title" name="title" type="text" placeholder="nama productnya apa?" autocomplete="off">
        </div>
        <div class="uk-margin" uk-margin>
            <div class="uk-flex">
                <input class="uk-input uk-background-secondary uk-text-light uk-disabled" id="hostname" value="{{ site.url }}/">
                <input class="uk-input uk-disabled" id="url" name="url" value="">
            </div>
        </div>
        <div class="uk-margin">
            <textarea class="uk-textarea" id="contents" name="contents" rows="5" placeholder="keterangan productnya gimana?"></textarea>
        </div>
        <div class="uk-margin">
            <button type="button" class="uk-button uk-button-primary uk-button-small quick-btn-create">kirim</button>
        </div>
    </fieldset>
</form>
</div>
</div>