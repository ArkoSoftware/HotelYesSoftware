import React from "react";
import sidebar from "../../data/sidebar.json";
import { Link, useLocation } from "react-router-dom";
import { signOutFromAccount } from "../Authentication/functions/function";
import { UserContext } from "../../contexts/context";
import { extreSmallFont } from "../../theme";
import { useContext } from "react";
import { NavContext } from "../../contexts/NavProvider";

const Sidebar = () => {
  const value = React.useContext(UserContext).admin;
  const setValue = React.useContext(UserContext).setAdmin;
  const { isDark, activeUser } = useContext(NavContext);
  const location = useLocation();
  return (
    <div
      className={`w-60 h-screen dark:overflow-auto overflow-auto duration-300 border-t ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-gray-100"
      } fixed z-10`}
    >
      <div className="my-5">
        {value && activeUser?.role === "Admin" ? (
          <>
            {sidebar.tab.map((val, idx) => (
              <Link to={val[1]} key={idx}>
                <div
                  className={` mx-4 rounded px-3 py-3  tracking-tighter ${
                    (location.pathname == val[1] && isDark && "bg-gray-700") ||
                    (location.pathname == val[1] && !isDark && "bg-gray-300")
                  }
                   ${
                     isDark
                       ? "text-white hover:bg-gray-700"
                       : "hover:bg-gray-300 text-gray-700"
                   } `}
                  style={{ fontSize: extreSmallFont }}
                >
                  {val[0]}
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            {sidebar.secondary.map((val, idx) => (
              <Link to={val[1]} key={idx}>
                <div
                  className={`mx-4 rounded px-3 py-3 text-sm  tracking-tighter
                  ${
                    (location.pathname == val[1] && isDark && "bg-gray-700") ||
                    (location.pathname == val[1] && !isDark && "bg-gray-300")
                  } ${
                    isDark
                      ? "text-white hover:bg-gray-700"
                      : "hover:bg-gray-300 text-gray-700"
                  } `}
                  style={{ fontSize: extreSmallFont }}
                >
                  {val[0]}
                </div>
              </Link>
            ))}
          </>
        )}
        <button className="w-full" onClick={() => signOutFromAccount()}>
          <div
            className=" mx-4 rounded px-2 py-2 text-sm hover:bg-red-800 bg-red-700 tracking-tighter text-white mt-5"
            style={{ fontSize: extreSmallFont }}
          >
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
