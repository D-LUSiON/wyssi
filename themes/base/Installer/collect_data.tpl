<div class="form-container">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo_installer.png"}" alt=""/>
        </div>
    </div>
    <h3>Provide some data about the site, you're about to create</h3>
    <form method="POST" autocomplete="off">
        <input type="hidden" name="step" value="collect_data"/>
        <input type="hidden" name="next_step" value="end_install"/>
        <fieldset>
            <legend>Website info</legend>
            <div class="form_row-container">
                <label>Title</label>
                <input type="text" name="website[name]" placeholder=""/>
            </div>
            <div class="form_row-container">
                <label>Description</label>
                <textarea name="website[description]" placeholder=""></textarea>
            </div>
            <div class="form_row-container">
                <label>Category</label>
                <input type="text" name="website[category]" placeholder=""/>
            </div>
            <div class="form_row-container">
                <label>Tags</label>
                <input type="text" name="website[tags]" placeholder=""/>
            </div>
        </fieldset>
        <fieldset>
            <legend>Owner info</legend>
            <div class="form_row-container">
                <label>Name</label>
                <input type="text" name="owner[name]" placeholder=""/>
            </div>
            <div class="form_row-container">
                <label>Country</label>
                <input type="text" name="owner[country]" placeholder=""/>
            </div>
            <div class="form_row-container">
                <label>City</label>
                <input type="text" name="owner[city]" placeholder=""/>
            </div>
            <div class="form_row-container">
                <label>Email</label>
                <input type="text" name="owner[email]" placeholder=""/>
            </div>
        </fieldset>
        <div class="buttons-container center">
            <button type="submit">Finish</button>
        </div>
    </form>
</div>