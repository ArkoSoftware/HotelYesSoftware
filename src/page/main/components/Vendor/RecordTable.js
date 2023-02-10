import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";

const EntryRow = ({ d1, index, profile }) => {
  return (
    <div className="flex ">
      <div className="w-20 text-sm border border-gray-200 p-3 flex">
        <span className="ml-auto ">{index + 1}</span>
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 text-center underline">
        <Link
          to={{
            pathname: "/vendor/info/bill",
          }}
          state={[d1[0], profile]}
        >
          {d1[1].billNumber}
        </Link>
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 text-center">
        {new Date(d1[1].billDate).toDateString()}
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 flex flex-row">
        <span className="flex-1 text-center">Rs. {d1[1].total}</span>
        <button className=" bg-black rounded px-2 p-2 ml-auto">
          <IoChevronDown size={12} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const RecordTable = ({ history, profile }) => {
  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20">S.N</div>
        <div className="flex-1 text-center">Bill No.</div>
        <div className="flex-1 text-center">Date</div>
        <div className="flex-1 text-center">Amount</div>
      </div>
      {history.map((d1, index) => (
        <EntryRow d1={d1} index={index} profile={profile} />
      ))}
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="flex-1"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-left text-gray-700">Total: </div>
      </div>
    </div>
  );
};

export default RecordTable;
