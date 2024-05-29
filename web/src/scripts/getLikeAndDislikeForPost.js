document.addEventListener('click', (event) => {
    var target = event.target;
    if (target.classList.contains('like-dislike-btn')) {
        clickLikeOrDislikeButtonForAllPost(target)
    }
});

function clickLikeOrDislikeButtonForAllPost(target){
    const action = target.dataset.action; // Получаем действие из атрибута data-action
    const postIDString = getPostIDString(target);
    const postID = getPostID(target);
    if (action === "like") {
        if (postIDString) {
            isLiked(postIDString).then((isLiked) => {
                if (isLiked === null) {
                    const currentLikes = parseInt(target.textContent.split(":")[1].trim());
                    const updatedLikes = currentLikes + 1;
                    target.textContent = `Likes: ${updatedLikes}`;
                    target.dataset.action = "unlike"; // Обновляем действие
                    sendLikeOrDislike(postID, 1)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 1){
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {
                            handleAllCategoriesRequest()
                                .then(function(categories) {
                                    const selectedCategories = categories.map(category => category.name);
                                    const selectedCategoriesFromLocalStorage = getSuccessButtonsTextFromLocalStorage();
                                    if (selectedCategoriesFromLocalStorage.length === 0) {
                                        allPosts(selectedCategories);
                                    } else {
                                        allPosts(selectedCategoriesFromLocalStorage);
                                    }
                                })
                                .catch(function(error) {
                                    console.error('Error fetching categories:', error);
                                });
                        })
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 2){
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislike(postID, 1)
                        .then(() => {
                            handleAllCategoriesRequest()
                                .then(function(categories) {
                                    const selectedCategories = categories.map(category => category.name);
                                    const selectedCategoriesFromLocalStorage = getSuccessButtonsTextFromLocalStorage();
                                    if (selectedCategoriesFromLocalStorage.length === 0) {
                                        allPosts(selectedCategories);
                                    } else {
                                        allPosts(selectedCategoriesFromLocalStorage);
                                    }
                                })
                                .catch(function(error) {
                                    console.error('Error fetching categories:', error);
                                });
                        })
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "dislike") {
        if (postIDString) {
            isLiked(postIDString).then((isLiked) => {
                if (isLiked === null) {
                    const currentDislikes = parseInt(target.textContent.split(":")[1].trim());
                    const updatedDislikes = currentDislikes + 1;
                    target.textContent = `Dislikes: ${updatedDislikes}`;
                    target.dataset.action = "undislike"; // Обновляем действие
                    sendLikeOrDislike(postID, 2)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 1){
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                    sendLikeOrDislike(postID, 2)
                        .then(() => {
                            handleAllCategoriesRequest()
                                .then(function(categories) {
                                    const selectedCategories = categories.map(category => category.name);
                                    const selectedCategoriesFromLocalStorage = getSuccessButtonsTextFromLocalStorage();
                                    if (selectedCategoriesFromLocalStorage.length === 0) {
                                        allPosts(selectedCategories);
                                    } else {
                                        allPosts(selectedCategoriesFromLocalStorage);
                                    }
                                })
                                .catch(function(error) {
                                    console.error('Error fetching categories:', error);
                                });
                        })
                        .catch(error => {console.error('Error:', error);});
                }else if(isLiked.like_type === 2){
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {
                            handleAllCategoriesRequest()
                                .then(function(categories) {
                                    const selectedCategories = categories.map(category => category.name);
                                    const selectedCategoriesFromLocalStorage = getSuccessButtonsTextFromLocalStorage();
                                    if (selectedCategoriesFromLocalStorage.length === 0) {
                                        allPosts(selectedCategories);
                                    } else {
                                        allPosts(selectedCategoriesFromLocalStorage);
                                    }
                                })
                                .catch(function(error) {
                                    console.error('Error fetching categories:', error);
                                });
                        })
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "unlike") {
        if (postIDString) {
            isLiked(postIDString).then((isLiked) => {
                if (isLiked.like_type === 1) {
                    const currentLikes = parseInt(target.textContent.split(":")[1].trim());
                    const updatedLikes = currentLikes - 1;
                    target.textContent = `Likes: ${updatedLikes}`;
                    target.dataset.action = "like"; // Обновляем действие
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    } else if (action === "undislike") {
        if (postIDString) {
            isLiked(postIDString).then((isLiked) => {
                if (isLiked.like_type === 2) {
                    const currentDislikes = parseInt(target.textContent.split(":")[1].trim());
                    const updatedDislikes = currentDislikes - 1;
                    target.textContent = `Dislikes: ${updatedDislikes}`;
                    target.dataset.action = "dislike"; // Обновляем действие
                    sendUnLikeOrUnDislike(postIDString)
                        .then(() => {})
                        .catch(error => {console.error('Error:', error);});
                }
            });
        }
    }
}

function getPostID(button) {
    return parseInt(button.dataset.postid);
}

function getPostIDString(button) {
    return button.dataset.postid;
}

function sendLikeOrDislike(postID, likeType) {
    // Создаем объект с данными для отправки
    const data = {
        post_id: postID,
        like_type: likeType
    };
    console.log(data);

    // Возвращаем результат цепочки обещаний
    return fetch('/like-post', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/like-post', {
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
            return data; // Возвращаем данные для дальнейшей обработки
        })
        .catch(function(error) {
            // Обрабатываем ошибки
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Передаем ошибку для обработки в вызывающем коде
        });
}


function sendUnLikeOrUnDislike(postID) {
    // Возвращаем результат fetch, чтобы его можно было обработать в вызывающем коде
    return fetch(`/unlike-post?post_id=${postID}`, {
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
                throw new Error('Failed to unlike/dislike post');
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


function isLiked(postID) {
    return fetch(`/is-liked?post_id=${postID}`, {
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











