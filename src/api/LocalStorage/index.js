const WAPPUSERID = "WAPPUSERID";

const getUserFromLocalStorage = () => {
  const userDetails = localStorage.getItem(WAPPUSERID);
  if (userDetails) {
    return JSON.parse(userDetails);
  }
  return "";
};

const setUserInLocalStorage = (userDetails) => {
  localStorage.setItem(WAPPUSERID, JSON.stringify(userDetails));
};

const deleteUserInLocalStorage = () => {
  localStorage.removeItem(WAPPUSERID);
};

export { getUserFromLocalStorage, setUserInLocalStorage, deleteUserInLocalStorage };
