function handleCommentListPost(postId) {
    console.log('Handling comment list post:', postId);
    getCommentsByPostIdRequest(postId)
        .then(function(comments) {
            console.log('Received comments:', comments);
            const commentPostListBlock = document.getElementById('comment-list-post');
            commentPostListBlock.innerHTML = ''; // Очищаем содержимое контейнера перед рендерингом новых комментариев
            comments.forEach(function(comment) {
                console.log('Rendering comment:', comment);
                const date = new Date(comment.created_at);
                // Получаем год, месяц и день
                const year = date.getFullYear();
                const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
                const day = date.getDate();
                const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

                // Создаем элемент для комментария
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment-block-list');
                commentElement.classList.add('text-center');
                commentElement.innerHTML = `
                    <h6 class="mt-2 mb-2">Author: <em>${comment.author_name}</em></h6>
                    <p class="comment-post-content mt-2 mb-2 mx-auto">${comment.content}</p>
                    <p class="mt-2 mb-2">Created: <em>${formattedDate}</em></p>
                    <div>
                        <button onclick="getCommentID(this)" class="btn btn-danger btn-sm like-dislike-comment-btn like-button" data-action="like" data-commentid="${comment.id}">Like:</button>
                        <button onclick="getCommentID(this)" class="btn btn-dark btn-sm like-dislike-comment-btn dislike-button" data-action="dislike" data-commentid="${comment.id}">Dislike:</button>
                    </div>
                `;
                commentPostListBlock.appendChild(commentElement); // Добавляем элемент в контейнер

                // Получаем лайки для данного комментария и обновляем кнопки
                updateLikesForComment(commentElement, comment.id);
            });
        })
        .catch(function(error) {
            console.error('Error handling comment list post:', error);
            // Здесь вы можете добавить обработку ошибки, если это необходимо
        });
}

document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.classList.contains('like-dislike-comment-btn')) {
        console.log('Like or dislike button clicked:', target);

        // Получаем commentElement и commentId
        const commentElement = target.parentElement.parentElement;
        const commentId = parseInt(target.dataset.commentid);
        console.log(target.dataset.action + "Test")

        // Вызываем функцию с задержкой 1 секунда
        setTimeout(function() {
            updateLikesForComment(commentElement, commentId);
        }, 100);
    }
});

function updateLikesForComment(commentElement, commentId) {
    fetchCommentLikes(commentId)
        .then(function(likesData) {
            const likeButton = commentElement.querySelector('.like-button');
            const dislikeButton = commentElement.querySelector('.dislike-button');

            likeButton.textContent = `Like: ${likesData.like}`;
            dislikeButton.textContent = `Dislike: ${likesData.dislike}`;
        })
        .catch(function(error) {
            console.error('Error fetching likes for comment:', error);
        });
}




