<div class="form-container">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo_installer.png"}" alt=""/>
        </div>
    </div>
    <h2>Welcome to WYSSI installation wizard!</h2>
    <h3>Press "Next" to proceed...</h3>
    <form method="POST">
        <input type="hidden" name="step" value="begin"/>
        <input type="hidden" name="next_step" value="db_data"/>
        <div class="buttons-container center">
            <button type="submit">Next</button>
        </div>
    </form>
</div>