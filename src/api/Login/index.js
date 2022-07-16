const loginUser = async ({ phone, password }) => {
  console.log(phone, password);
  try {
    const body = JSON.stringify({ phone, password });

    const res = await fetch("https://w-clone-backend.herokuapp.com/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });
    const data = await res.json();

    return data;
    
  } catch (error) {
    throw new Error("internal server error")
    
  }
};

const registerUser = async ({ userName, phone, password }) => {
  console.log(userName, phone, password, "registered");
  try {
    const username=userName;
    const body = JSON.stringify({ phone, password, username });

    const res = await fetch("https://w-clone-backend.herokuapp.com/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });
    const data = await res.json();
    console.log(res, data);
    if (data && data.status === "success") {
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, registerUser };
