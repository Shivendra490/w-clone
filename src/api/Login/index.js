import { BASE_URL } from "../../Constants/url";

const loginUser = async ({ phone, password }) => {
  try {
    const body = JSON.stringify({ phone, password });

    const res = await fetch(BASE_URL, {
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
  try {
    const username=userName;
    const body = JSON.stringify({ phone, password, username });

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });
    const data = await res.json();
    if (data && data.status === "success") {
      return data.user;
    }
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, registerUser };
