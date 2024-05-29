document.addEventListener("DOMContentLoaded", function() {
    var addPostButton = document.getElementById("add-post-btn");
    var addPostFormMarkup = `   
   <div class="sign-up-box jersey-10-regular">
    <div class="box box-post">
        <div class="form text-center">
            <h3 class="jersey-10-regular">New Post</h3>
            <p>Please select one or more categories</p>
            <div class="inputBox-post">
                <input 
                    id="post-header" type="text"
                    required="required"
                    name="post"
                    maxlength="20">
                    <span>Post Header</span>
                     <i></i>
            </div>
            <div class="inputBox-post">
                <textarea id="post-description" required="required" name="postDescription" maxlength="200"></textarea>
            </div>
            <div class="inputBox-post">
                <label class="upload-photo" for="photo-file-input">Upload Photo</label>
                <input 
                    id="post-photo-file-input" type="file"
                    name="photo"
                    accept="image/*">
            </div>
            <button id="submit-add-post-btn"
                    type="submit"
                    class="btn btn-light mt-3">Add Post
            </button>
            <button 
                    id="close-add-post-form-btn"
                    class="btn-close mt-3 btn-close-form"
                    aria-label="Close"
            </button>
        </div>
    </div>
</div>
    `;
    var addPostFormContainer = document.getElementById("add-post-form");
    addPostButton.addEventListener("click", function() {
        hideRenderPostsList();
        hideLoginForm();
        hideRegisterForm();
        hideAddCategoryForm();
        hideModal();
        openAddPostForm();
        selectAllCategoriesClassButtonLight();
        hideDetailPostBlock();
        hideCommentPostBlock();
        hideCommentListBlock();
        addPostFormContainer.innerHTML = addPostFormMarkup;

        // Добавление обработчика события для кнопки "Submit"
        var submitAddPostFormBtn = document.getElementById("submit-add-post-btn");
        if (submitAddPostFormBtn) {
            submitAddPostFormBtn.addEventListener("click", function(event) {
                hideModal();
                handleAddPostSubmit(event);
                console.log(getSuccessButtonsText())
            });
        }
        // Добавление обработчика события для кнопки "Close"
        var closeAddPostButton = document.getElementById("close-add-post-form-btn");
        if (closeAddPostButton) {
            closeAddPostButton.addEventListener("click", function() {
                openRenderPostsList();
                hideModal();
                hideAddPostForm()
            });
        }
    });
});

function getSuccessButtonsText() {
    var buttons = document.querySelectorAll(".category-button");
    var successButtonTexts = [];
    var encounteredTexts = {}; // Объект для отслеживания уникальных текстов

    buttons.forEach(function(button) {
        if (button.classList.contains("btn-success") && button.textContent === "Select all categories") {
            buttons.forEach(function(button) {
                if (button.textContent !== "Select all categories" && !encounteredTexts[button.textContent]) {
                    successButtonTexts.push(button.textContent);
                    encounteredTexts[button.textContent] = true; // Устанавливаем флаг для обнаруженного текста
                }
            });
        } else if (button.classList.contains("btn-success") && !encounteredTexts[button.textContent]) {
            successButtonTexts.push(button.textContent);
            encounteredTexts[button.textContent] = true; // Устанавливаем флаг для обнаруженного текста
        }
    });

    return successButtonTexts;
}

function selectAllCategoriesClassButtonLight(){
    var buttons = document.querySelectorAll(".category-button");
    buttons.forEach(function(button) {
        // Если текущая кнопка не кнопка "Select all categories"
        if (button.textContent === "Select all categories") {
            if (button.classList.contains("btn-success")) {
                buttons.forEach(function(button) {
                    button.classList.remove("btn-success");
                    button.classList.add("btn-dark");
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
}





