<div class="form-container">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo_installer.png"}" alt=""/>
        </div>
    </div>
    <h3>Now let's register the first administrator...</h3>
    <h5>(you can edit your full profile later)</h5>
    <form method="POST">
        <input type="hidden" name="step" value="reg_admin"/>
        <input type="hidden" name="next_step" value="choose_themes"/>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-sign-in"></span>
                <input type="text" name="username" placeholder="Admin login username" required/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-key"></span>
                <input type="password" name="password" placeholder="Admin login password" required/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container two_columns">
                <span class="fa fa-user"></span>
                <input type="text" name="first_name" placeholder="Admin first name" required/>
                <input type="text" name="last_name" placeholder="Admin last name" required/>
            </div>
        </div>
        <div class="buttons-container center">
            <button type="submit">Continue...</button>
        </div>
    </form>
</div>