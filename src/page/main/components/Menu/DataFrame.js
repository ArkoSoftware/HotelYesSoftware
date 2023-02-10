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
          <div className="flex-1 border border-gray-100 flex">
            <div className=" p-3" style={{ fontSize: extreSmallFont }}>
              {t.price}
            </div>
            <button className="ml-auto bg-black rounded m-1 px-2">
              <IoChevronDown size={12} color="#fff" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataFrame;
