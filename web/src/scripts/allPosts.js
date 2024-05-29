document.addEventListener('DOMContentLoaded', function() {
    handleAllCategoriesRequest()
        .then(function(categories) {
            const selectedCategories = categories.map(category => category.name);
            const selectedCategoriesFromLocalStorage = getSuccessButtonsTextFromLocalStorage();
            if (selectedCategoriesFromLocalStorage.length === 0) {
                allPosts(selectedCategories);
            } else {
                allPosts(selectedCategoriesFromLocalStorage);
            }
            })
            .catch(function(error) {
                console.error('Error fetching categories:', error);
            });
});

const allPostsBtn = document.getElementById('all-posts-btn');
allPostsBtn.addEventListener('click', function(event) {
    handleAllCategoriesRequest()
        .then(function(categories) {
            const selectedCategories = categories.map(category => category.name);
                allPosts(selectedCategories);
        })
        .catch(function(error) {
            console.error('Error fetching categories:', error);
        });
});



function getAllPosts() {
    // Отправляем OPTIONS запрос для предварительной проверки CORS
    return fetch('/posts', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            } else {
                // В случае ошибки выводим сообщение или обрабатываем ее
                throw new Error('OPTIONS request failed');
            }
        })
        .then(function(response) {
            // Обрабатываем ответ
            if (!response.ok) {
                modal("Internal server error","red", 0, 3000);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            return data; // Возвращаем данные, чтобы их можно было использовать далее
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
        });
}

