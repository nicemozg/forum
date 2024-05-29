function renderMyLikedPosts(selectedCategories) {
    const allPostsList = document.getElementById('all-posts-list');
    allPostsList.innerHTML = ''; // Очищаем содержимое контейнера перед рендерингом новых постов

    // Получаем данные о постах с сервера
    getMyLikedPostsRequest()
        .then(posts => {
            // Если массив категорий пустой, ничего не выводим
            if (selectedCategories.length === 0) {
                return;
            }
            posts.forEach(item => {
                const post = item.post;
                // Проверяем, совпадает ли хотя бы одна категория поста с выбранными категориями
                const postCategories = post.categories;
                const hasMatchingCategory = postCategories.some(postCategory => {
                    return selectedCategories.includes(postCategory);
                });
                if (hasMatchingCategory) {
                    const postElement = document.createElement('div'); // Создаем элемент button
                    postElement.classList.add('post-card');
                    postElement.classList.add('text-center');
                    postElement.innerHTML = `
                        <button class="btn post-header-btn" data-postid="${post.id}">
                        ${post.title}
                        </button>
                        <h6>Catrgories: ${post.categories}</h6>
                        <div><strong class="me-2">Author: ${post.author_name}</strong></div>                   
                        <div><em>Created at: ${new Date(post.created_at).toLocaleString()}</em></div>                
                        <button onclick="getPostID(this)" class="btn btn-danger btn-sm like-dislike-btn" data-action="like" data-postid="${post.id}">Likes: ${item.likes.like}</button>
                        <button onclick="getPostID(this)" class="btn btn-dark btn-sm like-dislike-btn" data-action="dislike" data-postid="${post.id}">Dislikes: ${item.likes.dislike}</button>
                    `;

                    // Декодируем изображение и добавляем его в пост, если оно есть
                    if (post.photo) {
                        const imgElement = decodeBase64Image(post.photo);
                        postElement.insertBefore(imgElement, postElement.firstChild); // Добавляем изображение перед заголовком
                    } else {
                        // Если нет изображения, добавляем изображение по умолчанию
                        const defaultImgElement = document.createElement('img');
                        defaultImgElement.src = "web/src/styles/empty.jpg";
                        defaultImgElement.alt = 'No Image Available';
                        defaultImgElement.classList.add('post-image');
                        postElement.insertBefore(defaultImgElement, postElement.firstChild); // Добавляем изображение перед заголовком
                    }

                    document.addEventListener("click", function(event) {
                        var target = event.target;
                        if (target.classList.contains("post-header-btn")) {
                            const postId = target.getAttribute("data-postid"); // Получаем значение атрибута data-postid
                            hideRenderPostsList();
                            openDetailPostBlock();
                            openCommentPostBlock();
                            openCommentListBlock();
                            handleDetailPost(postId); // Передаем postId в функцию handleDetailPost
                            handleCommentPost(postId); // Передаем postId в функцию handleCommentPost, если она принимает postId
                            handleCommentListPost(postId); // Передаем postId в функцию handleCommentListPost

                        }
                    });
                    allPostsList.appendChild(postElement);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}


