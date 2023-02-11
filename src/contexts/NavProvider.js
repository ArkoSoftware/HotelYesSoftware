import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config/adminFirebase";

export const NavContext = createContext();

// It's used for store all states of navbars
const NavProvider = ({ children }) => {
  const [sideBarOn, setSideBarOn] = useState(true);
  const [user, setUser] = useState(null);

  // code for get the logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  const navInfo = { sideBarOn, setSideBarOn,user };
  return <NavContext.Provider value={navInfo}>{children}</NavContext.Provider>;
};

export default NavProvider;
