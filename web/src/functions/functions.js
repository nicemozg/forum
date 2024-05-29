function hideLoginForm() {
    var loginForm = document.getElementById("login-form");
    if (loginForm.classList.contains("d-block")) {
        loginForm.classList.remove("d-block");
        loginForm.classList.add("d-none");
    }
}

function openLoginForm() {
    var loginForm = document.getElementById("login-form");
    if (loginForm.classList.contains("d-none")) {
        loginForm.classList.remove("d-none");
        loginForm.classList.add("d-block");
    }
}

function hideRegisterForm() {
    var registerForm = document.getElementById("registration-form");
    if (registerForm.classList.contains("d-block")) {
        registerForm.classList.remove("d-block");
        registerForm.classList.add("d-none");
    }
}

function openRegisterForm() {
    var loginForm = document.getElementById("registration-form");
    if (loginForm.classList.contains("d-none")) {
        loginForm.classList.remove("d-none");
        loginForm.classList.add("d-block");
    }
}

function checkForCyrillicInput(inputIds) {
    inputIds.forEach(function(inputId) {
        var input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', function(event) {
                var value = event.target.value;
                if (/[а-яА-ЯЁё]/.test(value)) {
                    modal("Only Latin letters", "red", 0, 120000);
                    event.target.value = '';
                }
            });
        }
    });
}

function hideLogoutButtonAfetrIsLogin() {
    var loginButton = document.getElementById("login-btn");
    var logoutButton = document.getElementById("logout-btn");
    if (loginButton.classList.contains("d-none") && logoutButton.classList.contains("d-none")) {
        loginButton.classList.remove("d-none");
        loginButton.classList.add("d-block");
    }
}

function handleAuthentification() {
    hideLoginForm();
    hideLoginButton();
    openLogoutButton();
    openAddCategoryButton();
    openAddPostButton();
    openLikedPostsBtn();
    openMyPostsBtn();
}

function hideLoginButton() {
    var loginButton = document.getElementById("login-btn");
    if (loginButton.classList.contains("d-block")) {
        loginButton.classList.remove("d-block");
        loginButton.classList.add("d-none");
    }
}

function openLoginButton() {
    var loginButton = document.getElementById("login-btn");
    if (loginButton.classList.contains("d-none")) {
        loginButton.classList.remove("d-none");
        loginButton.classList.add("d-block");
    }
}

function hideLogoutButton() {
    var loginButton = document.getElementById("logout-btn");
    if (loginButton.classList.contains("d-block")) {
        loginButton.classList.remove("d-block");
        loginButton.classList.add("d-none");
    }
}

function openLogoutButton() {
    var logoutButton = document.getElementById("logout-btn");
    if (logoutButton.classList.contains("d-none")) {
        logoutButton.classList.remove("d-none");
        logoutButton.classList.add("d-block");
    }
}

function modal(text, color, delayOpen, delayClose) {
    var loginFormMarkup = `
        <div class="modal-box text-center mx-auto">
            <h6 class=${color}>${text}</h6>
        </div> 
    `;
    var modal = document.getElementById("modal-block");
    if (modal.classList.contains("d-none")) {
        setTimeout(function() {
            modal.classList.remove("d-none");
            modal.classList.add("d-block");
            console.log(text + ": modal open")
        }, delayOpen);
    }
    modal.innerHTML = '';
    modal.innerHTML = loginFormMarkup;
    // Установка таймера для скрытия модального окна
    setTimeout(function() {
        modal.classList.remove("d-block");
        modal.classList.add("d-none");
        console.log(text + ": modal closed")
    }, delayClose);
}

function hideModal() {
    var loginForm = document.getElementById("modal-block");
    if (loginForm.classList.contains("d-block")) {
        loginForm.classList.remove("d-block");
        loginForm.classList.add("d-none");
    }
}

function openAddCategoryForm() {
    var addCategoryForm = document.getElementById("add-category-form");
    if (addCategoryForm.classList.contains("d-none")) {
        addCategoryForm.classList.remove("d-none");
        addCategoryForm.classList.add("d-block");
    }
}

function hideAddCategoryForm() {
    var addCategoryForm = document.getElementById("add-category-form");
    if (addCategoryForm.classList.contains("d-block")) {
        addCategoryForm.classList.remove("d-block");
        addCategoryForm.classList.add("d-none");
    }
}

function hideAddCategoryButton() {
    var addCategoryButton = document.getElementById("add-category-btn");
    if (addCategoryButton.classList.contains("d-block")) {
        addCategoryButton.classList.remove("d-block");
        addCategoryButton.classList.add("d-none");
    }
}

function openAddCategoryButton() {
    var addCategoryButton = document.getElementById("add-category-btn");
    if (addCategoryButton.classList.contains("d-none")) {
        addCategoryButton.classList.remove("d-none");
        addCategoryButton.classList.add("d-block");
    }
}

