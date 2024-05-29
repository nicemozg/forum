// Функция для обработки события добавления новой категории
function addCategoryForFrontList() {
    // Получаем значение новой категории из поля ввода
    var categoryName = document.getElementById("category-name").value;

    // Создаем новую кнопку для новой категории
    var newCategoryButton = document.createElement("button");
    newCategoryButton.className = "btn btn-light category-button";
    newCategoryButton.textContent = categoryName;

    // Добавляем новую кнопку в контейнер категорий
    var categoriesContainer = document.querySelector(".categories-container");
    categoriesContainer.appendChild(newCategoryButton);
}


function handleAddCategorySubmit(event) {
    event.preventDefault();
    // Получаем значения полей
    var categoryName = document.getElementById("category-name").value;
    if(categoryName === ""){
        modal(`The input field cannot be empty.`,"red", 0,3000)
        return
    }
    console.log("Category", categoryName);

    // Подготавливаем данные для отправки
    var formData = {
        name: categoryName,
    };
    console.log(formData)
    // Отправляем OPTIONS запрос для предварительной проверки CORS
    fetch('/create-category', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/create-category', {
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
                modal(`Category \"${categoryName}\" already exists.`,"red", 0,3000)
                throw new Error('Network response was not ok');
            }
            return response.statusText; // <-- Исправлено
        })
        .then(function(data) {
            hideAddCategoryForm()
            openRenderPostsList();
            console.log("response was ok");
            modal(`Category ${categoryName} is created.`,"green", 0,3000)
            console.log(data);
            // Перезагрузить страницу после успешного добавления категории
            window.location.reload();
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
        });
}

