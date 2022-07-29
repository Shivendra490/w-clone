import React, { useEffect, useMemo, useState } from "react";
import UserContext from "./context";

const UserDataProvider = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {});
  
  const values = useMemo(
    () => ({
      userData,
    }),
    [userData]
  );
  return <UserContext.Provider value={values}></UserContext.Provider>;
};

export default UserDataProvider;
