const editComment = async (commentId,editedCommentBody) => {
    try {
        const response = await fetch(`http://localhost:5000/post/edit-comment/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ editedCommentBody }),
        });
        console.log("API response:", response);
    
        if (response.ok) {
            // Handle successful response
            // console.log('Comment posted successfully');
            // Refresh the comments or update the UI
        } else {
            // Handle error response
            // console.error('Error posting comment');
        }
    } catch (error) {
        console.error('An error occurred:', error);
} 
}
export default editComment