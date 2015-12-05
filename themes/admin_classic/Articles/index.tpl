<script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
<script type="text/javascript" src="js/pages-list.js"></script>

<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{$mainDir}admin/pages/edit" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{$mainDir}admin/pages/edit">Add new page</a>
        </div>
    </div>
    {foreach $articles as $article}
    <div class="masonry-element-container">
        <a href="{$mainDir}admin/pages/edit?id={$article->id}">
            <img src="{if !isset($article->main_image) or $article->main_image == ''}img/no_photo.png{else}{$mainDir}{$article->main_image}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{$mainDir}admin/articles/delete?id={$article->id}" style="float: right">[X]</a>
            <a href="{$mainDir}admin/articles/edit?id={$article->id}">{$article->title}</a>
        </div>
    </div>    
    {/foreach}
</section>