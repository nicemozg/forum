function handCommentSubmit(postId) {
    // Получаем значения полей
    var comment = document.getElementById("post-comment").value;
    var postIdInt = parseInt(postId);

    // Проверяем, что комментарий не пустой
    if (!comment) {
        modal("Comment cannot be empty", "red", 0, 3000)
        return;
    }

    // Подготавливаем данные для отправки
    var formData = {
        content: comment,
        post_id: postIdInt
    };
    console.log(formData)
    // Отправляем OPTIONS запрос для предварительной проверки CORS
    fetch('/create-comment', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/create-comment', {
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
                modal("Comment is not created please authorized","red", 0, 3000);
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            modal("Comment created","green", 0,3000)
            document.getElementById("post-comment").value = "";
            handleCommentListPost(postId);
            console.log(data);
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
        });
}