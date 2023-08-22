const deletePost = async (postId) => {
    const token = sessionStorage.getItem('Token');
    const userInfo = sessionStorage.getItem("User_Info");
    const storedObject = JSON.parse(userInfo);
    const user_id = storedObject.id;
    try {
        const response = await fetch(`http://localhost:5000/post/${postId}`, {
            method: "DELETE",
            headers: {
                "User_id": user_id,
                "Authorization": `Bearer ${token}`
            }
        })
    
        if (!response.ok) {
            throw new Error("Authentication failed."); // This will be caught below
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
        throw error;
}
}

export default deletePost