<script type="text/javascript" src="{get_path asset='js/masonry.pkgd.min.js'}"></script>
<script type="text/javascript" src="{get_path asset='js/pages-list.js'}"></script>
<h1><span class="fa fa-desktop"></span> Pages list</h1>
<div id="breadcrumb">
    <a href="{get_path url="admin"}">
        <span class="fa fa-desktop"></span> Dashboard
    </a>
    <a href="{get_path url="admin/edit"}">Pages</a>
</div>
<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{$mainDir}admin/pages/edit" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{$mainDir}admin/pages/edit">Add new page</a>
        </div>
    </div>
    {foreach $pages as $page}
    <div class="masonry-element-container">
        <a href="{get_path url="admin/pages/delete?id={$page->id}"}" class="element-delete"><span class="fa fa-times"></span></a>
        <a href="{$mainDir}admin/pages/edit?id={$page->id}">
            <img src="{if !isset($page->main_image) or $page->main_image == ''}{get_path asset='img/no_photo.png'}{else}{get_path file=$page->main_image}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{get_path url="admin/pages/edit?id={$page->id}"}">{$page->title}</a>
        </div>
    </div>    
    {/foreach}
</section>