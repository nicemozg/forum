document.addEventListener('click', (event) => {
    var target = event.target;
    if (target.classList.contains('like-dislike-comment-btn')) {
        clickLikeOrDislikeButtonForAllCategory(target)
    }
});

function clickLikeOrDislikeButtonForAllCategory(target){
    const action = target.dataset.action; // Получаем действие из атрибута data-action
    const commentIDString = getCommentIDString(target);
    const commentID = getCommentID(target);
    if (action === "like") {
        console.log("Like")
        if (commentIDString) {
            isCommentLiked(commentIDString).then((isLiked) => {
                if (isLiked === null) {
                    target.dataset.action = "unlike"; // Обновляем действие
                    sendLikeOrDislikeForComment(commentID, 1)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 1){
                    target.dataset.action = "unlike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 2){
                    target.dataset.action = "unlike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislikeForComment(commentID, 1)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "dislike") {
        console.log("Dislike")
        if (commentIDString) {
            isCommentLiked(commentIDString).then((isLiked) => {
                if (isLiked === null) {
                    target.dataset.action = "undislike"; // Обновляем действие
                    sendLikeOrDislikeForComment(commentID, 2)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 1){
                    target.dataset.action = "undislike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislikeForComment(commentID, 2)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 2){
                    target.dataset.action = "undislike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "unlike") {
        console.log("Unlike")
        if (commentIDString) {
            isCommentLiked(commentIDString).then((isLiked) => {
                if (isLiked === null) {
                    target.dataset.action = "like"; // Обновляем действие
                    sendLikeOrDislikeForComment(commentID, 1)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                } else if (isLiked.like_type === 1) {
                    target.dataset.action = "like"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                } else if (isLiked.like_type === 2) {
                    target.dataset.action = "like"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislikeForComment(commentID, 1)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "undislike") {
        console.log("Undislike")
        if (commentIDString) {
            isCommentLiked(commentIDString).then((isLiked) => {
                if (isLiked === null) {
                    target.dataset.action = "dislike"; // Обновляем действие
                    sendLikeOrDislikeForComment(commentID, 2)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if (isLiked.like_type === 1) {
                    target.dataset.action = "dislike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislikeForComment(commentID, 2)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                } else if (isLiked.like_type === 2) {
                    target.dataset.action = "dislike"; // Обновляем действие
                    sendUnLikeOrUnDislikeForComment(commentIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    }
}

function getCommentID(button) {
    return parseInt(button.dataset.commentid);
}

function getCommentIDString(button) {
    return button.dataset.commentid;
}

function sendLikeOrDislikeForComment(commentID, likeType) {
    // Создаем объект с данными для отправки
    const data = {
        comment_id: commentID,
        like_type: likeType
    };
    console.log(data);

    // Возвращаем результат цепочки обещаний
    return fetch('/like-comment', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/like-comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            } else {
                // В случае ошибки выбрасываем ошибку, чтобы ее обработать в блоке catch
                throw new Error('OPTIONS request failed');
            }
        })
        .then(function(response) {
            // Обрабатываем ответ
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Передаем ошибку для обработки в вызывающем коде
        });
}

function sendUnLikeOrUnDislikeForComment(commentID) {
    // Возвращаем результат fetch, чтобы его можно было обработать в вызывающем коде
    return fetch(`/unlike-comment?comment_id=${commentID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return response.text();
            } else {
                // В случае ошибки выбрасываем ошибку, чтобы ее обработать в блоке catch
                throw new Error('Failed to unlike/dislike comment');
            }
        })
        .then(function(data) {
            // Возвращаем данные для обработки в вызывающем коде
            console.log("Like removed successfully")
            return data;
        })
        .catch(function(error) {
            // Обрабатываем ошибки и возвращаем их для обработки в вызывающем коде
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

function isCommentLiked(commentID) {
    return fetch(`/is-comment-liked?comment_id=${commentID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return response.json(); // Возвращаем JSON вместо текста
            } else {
                // В случае ошибки выводим сообщение или обрабатываем ее
                throw new Error('Failed to unlike/dislike post');
            }
        })
        .then(function(data) {
            console.log(data)
            return data; // Возвращаем данные JSON
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            modal("Please authenticate","red", 0, 3000)
            console.error('There was a problem with the fetch operation:', error);
        });
}

function fetchCommentLikes(commentId) {
    const url = `/comment-likes?comment_id=${commentId}`;
    console.log('Fetching comment likes:', url);

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Получены лайки комментария:', data);
            return data; // возвращаем данные о лайках
        })
        .catch(error => {
            console.error('Ошибка при получении лайков комментария:', error);
            throw error; // Пробрасываем ошибку выше
        });
}


