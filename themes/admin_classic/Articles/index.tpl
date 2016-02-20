<script type="text/javascript" src="{get_path asset='js_lib/masonry.pkgd.min.js'}"></script>
<script type="text/javascript" src="{get_path asset='js/articles-list.js'}"></script>
<h1><span class="fa fa-desktop"></span> Pages list</h1>
<div id="breadcrumb">
    <a href="{get_path url="admin"}">
        <span class="fa fa-desktop"></span> Dashboard
    </a>
    <span>Articles</span>
</div>
<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{get_path url="admin/articles/edit"}" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{get_path url="admin/articles/edit"}">Add new article</a>
        </div>
    </div>
    {foreach $articles as $article}
    <div class="masonry-element-container">
        <a href="{get_path url="admin/articles/delete?id={$article->id}"}" class="element-delete"><span class="fa fa-times"></span></a>
        <a href="{get_path url="admin/articles/edit?id={$article->id}"}">
            <img src="{if !isset($article->main_image) or $article->main_image == ''}{get_path asset='img/no_photo.png'}{else}{get_path file=$article->main_image}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{get_path url="admin/articles/edit?id={$article->id}"}">{$article->title}</a>
        </div>
    </div>    
    {/foreach}
</section>