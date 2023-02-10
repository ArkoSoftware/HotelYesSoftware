import React from "react";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";

const DataFrame = ({ data, title, dataId }) => {
  return (
    <div className="w-full border border-gray-300 flex flex-col">
      <div className="w-full bg-gray-300 p-2" style={{ display: "flex" }}>
        <div className="w-24">S.N.</div>
        {title.map((t) => (
          <div className="flex-1 text-center">{t}</div>
        ))}
      </div>
      {data.map((t, index) => (
        <div className="w-full" style={{ display: "flex", fontSize: 12 }}>
          <div className="w-24 border border-gray-100 p-3">{index + 1}</div>

          <div className="flex-1 border border-gray-100 p-3">
            <Link
              to={{
                pathname: "/vendor/info",
              }}
              state={t}
            >
              {t[1].vendorName}
            </Link>
          </div>
          <div className="flex-1 border border-gray-100 p-3">
            {t[1].vendorCompany}
          </div>
          <div className="flex-1 border border-gray-100 flex">
            <div className=" p-3">{t[1].vendorAddress}</div>
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
