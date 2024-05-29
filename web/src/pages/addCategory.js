document.addEventListener("DOMContentLoaded", function() {
var addCategoryButton = document.getElementById("add-category-btn");
var form = `   
   <div class="sign-up-box jersey-10-regular">
    <div class="box box-category">
        <div class="form text-center">
            <h3 class="jersey-10-regular">Add Category</h3>
            <div class="inputBox">
                <input 
                id="category-name" type="text"
                required="required"
                name="category">
                <span>Enter category name</span>
                <i></i>
            </div>
            <button id="category-submit-button"
                    type="submit"
                    class="btn btn-light mt-5">Save and close
            </button>
            <button 
                    id="close-category-form-btn"
                    class="btn-close mt-3 btn-close-form"
                    aria-label="Close"
            </button>
        </div>
    </div>
</div>
    `;
var categoryFormContainer = document.getElementById("add-category-form");
    addCategoryButton.addEventListener("click", function() {
        hideRenderPostsList();
    hideRegisterForm();
    hideLoginForm();
    hideAddPostForm();
    hideDetailPostBlock();
    hideCommentPostBlock();
    hideCommentListBlock();
    openAddCategoryForm();
    categoryFormContainer.innerHTML = form;

// Добавление обработчика события для кнопки "Save"
var saveCategoryFormBtn = document.getElementById("category-submit-button");
if (saveCategoryFormBtn) {
    saveCategoryFormBtn.addEventListener("click", function(event) {
        handleAddCategorySubmit(event);
        console.log("Save button clicked")
});
}
// Добавление обработчика события для кнопки "Close"
var closeCategoryFormBtn = document.getElementById("close-category-form-btn");
if (closeCategoryFormBtn) {
    closeCategoryFormBtn.addEventListener("click", function() {
        hideAddCategoryForm();
        openRenderPostsList();
            });
        }
    });
});


