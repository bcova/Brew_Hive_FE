const fetchCommentsForPost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${postId}/comments`);
      const comments = await response.json();
      return comments;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

export default fetchCommentsForPost