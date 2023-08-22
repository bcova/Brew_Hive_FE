const addComment = async (postId, user_id,commentContent) => {
    console.log({postId}, {user_id},{commentContent})
    try {
      const response = await fetch(`http://localhost:5000/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "User_id": user_id,
        },
        body: JSON.stringify({ commentContent }),
      });
  
      if (response.ok) {
        // Handle successful response
        console.log('Comment posted successfully');
        // Refresh the comments or update the UI
      } else {
        // Handle error response
        console.error('Error posting comment');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  export default addComment ;

  
  
  
  
  
  