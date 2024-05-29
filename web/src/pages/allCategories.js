function generateCategoryButtons(categories) {
    // Создаем элементы формы и кнопки "Select all categories"
    var form = document.createElement("div");
        form.className = "mt-3 mx-auto categories-box";
    var selectAllButtonContainer = document.createElement("div");
        selectAllButtonContainer.className = "mx-auto text-center select-all";
    var selectAllButton = document.createElement("button");
        selectAllButton.className = "btn btn-dark category-button";
        selectAllButton.textContent = "Select all categories";
    // Добавляем кнопку "Select all categories" в соответствующий контейнер
        selectAllButtonContainer.appendChild(selectAllButton);
    // Создаем контейнер для кнопок категорий
    var categoriesContainer = document.createElement("div");
        categoriesContainer.className = "categories-container mt-2 pb-3 text-center";
    // Создаем кнопки категорий на основе данных из массива
    categories.forEach(function(category) {
        var button = document.createElement("button");
        button.className = "btn btn-dark category-button";
        button.textContent = category.name;
        // Добавляем каждую кнопку в контейнер категорий
        categoriesContainer.appendChild(button);
    });
    // Добавляем контейнер с кнопками категорий и кнопку "Select all categories" в форму
        form.appendChild(selectAllButtonContainer);
        form.appendChild(categoriesContainer);
    // Получаем ссылку на элемент, в который будем вставлять форму
    var allCategoriesContainer = document.getElementById("all-categories");
    // Очищаем контейнер перед добавлением новой формы
        allCategoriesContainer.innerHTML = '';
    // Добавляем сформированную форму в контейнер всех категорий
        allCategoriesContainer.appendChild(form);
    // Отображаем контейнер всех категорий, если он скрыт
        allCategoriesContainer.classList.remove("d-none");
}
function fetchDataAndGenerateButtons() {
    // Выполняем запрос данных о категориях
    handleAllCategoriesRequest()
        .then(function(categories) {
            // Вызываем функцию для генерации кнопок на основе полученных данных
            generateCategoryButtons(categories);
            // Получаем контейнер кнопок
            var containerSelectAll = document.querySelector(".select-all");
            var categoriesContainer = document.querySelector(".categories-container");
            // Получаем кнопки
            var buttons = categoriesContainer.querySelectorAll(".category-button");
            var buttonSelectAll = containerSelectAll.querySelector(".category-button");
            // Проверяем количество кнопок
            if (buttons.length <= 5) {
                // Когда кнопок мало, центрируем их
                categoriesContainer.style.justifyContent = "center";
            } else {
                // Когда кнопок много, выравниваем их слева
                categoriesContainer.style.justifyContent = "space-between";
            }
            var selectedCategories = getSuccessButtonsTextFromLocalStorage();
                buttons.forEach(function(button) {
                    if (selectedCategories.length === 0){
                        if(buttonSelectAll.classList.contains("btn-dark")){
                            toggleButtonClass(buttonSelectAll)
                        }
                        if(button.classList.contains("btn-dark")){
                            toggleButtonClass(button)
                        }
                    }else{
                        if (selectedCategories.includes(button.textContent)) {
                            if(button.classList.contains("btn-dark")){
                                button.classList.remove("btn-dark");
                                button.classList.add("btn-success");
                            }
                        }
                        if(buttons.length === selectedCategories.length){
                            if(buttonSelectAll.classList.contains("btn-dark")){
                                toggleButtonClass(buttonSelectAll)
                            }
                        }
                    }
                });
        })
        .catch(function(error) {
            console.error("Error fetching categories:", error);
        });
}
document.addEventListener("DOMContentLoaded", function() {
    // Вызываем функцию для загрузки данных и генерации кнопок при загрузке страницы
    fetchDataAndGenerateButtons();
});
// Функция для переключения классов кнопки
function toggleButtonClass(button) {
    button.classList.toggle("btn-dark"); // Переключаем класс btn-light
    button.classList.toggle("btn-success"); // Переключаем класс btn-success
}
// Обработчик события для каждой кнопки категории
document.addEventListener("click", function(event) {
    var target = event.target;
    // Проверяем, была ли нажата кнопка категории
    if (target.classList.contains("category-button")) {
        // Если нажата кнопка "Select all categories"
        if (target.textContent === "Select all categories") {
            // Устанавливаем класс "btn-success" для кнопки "Select all categories"
            toggleButtonClass(target);
            // Получаем все кнопки категорий
            var buttons = document.querySelectorAll(".category-button");
            // Проходимся по каждой кнопке категории
            buttons.forEach(function(button) {
                // Если текущая кнопка не кнопка "Select all categories"
                if (button.textContent === "Select all categories") {
                    if (button.classList.contains("btn-success")) {
                        buttons.forEach(function(button) {
                            button.classList.remove("btn-dark");
                            button.classList.add("btn-success");
                        });
                    }else{
                        // Устанавливаем класс "btn-light" для всех остальных кнопок
                        buttons.forEach(function(button) {
                            button.classList.remove("btn-success");
                            button.classList.add("btn-dark");
                        });
                    }
                }
            });
            saveSuccessButtonsTextToLocalStorage();
            handleButtonClick();
        } else {
            // Если нажата другая кнопка категории
            // Вызываем функцию для переключения классов кнопки
            toggleButtonClass(target);
            // Получаем все кнопки категорий
            var buttons = document.querySelectorAll(".category-button");
            // Проходимся по каждой кнопке категории
            buttons.forEach(function(button) {
                // Если текущая кнопка  "Select all categories"
                if (button.textContent === "Select all categories") {
                    button.classList.remove("btn-success");
                    button.classList.add("btn-dark");
                }
            });
            saveSuccessButtonsTextToLocalStorage();
            handleButtonClick();
        }
    }
});
// Функция для получения постов на основе выбранных категорий и их отображения
function handleButtonClick() {
    // Получаем массив текстов успешных кнопок
    var selectedCategories = getSuccessButtonsText();
    // Вызываем функцию для отображения постов на основе выбранных категорий
    allPosts(selectedCategories);
}

function saveSuccessButtonsTextToLocalStorage() {
    var successButtonTexts = getSuccessButtonsText();
    localStorage.setItem('successButtonTexts', JSON.stringify(successButtonTexts));
}

function getSuccessButtonsTextFromLocalStorage() {
    var successButtonTextsString = localStorage.getItem('successButtonTexts');
    if (successButtonTextsString) {
        return JSON.parse(successButtonTextsString);
    } else {
        return []; // Если данных нет, возвращаем пустой массив
    }
}



