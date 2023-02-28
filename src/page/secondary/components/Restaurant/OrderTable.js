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
  console.log(name);
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
    <tr>
      <td className="border py-2 text-center">
        <button onClick={() => removeRow(index)} className="text-sm ">
          <IoCloseCircle className="inline mr-2" color="#2f2f2f" />
          <span className="" style={{ fontSize: 10 }}>
            {index + 1}
          </span>
        </button>
      </td>
      <td className="border p-0 text-center">
        <input
          list="foodNames"
          name="foodName"
          className="w-full h-full p-2 text-xs text-center"
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
      </td>
      <td className="border p-0 text-center">
        <input
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);

            addValue(e.target.value, 1);
          }}
          className="flex-1 text-sm p-2 w-full text-center"
          placeholder="Quantity"
          style={{ fontSize: 10 }}
        />
      </td>
      <td className="border text-xs py-2 text-center">
        {numRows[index][2] || "0.00"}
      </td>
    </tr>
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
    <>
      <div className="overflow-x-auto ">
        <table className="w-screen md:w-full">
          <thead>
            <tr>
              <th className="text-xs font-normal bg-[#e5e7eb] py-2 border">
                S.N
              </th>
              <th className="text-xs font-normal bg-[#e5e7eb] py-2 border">
                Food Name
              </th>
              <th className="text-xs font-normal bg-[#e5e7eb] py-2 border">
                Quantity
              </th>
              <th className="text-xs font-normal bg-[#e5e7eb] py-2 border">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
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
            <tr className="w-screen md:w-full bg-gray-200 border border-gray-300">
              <td className="text-center py-2 w-24">
                <button
                  onClick={addNewRow}
                  className="underline text-blue-900 text-sm"
                  style={{ fontSize: 10 }}
                >
                  Add New Row
                </button>
              </td>
              <td></td>
              <td></td>
              <td className="w-24 text-xs text-center py-2">
                Total: <span className="ml-5">{total}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div> 
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
    </>
  );
};

export default OrderTable;
