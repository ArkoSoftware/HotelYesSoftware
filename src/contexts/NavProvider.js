import React, { useState } from "react";
import { createContext } from "react";

export const NavContext = createContext();

// It's used for store all states of navbars
const NavProvider = ({ children }) => {
  const [sideBarOn, setSideBarOn] = useState(true);

  const navInfo = { sideBarOn, setSideBarOn };
  return <NavContext.Provider value={navInfo}>{children}</NavContext.Provider>;
};

export default NavProvider;
