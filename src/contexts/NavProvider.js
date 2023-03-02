import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { auth, db } from "../config/adminFirebase";

export const NavContext = createContext();

// It's used for store all states of navbar
const NavProvider = ({ children }) => {
  const [sideBarOn, setSideBarOn] = useState(true);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(JSON.parse(localStorage.getItem("colorTheme") || false));
  }, []);

  const themeToggleHandler = () => {
    setIsDark(!isDark);
    localStorage.setItem("colorTheme", JSON.stringify(!isDark));
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const [allUser, setAllUser] = useState([]); 

  const getUsers = async () => {
    const ar = [];
    const querySnapshot = await getDocs(collection(db, "usersList"));
    querySnapshot.forEach((doc) => {
      ar.push(doc.data());
    });
    setAllUser(ar);
  }; 
  const activeUser = allUser.find((u) => u.email === user.email); 
 

  useEffect(() => {
    getUsers();
  }, [user]);

  // code for get the logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  const navInfo = {
    sideBarOn,
    setSideBarOn,
    user,
    isDark,
    themeToggleHandler,
    updateUserProfile,activeUser
  };
  return <NavContext.Provider value={navInfo}>{children}</NavContext.Provider>;
};

export default NavProvider;
