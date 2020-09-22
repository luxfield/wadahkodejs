---
layout: admin/dashboard
title: Wadahkode
description: Create
---

<h3>Create post</h3>

<div>
    <form id="form-edit" method="POST">
    <fieldset class="uk-fieldset">
        <!--legend class="uk-legend">Judul</legend-->
        <div class="uk-margin">
            <input class="uk-input" id="title" name="title" type="text" placeholder="judulnya apa?" autocomplete="off">
        </div>
        <div class="uk-margin" uk-margin>
            <div class="uk-flex">
                <input class="uk-input uk-background-secondary uk-text-light uk-disabled" id="hostname" value="{{ site.url }}/">
                <input class="uk-input uk-disabled" id="url" name="url" value="">
            </div>
        </div>
        <div class="uk-margin">
            <textarea class="uk-textarea" id="contents" name="contents" rows="5" placeholder="isinya apa?"></textarea>
        </div>
        <div class="uk-margin">
            <button type="button" class="uk-button uk-button-primary quick-btn-edit">update</button>
        </div>
    </fieldset>
</form>
</div>