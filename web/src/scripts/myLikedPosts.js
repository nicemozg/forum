document.addEventListener('DOMContentLoaded', function() {
    handleAllCategoriesRequest()
        .then(function(categories) {
            const selectedCategories = categories.map(category => category.name);
            const myPostsBtn = document.getElementById('liked-posts-btn');
            myPostsBtn.addEventListener('click', function(event) {
                event.preventDefault();
                renderMyLikedPosts(selectedCategories);
            });
        })
        .catch(function(error) {
            console.error('Error fetching categories:', error);
        });
});

function getMyLikedPostsRequest() {
    return fetch(`/posts-by-like`, {
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

