import React, { useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/adminFirebase";
import AuthRouter from "./router/AuthRouter";
import MainRouter from "./router/MainRouter";
import { UserContext } from "./contexts/context";
import "./App.css";

const App = () => {
  const [userState, setUserState] = useState(0);
  const [authority, setAuthority] = useState(true);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (auth.currentUser.emailVerified) {
        setUserState(2);
      } else {
        setUserState(1);
      }
    } else {
      setUserState(1);
    }
  });
  if (userState == 0) {
    return <></>;
  } else if (userState == 1) {
    return <AuthRouter />;
  } else {
    return (
      <UserContext.Provider
        value={{
          setAdmin: setAuthority,
          admin: authority,
          smallFont: 10,
          mediumFont: 14,
          largeFont: 18,
        }}
      >
        <MainRouter />
      </UserContext.Provider>
    );
  }
};

export default App;
