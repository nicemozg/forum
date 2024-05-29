document.addEventListener('DOMContentLoaded', function() {
    handleAllCategoriesRequest()
        .then(function(categories) {
            const selectedCategories = categories.map(category => category.name);
                const myPostsBtn = document.getElementById('my-posts-btn');
                myPostsBtn.addEventListener('click', function(event) {
                    event.preventDefault();
                    renderMyPosts(selectedCategories);
                });
        })
        .catch(function(error) {
            console.error('Error fetching categories:', error);
        });
});

function getMyPostsRequest() {
    return fetch(`/my-posts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Failed to fetch my posts');
            }
            return response.json();
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
}

