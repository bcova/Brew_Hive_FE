

const addPost = async (user_id, postBody) => {
  try {
    const response = await fetch("http://localhost:5000/post/newPost", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user_id, postBody }),
    });
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      const data = await response.json();
      return data.error;
    }
  } catch (error) {
    console.error(error);
  }
};

export default addPost;