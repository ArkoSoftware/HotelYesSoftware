import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { extreSmallFont } from "../../../../theme";

const DataFrame = ({ data, title }) => {
  return (
    <div className="w-full border border-gray-300 flex flex-col">
      <div className="w-full bg-gray-300 p-2" style={{ display: "flex" }}>
        <div className="w-24" style={{ fontSize: extreSmallFont }}>
          S.N.
        </div>
        {title.map((t) => (
          <div
            className="flex-1 text-center"
            style={{ fontSize: extreSmallFont }}
          >
            {t}
          </div>
        ))}
      </div>
      {data.map((t, index) => (
        <div className="w-full" style={{ display: "flex", fontSize: 12 }}>
          <div
            className="w-24 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {index + 1}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {t.foodName}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {t.category}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            Open Recipe
          </div>
          <div className="flex-1 border border-gray-100 flex items-center justify-between">
            <div className=" p-3" style={{ fontSize: extreSmallFont }}>
              {t.price}
            </div>

            <div className="dropdown dropdown-left">
              <button
                tabIndex={0}
                className="ml-auto bg-black rounded m-1 p-2"
              >
                <IoChevronDown size={12} color="#fff" />
              </button> 
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20"
              >
                <li>
                  <button className="py-2 bg-red-700 hover:bg-red-800 text-white text-center">Delete</button>
                </li> 
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataFrame;
