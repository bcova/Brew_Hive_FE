import React from 'react'

const registerUser = async (user) => {

    try {
        const response = await fetch("http://localhost:5000/user/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await response.json();
        console.log({response})
        if (response.ok) {
            return true
        } else {
            return data.error
          
        }
      } catch (error) {
        console.error(error);
      }
}

export default registerUser