function handleAddPostSubmit(event) {
    event.preventDefault();

    var headerPost = document.getElementById("post-header").value;
    var descriptionPost = document.getElementById("post-description").value;
    var categories = getSuccessButtonsText(); // Эта функция должна возвращать массив строк категорий
    var photoFile = document.getElementById("post-photo-file-input").files[0]; // Получаем файл фотографии

    // Проверяем, был ли выбран файл
    if (!photoFile) {
        modal("Please select a photo file.", "red", 0, 3000);
        return;
    }

    // Проверяем формат файла
    var allowedFormats = ['image/jpeg', 'image/svg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedFormats.includes(photoFile.type)) {
        modal("Invalid file format. Allowed formats: JPEG, SVG, PNG, GIF", "red", 0, 3000);
        return;
    }

    // Проверяем размер файла
    if (photoFile.size > 20 * 1024 * 1024) {
        modal("The file size exceeds the limit (20MB)", "red", 0, 3000);
        return;
    }

    if (!headerPost || !descriptionPost) {
        modal("The input field cannot be empty", "red", 0, 3000);
        return;
    } else if (categories.length === 0) {
        modal("Please select one or more categories", "red", 0, 3000);
        return;
    }

    var maxWidth = 800;
    var maxHeight = 800;
    var quality = 1; // Качество сжатия (от 0 до 1)

    compressImage(photoFile, maxWidth, maxHeight, quality)
        .then(compressedImageData => {
            var formData = new FormData();
            formData.append('title', headerPost);
            formData.append('content', descriptionPost);
            formData.append('categories', JSON.stringify(categories)); // Преобразуем массив в JSON строку
            formData.append('photo', compressedImageData); // Добавляем строку Base64

            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            fetch('/create-post', {
                method: 'POST',
                body: formData
            })
                .then(function(response) {
                    if (!response.ok) {
                        modal("An error occurred on the server", "red", 0, 3000);
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(function(data) {
                    hideLoginForm();
                    hideLoginButton();
                    hideAddPostForm();
                    openRenderPostsList();
                    selectAllCategoriesClassButtonLight();
                    modal("Post created successfully", "green", 0, 3000);
                    window.location.reload();
                })
                .catch(function(error) {
                    console.error('There was a problem with the fetch operation:', error);
                });
        })
        .catch(error => {
            console.error("Ошибка при сжатии изображения:", error);
        });
}

function compressImage(photoFile, maxWidth, maxHeight, quality) {
    return new Promise((resolve, _) => {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var width = img.width;
                var height = img.height;

                // Рассчитываем новые размеры изображения, сохраняя пропорции
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                // Устанавливаем размеры canvas
                canvas.width = width;
                canvas.height = height;

                // Отрисовываем изображение на canvas с новыми размерами
                ctx.drawImage(img, 0, 0, width, height);

                // Получаем данные изображения в формате base64
                var compressedImageData = canvas.toDataURL('image/jpeg', quality);

                // Разрешаем Promise с сжатым изображением
                resolve(compressedImageData);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(photoFile);
    });
}
