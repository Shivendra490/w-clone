const getMessages = async () => {
  try {
    const response = await fetch("url");
    const result = await response.json();
    if (result) {
      return result;
    }
  } catch (err) {
    throw err;
  }
};

export default getMessages;
