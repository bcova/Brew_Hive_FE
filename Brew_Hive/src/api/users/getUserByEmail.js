const getUserByEmail = async (email) => {

  const token = sessionStorage.getItem('Token');
    const response = await fetch(`http://localhost:5000/user/${email}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      
    });
  
    if (!response.ok) {
      throw new Error("Authentication failed."); // Handle this error in the calling code
    }
  
    const data = await response.json();
    return data;
  };


  
  export default getUserByEmail;