document.addEventListener("DOMContentLoaded", function() {
    checkAuthentication();
});

function checkAuthentication() {
    fetch('/is-login', {
        method: 'GET',
        credentials: 'same-origin' // Отправлять куки только в случае, если URL тот же самый, что и текущая страница
    })
        .then(response => {
            if (!response.ok) {
                hideLogoutButtonAfetrIsLogin();
                hideAddCategoryButton();
                hideAddPostButton();
                hideLikedPostsBtn();
                hideMyPostsBtn();
                setUserName("Unauthorized");
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            // Проверяем статус аутентификации и вызываем функцию handleAuthentication
            handleAuthentification();
            // Преобразовываем полученные данные в объект JSON
            const userData = JSON.parse(data);
            // Проверяем, существует ли объект userData и содержит ли он свойство username
            if (userData && userData.username) {
                // Сохраняем только username в localStorage
                localStorage.setItem('username', userData.username);
                localStorage.setItem('auth_provider', userData.auth_provider);
                console.log('Пользователь авторизован: ', userData.username);
            } else {
                console.error('Ошибка: Не удалось получить данные пользователя');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            // Здесь обработка ошибки при запросе
        });
}
