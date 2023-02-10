import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

const EntryRow = ({ d1, index, removeRow }) => {
  return (
    <div className="flex ">
      <button
        onClick={() => removeRow(index)}
        className="w-20 text-sm border border-gray-200 p-3 flex"
      >
        <IoCloseCircle className="my-auto" color="#2f2f2f" />
        <span className="ml-auto ">{index + 1}</span>
      </button>
      <input
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Name"
      />
      <input
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Type"
      />
      <input
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Quantity"
      />
      <input
        className="flex-1 text-sm border border-gray-200 p-3 text-right"
        placeholder="Rate"
      />
    </div>
  );
};

const PurchaseTable = () => {
  const [numRows, setNumRows] = useState([["", "", ,]]);
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
  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20">S.N</div>
        <div className="flex-1 text-center">Item Name</div>
        <div className="flex-1 text-center">Type</div>
        <div className="flex-1 text-center">Quantity</div>
        <div className="flex-1 text-right">Rate</div>
      </div>
      {numRows.map((d1, index) => (
        <EntryRow
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
        <div className="flex-1 text-left text-gray-700">Total: </div>
      </div>
    </div>
  );
};

export default PurchaseTable;
