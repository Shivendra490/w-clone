import { BASE_URL } from "../../Constants/url";

export const findUser = async (phone) => {
  try {
    const body = JSON.stringify({ phone });

    const res = await fetch(`${BASE_URL}/searchUser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("internal server error");
  }
};

export const getlastMessages = async (userId) => {
  try {
    const body = JSON.stringify({ userId });
    const res = await fetch(`${BASE_URL}/getLastConversations`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    const response = await res.json();
    return response;
  } catch (err) {
    throw err;
  }
};

export const getRoomById = async (senderId, receiverId) => {
  try {
    const body = JSON.stringify({
      senderId,
      receiverId,
    });
    const res = await fetch(`${BASE_URL}/getRoomById`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    const response = await res.json();
    return response;
  } catch (err) {
    throw err;
  }
};

export const sendMessageToUser = async (msgObj) => {
  try {
    const body = JSON.stringify(msgObj);
    const res = await fetch(`${BASE_URL}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    const response = await res.json();
    return response;
  } catch (err) {
    throw err;
  }
};
