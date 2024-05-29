// Добавление обработчика события для кнопки "Logout"
var logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
        hideModal();
        hideLoginForm();
        hideRegisterForm()
        hideAddCategoryForm()
        handleLogOutSubmit()
    });
}

function handleLogOutSubmit(){
    fetch('/logout', {
        method: 'POST', // или другой метод HTTP, который вы используете
        credentials: 'same-origin' // отправлять куки только в случае, если URL тот же самый, что и текущая страница
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            modal("Logged out successfully!","green", 0, 1000);
            hideLogoutButton();
            openLoginButton();
            hideAddCategoryButton();
            hideAddCategoryForm();
            hideAddPostButton();
            hideAddPostForm();
            hideLikedPostsBtn();
            hideMyPostsBtn();
            setUserName("Unauthorized");
            var authProvider = localStorage.getItem('auth_provider');
            redirectToAuthProvider(authProvider);
            console.log(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function redirectToAuthProvider(authProvider) {
    switch(authProvider) {
        case 'google':
            window.location.href = 'https://accounts.google.com/logout';
            break;
        case 'github':
            window.location.href = 'https://github.com/logout';
            break;
        // Добавьте другие провайдеры по мере необходимости
        default:
            // Перенаправление на главную страницу или другую страницу по умолчанию
            window.location.href = '/';
            break;
    }
}