import React, { useState, useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  addOrderData,
  getCategoryItem,
  getMenuItem,
} from "./functions/function";
import { db } from "../../../../config/adminFirebase";
import { collection, getDocs } from "firebase/firestore/lite";
const EntryRow = ({
  data,
  index,
  removeRow,
  numRows,
  setNumRows,
  setValue,
  setTotal,
  foodList,
}) => {
  const [name, setName] = useState(data[0]);
  const [quantity, setQuantity] = useState(data[1] || 1);
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
    <div className="flex w-screen md:w-full">
      <button
        onClick={() => removeRow(index)}
        className="w-20 text-sm border border-gray-200 p-3 flex"
      >
        <IoCloseCircle className="my-auto" color="#2F2F2F" />
        <span className="ml-auto " style={{ fontSize: 10 }}>
          {index + 1}
        </span>
      </button>
      <input
        list="foodNames"
        name="foodName"
        className="text-sm pl-2 w-full md:w-[34%]"
        onChange={(e) => {
          setName(e.target.value);
          addValue(e.target.value, 0);
        }}
      />
      <datalist id="foodNames">
        {foodList.map((d1) => (
          <option value={d1.foodName}>{d1.foodName}</option>
        ))}
      </datalist>
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
        className="flex-1 text-sm border border-gray-200 p-3 text-right w-48"
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
  billNo,
  rerender,
  setRerender,
  toggleModal,
}) => {
  const [numRows, setNumRows] = useState([["", 1, ""]]);
  const [foodList, setFoodList] = useState([]);
  const getAllData = async () => {
    const arr = [];
    const doc1 = collection(db, "menu");
    const snap = await getDocs(doc1);
    snap.forEach((docs) => {
      arr.push(docs.data());
    });
    setFoodList(arr);
  };
  useEffect(() => {
    getAllData();
  }, []);
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
      <div className="flex w-screen md:w-full bg-gray-200 border border-gray-300 p-3">
        <div className="w-20" style={{ fontSize: 10 }}>
          S.N
        </div>
        <div className="text-center w-full" style={{ fontSize: 10 }}>
          Food Name
        </div>
        <div className="text-center w-full" style={{ fontSize: 10 }}>
          Quantity
        </div>
        <div className="text-right w-full" style={{ fontSize: 10 }}>
          Amount
        </div>
      </div>
      {numRows.map((d1, index) => {
        return (
          <EntryRow
            foodList={foodList}
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
      <div className="flex w-screen md:w-full bg-gray-200 border border-gray-300 p-3">
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
