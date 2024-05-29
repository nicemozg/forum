document.addEventListener("DOMContentLoaded", function() {
    var loginButton = document.getElementById("login-btn");
    var loginFormMarkup = `   
   <div class="sign-up-box jersey-10-regular">
    <div class="box box-login">
        <div class="form text-center">
            <h3 class="jersey-10-regular">Autentification</h3>
            <div class="inputBox">
                <input 
                id="login-username" type="text"
                required="required"
                name="username">
                <span>Username</span>
                <i></i>
            </div>
            <div class="inputBox">
                <input 
                id="login-password" type="password"
                required="required"
                name="password">
                <span>Password</span>
                <i></i>
            </div>
            <button id="login-submit-button"
                    type="submit"
                    class="btn btn-light mt-5">Submit
            </button>
             <button id="login-google-button" type="submit" class="btn btn-light mt-3">
                    <i class="fab fa-google"></i> Sign in with Google
            </button>
            <button id="login-github-button" type="submit" class="btn btn-light mt-2">
                    <i class="fab fa-github"></i> Sign in with GitHub
            </button>
            <button id="switch-To-Register-form-btn"
                    class="btn btn-light mt-3">Registration
            </button>
            <button 
                    id="close-login-form-btn"
                    class="btn-close mt-3 btn-close-form"
                    aria-label="Close"
            </button>
        </div>
    </div>
</div>
    `;
    var loginFormContainer = document.getElementById("login-form");
    loginButton.addEventListener("click", function() {
        hideRegisterForm();
        openLoginForm();
        hideRenderPostsList();
        hideDetailPostBlock();
        hideCommentPostBlock();
        hideCommentListBlock();
        loginFormContainer.innerHTML = loginFormMarkup;
        var loginInputIds = ["login-username", "login-password"];
        checkForCyrillicInput(loginInputIds);

        // Добавление обработчика события для кнопки "Submit"
        var submitLoginFormBtn = document.getElementById("login-submit-button");
        if (submitLoginFormBtn) {
            submitLoginFormBtn.addEventListener("click", function(event) {
                hideModal();
                handleLoginSubmit(event);
            });
        }
        // Добавление обработчика события для кнопки "Sign in Google"
        var submitGoogleFormBtn = document.getElementById("login-google-button");
        if (submitGoogleFormBtn) {
            submitGoogleFormBtn.addEventListener("click", function(event) {
                hideModal();
                sendGoogleLoginRequest(event);
            });
        }
        // Добавление обработчика события для кнопки "Sign in Github"
        var submitGithubFormBtn = document.getElementById("login-github-button");
        if (submitGithubFormBtn) {
            submitGithubFormBtn.addEventListener("click", function(event) {
                hideModal();
                sendGitHubLoginRequest(event);
            });
        }
        // Добавление обработчика события для кнопки "Registration"
        var switchToRegistrationFormBtn = document.getElementById("switch-To-Register-form-btn");
        if (switchToRegistrationFormBtn) {
            switchToRegistrationFormBtn.addEventListener("click", function(event) {
                switchToRegistrationForm(event)
            });
        }
        // Добавление обработчика события для кнопки "Close"
        var closeLoginFormBtn = document.getElementById("close-login-form-btn");
        if (closeLoginFormBtn) {
            closeLoginFormBtn.addEventListener("click", function() {
                hideModal();
                hideLoginForm();
                openRenderPostsList();
            });
        }
    });
});


