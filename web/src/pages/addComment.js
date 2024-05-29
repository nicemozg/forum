function handleCommentPost(postId) {
    const commentPostBlock = document.getElementById('comment-post');
    commentPostBlock.innerHTML = ''; // Очищаем содержимое контейнера перед рендерингом новых постов
    const commentElement = document.createElement('div'); // Создаем элемент div
    commentElement.classList.add('post-card-detail');
    commentElement.classList.add('text-center');
    commentElement.innerHTML = `
                        <div>
                        <button
                            id="close-detail-comment-form-btn"
                            class="btn-close btn-close-detail-post comment-post-form-btn"
                            aria-label="Close"
                        </button>
                        </div>
                        <h2 class="mt-1 mb-1">Write your comment</h2>
                        <div class="text-center mx-auto comment-div">
                            <textarea id="post-comment" class="comment-post-text" placeholder="Please write you comment"></textarea>
                        </div>
                        <button class="btn btn-dark mt-1 mb-1" onclick="handCommentSubmit('${postId}')">Submit

                    `;
    commentPostBlock.appendChild(commentElement);
}

document.addEventListener("click", function(event) {
    var target = event.target;
    // Проверяем, была ли нажата кнопка категории
    if (target.classList.contains("comment-post-form-btn")) {
        hideCommentPostBlock()
    }
});

