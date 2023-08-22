const getUserPosts = async (id) => {
    const token = sessionStorage.getItem('Token');

    try {
      const response = await fetch(`http://localhost:5000/post/allPosts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Authentication failed."); // This will be caught below
      }
  
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error.message);
      throw error; 
    }
  };

    export default getUserPosts