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
    <tr>
      <th className="font-normal py-3 border">
        <button onClick={() => removeRow(index)} className="w-20 text-sm flex">
          <IoCloseCircle className="my-auto" color="#2f2f2f" />
          <span className="ml-auto ">{index + 1}</span>
        </button>
      </th>
      <td className=" py-3 border">
        <select
          onChange={(e) => {
            setName(e.target.value);

            addValue(e.target.value, 0);
          }}
          className="flex-1 w-full text-sm outline-none text-center"
        >
          <option className="capitalize"></option>
          {categoryList.map((d1) => (
            <option className="capitalize" value={d1}>
              {d1}
            </option>
          ))}
        </select>
      </td>
      <td className="p-0 border">
        <input
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);

            addValue(e.target.value, 1);
          }}
          className="flex-1 text-sm w-full py-3 text-center"
          placeholder="Quantity"
        />
      </td>
      <td className=" p-0 border">
        <input
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);

            addValue(e.target.value, 2);
          }}
          className="flex-1 text-sm py-3 w-full text-center"
          placeholder="Rate"
        />
      </td>
    </tr>
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
    <>
      <div className="overflow-x-auto">
        <table className="table-normal w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-36 font-normal text-sm py-3">S.N</th>
              <th className="font-normal text-center text-sm py-3">
                Item Name
              </th>
              <th className="font-normal text-center text-sm py-3">Quantity</th>
              <th className="font-normal text-center text-sm py-3">Rate</th>
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
            <tr className="bg-gray-200">
              <th>
                <button
                  onClick={addNewRow}
                  className="underline text-blue-800 text-sm font-normal"
                >
                  Add New Row
                </button>
              </th>
              <td></td>
              <td></td>
              <td className="text-center text-sm">Total: {total}</td>
            </tr>
          </tbody>
        </table>
      </div> 
    </>
  );
};

export default PurchaseTable;
