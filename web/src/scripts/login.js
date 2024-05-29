function handleLoginSubmit(event) {
    event.preventDefault();

    // Получаем значения полей
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    console.log("username", username, password);

    // Подготавливаем данные для отправки
    var formData = {
        username: username,
        password: password
    };
    console.log(formData)
    // Отправляем OPTIONS запрос для предварительной проверки CORS
    fetch('/login', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/login', {
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
                modal("Invalid username or password","red", 0, 10000);
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            hideLoginForm();
            hideLoginButton();
            openLogoutButton();
            openAddCategoryButton();
            openAddPostButton();
            openRenderPostsList();
            openLikedPostsBtn();
            openMyPostsBtn();
            localStorage.setItem('username', username);
            var userName = localStorage.getItem('username');
            setUserName(userName); // Вызываем функцию setUserName и передаем ей имя пользователя
            modal("You have logged in","green", 0,3000)
            console.log(data);
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    var userName = localStorage.getItem('username');
    if (userName) {
        setUserName(userName);
    }
});


function setUserName(userName) {
    console.log(userName)
    // Находим элемент по id
    var userNameElement = document.getElementById('user-name-id');
    // Проверяем, существует ли элемент с указанным id
    if (userNameElement) {
        // Устанавливаем значение элемента равным переданному имени пользователя
        userNameElement.textContent = "";
        userNameElement.textContent = userName;
    } else {
        // Если элемент с указанным id не найден, выводим сообщение об ошибке в консоль
        console.error('Element with id "user-name-id" not found');
    }
}

function sendGoogleLoginRequest() {
    window.location.href = '/google-login-redirect';
    var userName = localStorage.getItem('username');
    setUserName(userName); // Вызываем функцию setUserName и передаем ей имя пользователя
}

function sendGitHubLoginRequest() {
    window.location.href = '/github-login-redirect';
    var userName = localStorage.getItem('username');
    setUserName(userName); // Вызываем функцию setUserName и передаем ей имя пользователя
}



