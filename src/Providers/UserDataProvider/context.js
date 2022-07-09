import { createContext, useContext } from "react";

const initialValue = {
  userData: [],
};

const userContext = createContext(initialValue);

export const useUserContext = () => useContext(userContext);

export default userContext;
