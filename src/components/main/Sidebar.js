import React from "react";
import sidebar from "../../data/sidebar.json";
import { Link } from "react-router-dom";
import { signOutFromAccount } from "../Authentication/functions/function";
import { UserContext } from "../../contexts/context";
import { extreSmallFont } from "../../theme";
import { useContext } from "react";
import { NavContext } from "../../contexts/NavProvider";

const Sidebar = () => {
  const value = React.useContext(UserContext).admin;
  const setValue = React.useContext(UserContext).setAdmin;
  const { isDark, activeUser } = useContext(NavContext);  
  return (
    <div
      className={`w-60 h-screen dark:overflow-auto overflow-auto duration-300 border-t ${
        isDark ? "bg-slate-800 border-slate-700" : "bg-gray-100"
      } fixed z-10`}
    >
      <div className="my-5">
        <div className="flex gap-2 px-4">
          {activeUser?.role === "Admin" ? (
            <button
              className="p-3 bg-green-600 text-white mx-auto rounded my-2 w-[50%]"
              onClick={() => setValue(true)}
              style={{ fontSize: 8 }}
            >
              Admin Access
            </button>
          ) : (
            <button
              className="p-3 bg-green-600 text-white  mx-auto rounded my-2 w-[50%]"
              onClick={() => setValue(false)}
              style={{ fontSize: 8 }}
            >
              Front Access
            </button>
          )}
        </div>
        {value && activeUser?.role==="Admin" ? (
          <>
            {sidebar.tab.map((val, idx) => (
              <Link to={val[1]} key={idx}>
                <div
                  className={` mx-4 rounded px-3 py-3  tracking-tighter ${
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
                  className={`mx-4 rounded px-3 py-3 text-sm  tracking-tighter ${
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
