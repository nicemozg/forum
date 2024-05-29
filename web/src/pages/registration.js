function switchToRegistrationForm() {
    // Изменяем класс элемента с id "login-form" с "d-block" на "d-none"
    hideLoginForm()
    openRegisterForm()
    // Вставляем разметку регистрационной формы в элемент с id "registration"
    var registrationFormMarkup = `
            <div class="sign-up-box">
                <div class="box box-register">        
                        <div class="form">
                        <h3 class="jersey-10-regular">Registration</h3>                
                            <div class="inputBox jersey-10-regular">                    
                                <input id="register-username" type="text" name="username" required="required">
                                <span>Username</span>                    
                                <i></i>
                            </div>                
                            <div class="inputBox">
                                <input id="register-email" type="text" name="email" required="required">                    
                                <span>Email</span>
                                <i></i>                
                            </div>
                            <div class="inputBox">                    
                                <input id="register-password" type="password" name="password"
                                required="required">
                                <span>Password</span>                    
                                <i></i>
                            </div>
                            <div class="inputBox">                    
                                <input id="register-confirm-password" type="password" name="confirm_password"
                                required="required">
                                <span>Confirm Password</span>                    
                                <i></i>
                            </div>  
                            <button id="registration-submit-btn"
                                type="submit"
                                class="btn btn-light mt-3"
                                >Submit
                            </button>
                            <button
                            id="open-login-form-from-register-form-btn"
                                class="btn btn-light mt-3"
                                >Autentification
                            </button>
                            <button 
                                 id="close-register-form-btn"
                                 class="btn-close mt-3 btn-close-form"
                                 aria-label="Close"
                            </button>       
                        </div>
                </div>
            </div>
    `;
    var registrationFormContainer = document.getElementById("registration-form");
    registrationFormContainer.innerHTML = registrationFormMarkup;
    var registerInputIds = ["register-username", "register-email", "register-password", "register-confirm-password"];
    checkForCyrillicInput(registerInputIds);
    hideRenderPostsList()

    // Добавление обработчика события для кнопки "Submit"
    var registrationSubmitButton = document.getElementById("registration-submit-btn");
    if (registrationSubmitButton) {
        registrationSubmitButton.addEventListener("click", function(event) {
            handleRegistrationSubmit(event)
        });
    }
    // Добавление обработчика события для кнопки "Autentification"
    var openLoginFormButton = document.getElementById("open-login-form-from-register-form-btn");
    if (openLoginFormButton) {
        openLoginFormButton.addEventListener("click", function(event) {
            hideRegisterForm(event);
            openLoginForm(event);
        });
    }

    // Добавление обработчика события для кнопки "Close"
    var closeRegisterFormBtn = document.getElementById("close-register-form-btn");
    if (closeRegisterFormBtn) {
        closeRegisterFormBtn.addEventListener("click", function() {
            hideModal();
            hideRegisterForm()
            openRenderPostsList()
        });
    }
}

