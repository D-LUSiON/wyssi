<aside>
    <a href="{get_path url="admin/user"}" class="element-container">
        <div class="image-container" title="Last entered: {$user->last_entered|date_format:"%A, %B %e, %Y %H:%M"}">
            {if $user->avatar}
                <img src="{get_path file="admins/{$user->avatar}"}" alt=""/>
            {else}
                <img src="{get_path file='admins/no_avatar.jpg'}" alt=""/>
            {/if}
        </div>
        <div class="profile-link">{$user->first_name} {$user->last_name}</div>
    </a>
    <a href="{get_path url='admin'}" class="element-container">
        <span class="fa fa-desktop"></span>
        <div class="profile-link">Dashboard</div>
    </a>
    <div class="element-container submenu-trigger" data-href="#submenu-site_content">
        <span class="fa fa-code"></span>
        <div class="profile-link">Site Content</div>
    </div>

    <div class="element-container submenu-trigger" data-href="#submenu-users">
        <span class="fa fa-users"></span>
        <div class="profile-link">Users</div>
    </div>
    <div class="element-container submenu-trigger" data-href="#submenu-settings">
        <span class="fa fa-cogs"></span>
        <div class="profile-link">Settings</div>
    </div>
</aside>
<aside class="submenu">
    <div class="submenu-content" id="submenu-site_content">
        <a href="{get_path url='admin/themes'}" class="element-container">
            <span class="fa fa-code"></span>
            <div class="element-title">Themes</div>
            <div class="element-subtitle">View installed themes</div>
        </a>
        <a href="{get_path url='admin/articles'}" class="element-container">
            <span class="fa fa-file-text-o"></span>
            <div class="element-title">Articles</div>
            <div class="element-subtitle">Create or edit articles</div>
        </a>
        <a href="{get_path url='admin/pages'}" class="element-container">
            <span class="fa fa-file-text"></span>
            <div class="element-title">Pages</div>
            <div class="element-subtitle">Create or edit pages</div>
        </a>
        <a href="{get_path url='admin/files'}" class="element-container">
            <span class="fa fa-file"></span>
            <div class="element-title">Files</div>
            <div class="element-subtitle">Uploaded files browser</div>
        </a>
    </div>
    <div class="submenu-content" id="submenu-users">
        <a href="{get_path url="admin/user/listUsers"}">
            <span class="fa fa-users"></span>
        </a>
    </div>
    <div class="submenu-content" id="submenu-settings">
        <a href="{get_path url='admin/settings'}" class="element-container">
            <span class="fa fa-cogs"></span>
        </a>
    </div>
</aside>