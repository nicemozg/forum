function handleAllCategoriesRequest() {
    return fetch('/categories', {
        method: 'OPTIONS',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (response.status === 200) {
                return fetch('/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
            } else {
                throw new Error('OPTIONS request failed');
            }
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error; // Пробрасываем ошибку дальше для обработки
        });
}

