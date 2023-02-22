import React, { useEffect, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getTableList } from "./functions/function";
import { mediumFont } from "../../../../theme";
import Loader from "../../../../components/Loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const RestaurantTab = ({ rerender }) => {
  const [tableData, setTableData] = useState([]);
  const [isChange, setIsChange] = useState(true);

  const getAllData = async () => {
    const arr = await getTableList();
    setTableData(arr);
  };

  useEffect(() => {
    getAllData();
  }, [rerender]);

  return (
    <>
      {!tableData.length && <Loader />}
      <div className="flex flex-row flex-wrap ">
        {tableData.map((item, idx) => (
          <div className="p-4" key={idx}>
            <RestaurantCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export const RestaurantCard = ({ item }) => {
  return (
    <>
      <div className="bg-gray-200 w-24 h-24 rounded-2xl flex flex-col p-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="absolute right-0">
            <IoEllipsisVertical size={12} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
          >
            <li>
              <button className="text-sm px-2 py-1 text-green-600 hover:bg-green-600 hover:text-white">
                <FaEdit />
                Edit
              </button>
            </li>
            <li>
              <button className="text-sm px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white">
                <FaTrashAlt />
                Delete
              </button>
            </li>
          </ul>
        </div>
        <div
          className="text-2xl text-center my-auto"
          style={{ fontSize: mediumFont }}
        >
          {item.tableNumber}
        </div>
      </div>
    </>
  );
};
