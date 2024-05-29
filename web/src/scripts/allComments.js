function getCommentsByPostIdRequest(postId) {
    return fetch(`/comments?post_id=${postId}`, { // Добавляем идентификатор поста к URL
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
                .catch(function(error) {
                    throw new Error('Failed to parse JSON response');
                });
        })
        .then(function(comments) {
            // Здесь вы можете использовать полученный объект поста
            console.log('Comments:', comments);
            // Верните пост, чтобы использовать его дальше
            return comments;
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Пробрасываем ошибку дальше для обработки
        });
}
