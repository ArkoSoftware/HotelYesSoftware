import React, { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  addOrderData,
  getCategoryItem,
  getMenuItem,
} from "./functions/function";

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
  const [quantity, setQuantity] = useState(data[1] || 1);
  const [foodList, setFoodList] = React.useState([]);
  const getAllData = async () => {
    const arr = [];
    const temp = await getMenuItem();
    for (var i = 0; i < temp.length; i++) {
      arr.push(temp[i]);
    }
    setFoodList(arr);
  };
  useEffect(() => {
    getAllData();
  }, []);
  const getTotal = (temp) => {
    let sum = 0;
    for (let i = 0; i < temp.length; i++) {
      sum = sum + parseInt(temp[i][2]);
    }
    setTotal(sum);
  };
  const addValue = function (val, field) {
    var value;

    const temp = numRows;

    temp[index][field] = val;
    setNumRows(temp);
    setValue(temp);
    for (let x = 0; x < foodList.length; x++) {
      if (foodList[x].foodName == numRows[index][0]) {
        value = foodList[x].price;
        break;
      }
    }
    temp[index][2] = value * temp[index][1];
    setNumRows(temp);
    getTotal(temp);
  };
  return (
    <div className="flex ">
      <button
        onClick={() => removeRow(index)}
        className="w-20 text-sm border border-gray-200 p-3 flex"
      >
        <IoCloseCircle className="my-auto" color="#2f2f2f" />
        <span className="ml-auto " style={{ fontSize: 10 }}>
          {index + 1}
        </span>
      </button>
      <select
        onChange={(e) => {
          setName(e.target.value);

          addValue(e.target.value, 0);
        }}
        className="p-2 flex-1 border border-gray-200 w-full text-sm"
        style={{ fontSize: 10 }}
      >
        <option className="capitalize"></option>
        {foodList.map((d1) => (
          <option className="capitalize" value={d1.foodName}>
            {d1.foodName}
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
        style={{ fontSize: 10 }}
      />
      <div
        className="flex-1 text-sm border border-gray-200 p-3 text-right"
        style={{ fontSize: 10 }}
      >
        {numRows[index][2]}
      </div>
    </div>
  );
};

const OrderTable = ({
  setValue,
  total,
  setTotal,
  state,
  guests,
  billNo,
  rerender,
  setRerender,
  toggleModal,
}) => {
  const [numRows, setNumRows] = useState([["", 1, ""]]);

  const addNewRow = () => {
    const arr = numRows;
    arr.push(["", 1, ""]);
    setNumRows([...arr]);
  };
  const getTotal = (temp, setTotal) => {
    let sum = 0;
    for (let i = 0; i < temp.length; i++) {
      sum = sum + parseInt(temp[i][2]);
    }
    setTotal(sum);
  };
  function removeRow(n) {
    const arr = numRows;
    arr.splice(n, 1);
    setNumRows([...arr]);
    getTotal(numRows, setTotal);
  }

  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20" style={{ fontSize: 10 }}>
          S.N
        </div>
        <div className="flex-1 text-center" style={{ fontSize: 10 }}>
          Food Name
        </div>
        <div className="flex-1 text-center" style={{ fontSize: 10 }}>
          Quantity
        </div>
        <div className="flex-1 text-right" style={{ fontSize: 10 }}>
          Amount
        </div>
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
            style={{ fontSize: 10 }}
          >
            Add New Row
          </button>
        </div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div
          className="flex-1 text-left text-gray-700"
          style={{ fontSize: 10 }}
        >
          Total: {total}
        </div>
      </div>
      <button
        onClick={() => {
          addOrderData({
            menuData: JSON.stringify(numRows),
            tableNumber: state.tableNumber,
            total: total,
            guests: guests,
            billNo: billNo,
            date: new Date(),
          });
          toggleModal();
          setRerender(!rerender);
        }}
        className="rounded-xl bg-green-700 text-white w-full p-3 mt-5 "
        style={{ fontSize: 10 }}
      >
        Create Order
      </button>
    </div>
  );
};

export default OrderTable;
