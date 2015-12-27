<div class="form-container">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo_installer.png"}" alt=""/>
        </div>
    </div>
    <h3>Choose a theme for the admin interface and for the public site:</h3>
    <form method="POST">
        <input type="hidden" name="step" value="choose_themes"/>
        <input type="hidden" name="next_step" value="collect_data"/>
        <div class="themes_section-container">
            <div class="themes_section-heading">Admin themes</div>
            <div class="themes_section-list">
                {foreach $themes as $theme}
                    {if $theme->theme_type == 'admin'}
                        <label class="theme-container{if $theme->preview_image} preview{/if}">
                            <input type="radio" name="theme_admin" value="{$theme->id}" required/>
                            <div class="image-container">
                                {if $theme->preview_image}
                                <img src="{get_path url="themes/{$theme->theme_path}/{$theme->preview_image}"}" alt=""/>
                                {else}
                                <img src="{get_path asset="img/no_photo.png"}" alt=""/>
                                {/if}
                            </div>
                            <div class="theme-info">
                                {$theme->theme_name}
                                
                            </div>
                        </label>
                    {/if}
                {/foreach}
            </div>
        </div>
        <div class="themes_section-container">
            <div class="themes_section-heading">Public site themes</div>
            <div class="themes_section-list">
                {foreach $themes as $theme}
                    {if $theme->theme_type == 'public'}
                        <label class="theme-container{if $theme->preview_image} preview{/if}">
                            <input type="radio" name="theme_public" value="{$theme->id}" required/>
                            <div class="image-container">
                                {if $theme->preview_image}
                                <img src="{get_path url="themes/{$theme->theme_path}/{$theme->preview_image}"}" alt=""/>
                                {else}
                                <img src="{get_path asset="img/no_photo.png"}" alt=""/>
                                {/if}
                            </div>
                            <div class="theme-info">
                                {$theme->theme_name}
                            </div>
                        </label>
                    {/if}
                {/foreach}
            </div>
        </div>
        <div class="buttons-container center">
            <button type="submit">Continue...</button>
        </div>
    </form>
</div>