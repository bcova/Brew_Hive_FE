
const loginUser = async (email, password) => {
  const url = "http://localhost:5000/user/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Authentication failed.");
  }

  const data = await response.json();
  return data;
};

export default loginUser;
