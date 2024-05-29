function handleDetailPost(postId) {
    console.log("PostId - " + postId)
    getPostByIdRequest(postId)
        .then(function(post) {
            console.log('Received post:', post);
            const detailPostBlock = document.getElementById('detail-post');
            detailPostBlock.innerHTML = ''; // Очищаем содержимое контейнера перед рендерингом новых постов
            const postElement = document.createElement('div'); // Создаем элемент div
            postElement.classList.add('post-card-detail');
            postElement.classList.add('text-center');
            postElement.innerHTML = `
                        <div>
                        <button 
                            id="close-detail-post-form-btn"
                            class="btn-close btn-close-detail-post detail-post-form-btn"
                            aria-label="Close"
                        </button>
                        </div>
                        <h2 class="mt-1 mb-1">${post.title}</h2>
                        <div class="detail-post-text text-center mx-auto">
                            <p class="mb-1 detail-post-p">${post.content}</p>
                        </div>
                        <div class="mt-1">
                            <strong class="me-2">Author: ${post.author_name}</strong>
                            <em>Created at: ${new Date(post.created_at).toLocaleString()}</em>
                        </div>
                        <button
                            class="btn btn-dark mt-1 mb-1" onclick="openCommentPostBlock()">Write comment
                        </button>
                    `;
            detailPostBlock.appendChild(postElement);
        })
        .catch(function(error) {
            modal("Failed to get data for post", "red", 0, 3000);
        });


}

document.addEventListener("click", function(event) {
    var target = event.target;
    // Проверяем, была ли нажата кнопка категории
    if (target.classList.contains("detail-post-form-btn")) {
        hideDetailPostBlock();
        hideCommentPostBlock();
        hideCommentListBlock();
        openRenderPostsList();
    }
});

