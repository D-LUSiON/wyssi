<script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
<script type="text/javascript" src="js/pages-list.js"></script>

<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{$mainDir}admin/pages/edit" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{$mainDir}admin/pages/edit">Add new page</a>
        </div>
    </div>
    {foreach $pages as $page}
    <div class="masonry-element-container">
        <a href="{$mainDir}admin/pages/edit?id={$page->id}">
            <img src="{if !isset($page->main_image) or $page->main_image == ''}img/no_photo.png{else}{$mainDir}{$page->main_image}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{$mainDir}admin/pages/delete?id={$page->id}" style="float: right">[X]</a>
            <a href="{$mainDir}admin/pages/edit?id={$page->id}">{$page->title}</a>
        </div>
    </div>    
    {/foreach}
</section>