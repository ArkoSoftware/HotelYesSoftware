import React, { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { getCategoryItem } from "./functions/function";

const EntryRow = ({
  data,
  index,
  removeRow,
  numRows,
  setNumRows,
  setValue,
  setTotal,
}) => {
  const [name, setName] = useState(data[0]);
  const [quantity, setQuantity] = useState(data[1]);
  const [rate, setRate] = useState(data[2]);
  const [categoryList, setCategoryList] = React.useState([]);
  const getAllData = async () => {
    const arr = [];
    const temp = await getCategoryItem();
    for (var i = 0; i < temp.length; i++) {
      arr.push(temp[i].itemName);
    }
    setCategoryList(arr);
  };
  useEffect(() => {
    getAllData();
  }, []);
  const getTotal = (temp) => {
    let sum = 0;
    for (let i = 0; i < temp.length; i++) {
      sum = sum + parseInt(temp[i][1]) * parseInt(temp[i][2]);
    }
    setTotal(sum);
  };
  const addValue = function (val, field) {
    const temp = numRows;

    temp[index][field] = val;

    setNumRows(temp);
    setValue(temp);
    getTotal(temp);
  };
  return (
    <div className="flex ">
      <button
        onClick={() => removeRow(index)}
        className="w-20 text-sm border border-gray-200 p-3 flex"
      >
        <IoCloseCircle className="my-auto" color="#2f2f2f" />
        <span className="ml-auto ">{index + 1}</span>
      </button>
      <select
        onChange={(e) => {
          setName(e.target.value);

          addValue(e.target.value, 0);
        }}
        className="p-2 flex-1 border border-gray-200 w-full text-sm"
      >
        <option className="capitalize"></option>
        {categoryList.map((d1) => (
          <option className="capitalize" value={d1}>
            {d1}
          </option>
        ))}
      </select>

      <input
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);

          addValue(e.target.value, 1);
        }}
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Quantity"
      />
      <input
        value={rate}
        onChange={(e) => {
          setRate(e.target.value);

          addValue(e.target.value, 2);
        }}
        className="flex-1 text-sm border border-gray-200 p-3"
        placeholder="Rate"
      />
    </div>
  );
};

const PurchaseTable = ({ setValue, total, setTotal }) => {
  const [numRows, setNumRows] = useState([["", "", ""]]);

  const addNewRow = () => {
    const arr = numRows;
    arr.push(["", "", ""]);
    setNumRows([...arr]);
  };
  function removeRow(n) {
    const arr = numRows;
    arr.splice(n, 1);
    setNumRows([...arr]);
  }
  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20">S.N</div>
        <div className="flex-1 text-center">Item Name</div>
        <div className="flex-1 text-center">Quantity</div>
        <div className="flex-1 text-right">Rate</div>
      </div>
      {numRows.map((d1, index) => {
        return (
          <EntryRow
            data={d1}
            setValue={setValue}
            setNumRows={setNumRows}
            numRows={numRows}
            setTotal={setTotal}
            index={index}
            removeRow={(index) => {
              removeRow(index);
            }}
          />
        );
      })}
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
        <div className="flex-1 text-left text-gray-700">Total: {total}</div>
      </div>
    </div>
  );
};

export default PurchaseTable;
