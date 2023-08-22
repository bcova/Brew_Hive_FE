const editPost = async (postId,editedPostBody) => {
    try {
        const response = await fetch(`http://localhost:5000/post/edit-post/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ editedPostBody  }), // Send edited content to the server
        });
    
        if (response.ok) {
          // Handle successful response
          console.log('Post content updated successfully');
          // Close the edit modal
        } else {
          // Handle error response
          console.error('Error updating post content');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
}

export default editPost