import { doc, getDoc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { db } from "../../../../config/adminFirebase";

const EntryRow = ({ d1, index, removeRow }) => {
  return (
    <div className="flex ">
      <div className="w-20 text-sm border border-gray-200 p-3 flex">
        <span className="ml-auto ">{index + 1}</span>
      </div>
      <div
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Name"
      >
        {d1[0]}
      </div>

      <div
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Name"
      >
        {d1[1]}
      </div>

      <div className=" flex-1 flex flex-row">
        <div
          className="flex-1 text-sm border border-gray-200 p-3 border-r-0"
          placeholder="Name"
        >
          {d1[2]}
        </div>
        <button className="ml-auto bg-black rounded m-1 px-2 mx-3">
          <IoChevronDown size={12} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const Bill = ({ billNo }) => {
  const [numRows, setNumRows] = useState([["", "", ,]]);
  const [allData, setAllData] = useState();
  const addNewRow = () => {
    const arr = numRows;
    console.log(arr);
    arr.push(["", "", ,]);
    setNumRows([...arr]);
  };
  function removeRow(n) {
    alert(n);
    const arr = numRows;
    arr.splice(n, 1);
    setNumRows([...arr]);
  }
  const getAllData = async (billNo) => {
    const doc1 = doc(db, "purchaseBill", billNo);
    const snap = await getDoc(doc1);
    setAllData(snap.data());
    setNumRows(JSON.parse(snap.data()["list"]));
  };
  useEffect(() => {
    getAllData(billNo);
  }, []);
  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20">S.N</div>
        <div className="flex-1 text-center">Item Name</div>
        <div className="flex-1 text-center">Quantity</div>
        <div className="flex-1 text-center">Rate</div>
      </div>
      {numRows.map((d1, index) => (
        <EntryRow
          d1={d1}
          index={index}
          removeRow={(index) => {
            removeRow(index);
          }}
        />
      ))}
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="flex-1">
          <button
            onClick={addNewRow}
            className="underline text-blue-900 text-sm"
          >
            Add New Row
          </button>
        </div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-left text-gray-700">
          Total: {allData.total}
        </div>
      </div>
    </div>
  );
};

export default Bill;
