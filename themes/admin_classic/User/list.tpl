<script type="text/javascript" src="{get_path asset='js/masonry.pkgd.min.js'}"></script>
<script type="text/javascript" src="{get_path asset='js/user-list.js'}"></script>
<h1><span class="fa fa-desktop"></span> Users list</h1>
<div id="breadcrumb">
    <a href="{get_path url="admin"}">
        <span class="fa fa-desktop"></span> Dashboard
    </a>
    <a href="{get_path url="admin/edit"}">Users list</a>
</div>
<section class="masonry-container">
    <div class="masonry-element-container">
        <a href="{get_path url="admin/pages/edit"}" class="element-add fa fa-plus"></a>
        <div class="element-info">
            <a href="{get_path url="admin/pages/edit"}">Add new user</a>
        </div>
    </div>
    {foreach $users as $user}
    <div class="masonry-element-container">
        <a href="{get_path url="admin/user/delete?id={$user->id}"}" class="element-delete"><span class="fa fa-times"></span></a>
        <a href="{get_path url="admin/user/edit?id={$user->id}"}">
            <img src="{if !isset($user->avatar) or $user->avatar == ''}{get_path asset='img/no_photo.png'}{else}{get_path file=$user->avatar}{/if}" alt=""/>
        </a>
        <div class="element-info">
            <a href="{get_path url="admin/user/edit?id={$user->id}"}">{$user->first_name} {$user->last_name}</a>
        </div>
    </div>    
    {/foreach}
</section>