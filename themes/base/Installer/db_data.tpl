<div class="form-container">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo_installer.png"}" alt=""/>
        </div>
    </div>
    <h3>OK, let's start with the installation...</h3>
    <form method="POST" autocomplete="off">
        <input type="hidden" name="step" value="db_data"/>
        <input type="hidden" name="next_step" value="reg_admin"/>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-globe"></span>
                <input type="text" name="db_host" placeholder="Database host, leave blank for 'localhost'"/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-database"></span>
                <input type="text" name="db_name" placeholder="Database name, leave blank for 'wyssi'"/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-sign-in"></span>
                <input type="text" name="db_user" value="root" placeholder="Database user" required/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-key"></span>
                <input type="password" name="db_pass" value="" placeholder="Database password"/>
            </div>
        </div>
        <div class="buttons-container center">
            <button type="submit">Continue...</button>
        </div>
    </form>
</div>