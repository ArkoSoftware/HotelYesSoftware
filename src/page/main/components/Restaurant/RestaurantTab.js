import React, { useEffect, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getTableList } from "./functions/function";
import { mediumFont } from "../../../../theme";
import Loader from "../../../../components/Loader/Loader";
import { FaEdit, FaTrashAlt, FaSave, FaTimesCircle } from "react-icons/fa";
import { deleteDoc, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../config/adminFirebase";
import toast from "react-hot-toast";

export const RestaurantTab = ({ rerender }) => {
  const [tableData, setTableData] = useState([]);
  const [isChange, setIsChange] = useState(true);

  const getAllData = async () => {
    const arr = await getTableList();
    setTableData(arr);
  };

  useEffect(() => {
    getAllData();
  }, [rerender, isChange]);

  return (
    <>
      {!tableData.length && <Loader />}
      <div className="flex flex-row flex-wrap ">
        {tableData.map((item, idx) => (
          <div className="p-4" key={idx}>
            <RestaurantCard
              item={item}
              isChange={isChange}
              setIsChange={setIsChange}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export const RestaurantCard = ({ item, isChange, setIsChange }) => {
  const [dropdown, setDropDown] = useState(true);
  const [toggleEditBtn, setToggleEditBtn] = useState(true);
  const [itemData, setItemData] = useState("");

  const deleteTable = async (id) => {
    await deleteDoc(doc(db, "tableList", id))
      .then(() => {
        setDropDown(!dropdown);
        toast.success("Table deleted successfully.");
        setIsChange(!isChange);
      })
      .catch((err) => {
        setDropDown(!dropdown);
        toast.success("Table deleting failed!");
      });
  };

  const editTable = async (id) => {
    if (/^-?\d+\.?\d*$/.test(itemData)) {
      const tableRef = doc(db, "tableList", id);

      await updateDoc(tableRef, {
        tableNumber: itemData,
      })
        .then(() => {
          setDropDown(!dropdown);
          toast.success("Table updated successfully.");
          setIsChange(!isChange);
          setToggleEditBtn(!toggleEditBtn);
        })
        .catch((err) => {
          setToggleEditBtn(!toggleEditBtn);
          setDropDown(!dropdown);
          toast.error("Table updating failed!");
        });
    } else {
      setToggleEditBtn(!toggleEditBtn);
      toast.error("Table updating failed! Please add valid number");
    }
  };

  return (
    <>
      <div className="bg-gray-200 w-24 h-24 rounded-2xl flex flex-col p-3">
        <div className="dropdown dropdown-end">
          {toggleEditBtn ? (
            <label
              tabIndex={0}
              onClick={() => setDropDown(!dropdown)}
              className="absolute right-0"
            >
              <IoEllipsisVertical size={12} />
            </label>
          ) : (
            <label
              tabIndex={0}
              onClick={() => setToggleEditBtn(!toggleEditBtn)}
              className="absolute right-0 text-red-600"
            >
              <FaTimesCircle size={12} />
            </label>
          )}
          {dropdown && (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <button
                  onClick={() => {
                    setToggleEditBtn(!toggleEditBtn);
                    setDropDown(!dropdown);
                  }}
                  className="text-sm px-2 py-1 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <FaEdit />
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={() => deleteTable(item.id)}
                  className="text-sm px-2 py-1 text-red-600 hover:bg-red-600 hover:text-white"
                >
                  <FaTrashAlt />
                  Delete
                </button>
              </li>
            </ul>
          )}
        </div>
        <div
          className="text-2xl text-center my-auto"
          style={{ fontSize: mediumFont }}
        >
          {toggleEditBtn ? (
            item.tableNumber
          ) : (
            <div className="px-1">
              <input
                type="text"
                defaultValue={item.tableNumber}
                onChange={(e) => setItemData(e.target.value)}
                className="input input-xs input-bordered bg-white w-[66px] rounded-md"
              />
              <button
                onClick={() => editTable(item.id)}
                className="flex items-center gap-1 text-sm px-2 py-0 text-green-600 hover:bg-green-600 border border-green-600 hover:text-white rounded-md"
              >
                <FaSave />
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