function hideAddPostButton() {
    var addPostButton = document.getElementById("add-post-btn");
    if (addPostButton.classList.contains("d-block")) {
        addPostButton.classList.remove("d-block");
        addPostButton.classList.add("d-none");
    }
}

function openAddPostButton() {
    var addPostButton = document.getElementById("add-post-btn");
    if (addPostButton.classList.contains("d-none")) {
        addPostButton.classList.remove("d-none");
        addPostButton.classList.add("d-block");
    }
}

function hideAddPostForm() {
    var addPostForm = document.getElementById("add-post-form");
    if (addPostForm.classList.contains("d-block")) {
        addPostForm.classList.remove("d-block");
        addPostForm.classList.add("d-none");
    }
}

function openAddPostForm() {
    var addPostForm = document.getElementById("add-post-form");
    if (addPostForm.classList.contains("d-none")) {
        addPostForm.classList.remove("d-none");
        addPostForm.classList.add("d-block");
    }
}

function hideRenderPostsList() {
    var renderPostList = document.getElementById("all-posts-render-block");
    if (renderPostList.classList.contains("d-block")) {
        renderPostList.classList.remove("d-block");
        renderPostList.classList.add("d-none");
    }
}

function openRenderPostsList() {
    var renderPostList = document.getElementById("all-posts-render-block");
    if (renderPostList.classList.contains("d-none")) {
        renderPostList.classList.remove("d-none");
        renderPostList.classList.add("d-block");
    }
}

function hideDetailPostBlock() {
    var renderDetailPost = document.getElementById("detail-post-block");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openDetailPostBlock() {
    var renderDetailPost = document.getElementById("detail-post-block");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideCommentPostBlock() {
    var renderDetailPost = document.getElementById("comment-post-block");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openCommentPostBlock() {
    var renderDetailPost = document.getElementById("comment-post-block");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideCommentListBlock() {
    var renderDetailPost = document.getElementById("comment-list-block");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openCommentListBlock() {
    var renderDetailPost = document.getElementById("comment-list-block");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideDeleteModal() {
    var renderDetailPost = document.getElementById("modal-delete-block");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openDeleteModal() {
    var renderDetailPost = document.getElementById("modal-delete-block");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideMyPostsBtn() {
    var renderDetailPost = document.getElementById("my-posts-btn");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openMyPostsBtn() {
    var renderDetailPost = document.getElementById("my-posts-btn");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideLikedPostsBtn() {
    var renderDetailPost = document.getElementById("liked-posts-btn");
    if (renderDetailPost.classList.contains("d-block")) {
        renderDetailPost.classList.remove("d-block");
        renderDetailPost.classList.add("d-none");
    }
}

function openLikedPostsBtn() {
    var renderDetailPost = document.getElementById("liked-posts-btn");
    if (renderDetailPost.classList.contains("d-none")) {
        renderDetailPost.classList.remove("d-none");
        renderDetailPost.classList.add("d-block");
    }
}

function hideModalOpenPosts() {
    hideDeleteModal();
    openRenderPostsList();
}

function modalForDelete( postTitle, postId){
    hideRenderPostsList();
    openDeleteModal();
    console.log("modalForDelete - " + postId + " - " + postTitle);
    var confirmDeleteForm = `
      <div id="modal-delete-block" class="modal" style="display: block; 
      position: fixed; 
      top: 0; right: 0; 
      bottom: 0; left: 0; 
      background: rgba(0,0,0,0.5); z-index: 9999;">
            <div style="position: absolute; 
                        top: 25%; left: 50%; 
                        transform: translate(-50%, -50%); 
                        background-image: radial-gradient( circle farthest-corner at 7.2% 13.6%,  rgba(37,249,245,1) 0%, rgba(8,70,218,1) 90% );
                        padding: 20px; border-radius: 5px;">
                <h5>${postTitle}</h5>
                <p>Do you want to delete this post?</p>
                <div style="text-align: right;">
                    <button type="button" style="margin-right: 10px; 
                    padding: 5px 10px; 
                    border: none; 
                    background-image: radial-gradient( circle farthest-corner at 17.1% 22.8%,  rgba(226,24,24,1) 0%, rgba(160,6,6,1) 90% );
                    color: #fff; 
                    border-radius: 3px; 
                    cursor: pointer;" 
                    onclick="deletePost(${postId})">Yes</button>
                    <button type="button" style="padding: 5px 10px; 
                    border: none; 
                    background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );
                    color: #fff; 
                    border-radius: 3px; 
                    cursor: pointer;" 
                    onclick="hideModalOpenPosts()">No</button>
                </div>
            </div>
        </div>
    `;

    updateModalContent(confirmDeleteForm);
    function updateModalContent(content) {
        var modal = document.getElementById("modal-delete-block");
        modal.innerHTML = content;
    }
}