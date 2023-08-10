const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Authentication failed.");
  }
  const data = await response.json();
  return data;
};

export default loginUser;
