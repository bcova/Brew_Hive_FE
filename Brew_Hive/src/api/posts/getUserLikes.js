const getUserLikes = async (user_id) => {
    try {
        const response = await fetch(`http://localhost:5000/post/${user_id}/likes`, {
            method: "GET",
            headers: {
                "User_id": user_id,
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

export default getUserLikes