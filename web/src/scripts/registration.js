function handleRegistrationSubmit(event) {
    event.preventDefault();

    // Получаем значения полей
    var username = document.getElementById("register-username").value;
    var email = document.getElementById("register-email").value;
    var password = document.getElementById("register-password").value;
    var confirm_password = document.getElementById("register-confirm-password").value;
    console.log("username", username, email, password, confirm_password);
    // Проверяем, что все поля заполнены
    if (!username || !email || !password || !confirm_password) {
        modal("Please fill in all fields!","red", 0, 10000);
        return;
    }

    // Проверяем совпадение паролей
    if (password !== confirm_password) {
        modal("Passwords do not match!","red", 0, 10000);
        return;
    }
    // Проверяем, что введенный email соответствует формату email-адреса
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        modal("Invalid email, please try again!","red", 0, 10000);
        return;
    }

    // Подготавливаем данные для отправки
    var formData = {
        username: username,
        email: email,
        password_hash: password
    };
    console.log(formData)
    // Отправляем OPTIONS запрос для предварительной проверки CORS
    fetch('/register', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // В случае ошибки выводим сообщение или обрабатываем ее
                throw new Error('OPTIONS request failed');
            }
        })
        .then(function(response) {
            // Обрабатываем ответ
            if (!response.ok) {
                modal("This email or username is already in use","red", 0, 30000);
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            // Делаем что-то с полученными данными, например, обновляем интерфейс
            hideRegisterForm()
            modal("You have been successfully registered","green",0, 30000)
            hideRenderPostsList();
            openLoginForm();
            console.log(data);
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
        });
}

