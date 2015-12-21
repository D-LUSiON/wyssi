<div id="LoginForm">
    <div class="logo-container">
        <div class="logo">
            <img src="{get_path asset="img/logo.png"}" alt=""/>
        </div>
    </div>
    <form action="{get_path url='admin/user/logUser'}" method="POST">
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-user"></span>
                <input type="text" name="username" placeholder="Username"/>
            </div>
        </div>
        <div class="form_row-container">
            <div class="icon_input-container">
                <span class="fa fa-key"></span>
                <input type="password" name="password" placeholder="Password"/>
            </div>
        </div>
        <div class="buttons-container center">
            <button type="submit">Log in</button>
        </div>
    </form>
</div>