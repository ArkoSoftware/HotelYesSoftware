import React from "react";
import { useContext } from "react";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { NavContext } from "../../contexts/NavProvider";
import { Link } from "react-router-dom";
import { signOutFromAccount } from "../Authentication/functions/function";

const Navbar = () => {
  const { sideBarOn, setSideBarOn, user, isDark, themeToggleHandler } =
    useContext(NavContext);

  return (
    <section
      className={`${
        isDark ? "bg-slate-800" : "bg-gray-100"
      }  z-20 sticky top-0 block duration-300 ${!sideBarOn && "hidden"}`}
    >
      <div className="flex items-center justify-between mx-5 py-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="sidebar-drawer"
            onClick={() => setSideBarOn(!sideBarOn)}
            className={`${
              isDark ? "text-white" : "text-black"
            } block lg:hidden`}
          >
            {sideBarOn ? <FaBars /> : <FaTimes />}
          </label>
          <Link to="/">
            <div
              className={`text-2xl font-bold tracking-tighter ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Nyano
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className={`flex items-center gap-1 cursor-pointer ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              <FaUserCircle className="text-lg" />
              <p className="text-sm">{user?.email.split("@")[0]}</p>
            </label>
            <div
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-md w-52"
            >
              <div className="flex flex-col gap-1 relative">
                <p>User Info</p>
                <p className="text-xs">{user?.email}</p>
                <button
                  onClick={() => signOutFromAccount()}
                  className="bg-red-700 hover:bg-red-800 border-none text-white text-center py-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 flex items-center gap-2">
            <input
              onChange={themeToggleHandler}
              type="checkbox"
              className="toggle toggle-sm"
              id="toggleBtn"
              checked={isDark}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
