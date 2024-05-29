function deletePost(postId) {
    // Опции запроса
    const postIdInt = parseInt(postId, 10);
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Выполнение запроса
    fetch(`/delete-post?post_id=${postIdInt}`, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            return response.status;
        })
        .then(data => {
            console.log('Post deleted successfully:', data);
            hideModalOpenPosts();
            location.reload();
            // Возможно, вам захочется выполнить какие-то действия после успешного удаления поста
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
}
