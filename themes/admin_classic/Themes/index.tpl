<script type="text/javascript" src="{get_path asset='js/masonry.pkgd.min.js'}"></script>
<script type="text/javascript" src="{get_path asset='js/themes-list.js'}"></script>
<h1><span class="fa fa-desktop"></span> Themes</h1>
<div id="breadcrumb">
    <a href="{get_path url="admin"}">
        <span class="fa fa-desktop"></span> Dashboard
    </a>
    <a href="{get_path url="admin/themes"}">Themes</a>
</div>
<header>Admin themes</header>
<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{get_path url='admin/themes/edit'}" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{get_path url='admin/themes/edit'}">Add new theme</a>
        </div>
    </div>
    {foreach $themes as $theme}
    {if $theme->theme_type == 'admin'}
    <div class="masonry-element-container{if $theme->current == 1} current{/if}">
        <a href="{get_path url="admin/themes/delete?id={$theme->id}"}" class="element-delete"><span class="fa fa-times"></span></a>
        <a href="{get_path url="admin/themes/edit?id={$theme->id}"}" class="preview_image">
            <img src="{if !isset($theme->main_image) or $theme->main_image == ''}{get_path asset='img/no_photo.png'}{else}{get_path asset=['../',$theme->theme_path,'/',$theme->preview_image]|implode}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{get_path url="admin/themes/setCurrent?id={$theme->id}"}" class="element-current"><span class="fa fa-check"></span></a>
            <a href="{get_path url="admin/themes/edit?id={$theme->id}"}">{$theme->theme_name}</a>
        </div>
    </div>
    {/if}
    {/foreach}
</section>
<header>Public themes</header>
<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{get_path url='admin/themes/edit'}" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{get_path url='admin/themes/edit'}">Add new theme</a>
        </div>
    </div>
    {foreach $themes as $theme}
    {if $theme->theme_type == 'public'}
    <div class="masonry-element-container{if $theme->current == 1} current{/if}">
        <a href="{get_path url="admin/themes/delete?id={$theme->id}"}" class="element-delete"><span class="fa fa-times"></span></a>
        <a href="{get_path url="admin/themes/edit?id={$theme->id}"}" class="preview_image">
            <img src="{if !isset($theme->preview_image) or $theme->preview_image == ''}{get_path asset='img/no_photo.png'}{else}{$theme->preview_image}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{get_path url="admin/themes/setCurrent?id={$theme->id}"}" class="element-current">
                {if $theme->current == 1}
                <span class="fa fa-check-square-o" title="Theme is selected!"></span>
                {else}
                <span class="fa fa-check" title="Select this theme..."></span>
                {/if}
            </a>
            <a href="{get_path url="admin/themes/edit?id={$theme->id}"}">{$theme->theme_name}</a>
        </div>
    </div>
    {/if}
    {/foreach}
</section>