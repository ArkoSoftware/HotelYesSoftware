import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { getCategoryItem } from "../../components/Stock/functions/function";
import { useEffect } from "react";
import { extreSmallFont } from "../../../../theme";
const EntryRow = ({
  data,
  setValue,
  numRows,
  setNumRows,
  index,
  removeRow,
}) => {
  const [name, setName] = useState(data[0]);
  const [quantity, setQuantity] = useState(data[1]);
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
  const addValue = function (val, field) {
    const temp = numRows;
    temp[index][field] = val;
    setNumRows(temp);
    setValue(temp);
  };
  return (
    <div className="flex ">
      <button
        onClick={() => removeRow(index)}
        className="w-20 text-sm border border-gray-200 p-3 flex"
      >
        <IoCloseCircle className="my-auto" color="#2f2f2f" />
        <span className="ml-auto " style={{ fontSize: extreSmallFont }}>
          {index + 1}
        </span>
      </button>
      <select
        onChange={(e) => {
          setName(e.target.value);

          addValue(e.target.value, 0);
        }}
        className="p-2 flex-1 border border-gray-200 w-full text-sm"
        style={{ fontSize: extreSmallFont }}
      >
        <option className="capitalize"></option>
        {categoryList.map((d1) => (
          <option
            className="capitalize"
            value={d1}
            style={{ fontSize: extreSmallFont }}
          >
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
        style={{ fontSize: extreSmallFont }}
        placeholder="Quantity"
      />
    </div>
  );
};

const PurchaseTable = ({ setValue }) => {
  const [numRows, setNumRows] = useState([["", ""]]);
  const addNewRow = () => {
    const arr = numRows;
    console.log(arr);
    arr.push(["", ""]);
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
        <div className="w-20" style={{ fontSize: extreSmallFont }}>
          S.N
        </div>
        <div
          className="flex-1 text-center"
          style={{ fontSize: extreSmallFont }}
        >
          Ingredient Name
        </div>
        <div
          className="flex-1 text-center"
          style={{ fontSize: extreSmallFont }}
        >
          Quantity
        </div>
      </div>
      {numRows.map((d1, index) => (
        <EntryRow
          data={d1}
          setValue={setValue}
          numRows={numRows}
          setNumRows={setNumRows}
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
            style={{ fontSize: extreSmallFont }}
          >
            Add New Row
          </button>
        </div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-left text-gray-700"> </div>
      </div>
    </div>
  );
};

export default PurchaseTable;
