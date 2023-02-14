import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth } from "../config/adminFirebase";

export const NavContext = createContext();

// It's used for store all states of navbar
const NavProvider = ({ children }) => {
  const [sideBarOn, setSideBarOn] = useState(true);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);
  console.log(sideBarOn);

  useEffect(()=>{
    setIsDark(JSON.parse(localStorage.getItem('colorTheme') || false))
  },[])

  const themeToggleHandler = ()=>{
    setIsDark(!isDark)
    localStorage.setItem('colorTheme', JSON.stringify(!isDark))
  }

  // code for get the logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [user]);

  const navInfo = { sideBarOn, setSideBarOn, user, isDark, themeToggleHandler };
  return <NavContext.Provider value={navInfo}>{children}</NavContext.Provider>;
};

export default NavProvider;
