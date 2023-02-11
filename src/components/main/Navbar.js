import React from "react";
import { useContext } from "react";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { NavContext } from "../../contexts/NavProvider";

const Navbar = () => {
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  return (
    <section className="bg-gray-100 z-20 sticky top-0">
      <div className="flex items-center justify-between mx-5 py-4">
        <div>
          <button
            onClick={() => setSideBarOn(!sideBarOn)}
            className="text-black"
          >
            {sideBarOn ? <FaBars /> : <FaTimes />}
          </button>
        </div>
        <div className="flex items-center">
          {/* tesing code for user button */}
          <FaUserCircle />
          <select className="bg-transparent">
            <option disabled selected>
              User Name
            </option>
            <option>
              <a href="/google.com">asdf</a>
            </option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
