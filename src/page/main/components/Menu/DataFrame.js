import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { extreSmallFont } from "../../../../theme";
import { Puff } from "react-loader-spinner";
import { deleteDoc, doc } from "firebase/firestore/lite";
import { db } from "../../../../config/adminFirebase";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import EditMenuModal from "./EditMenuModal";

const DataFrame = ({ data, title, rerender, setRerender }) => {
  const [tableData, setTableData] = useState({});
  const [modalIsOn, setModalIsOn] = useState(true);
 

  const deleteMenuHandler = async (id) => {
    const confirmed = window.confirm("Are you want to delete?");
    if (confirmed) {
      await deleteDoc(doc(db, "menu", id))
        .then(() => {
          setRerender(!rerender);
          toast.success("Menu deleted Successfully");
        })
        .catch((err) => toast.error("Menu delete failed!"));
    } else {
      toast.error("Menu delete cancel!");
    }
  };

  const editMenuHandler = (data) => {
    setTableData(data); 
  };

  return (
    <div className="w-full border border-gray-300 flex flex-col">
      <div className="w-full bg-gray-300 p-2" style={{ display: "flex" }}>
        <div className="w-24" style={{ fontSize: extreSmallFont }}>
          S.N.
        </div>
        {title.map((t) => (
          <div
            className="flex-1 text-center"
            style={{ fontSize: extreSmallFont }}
          >
            {t}
          </div>
        ))}
      </div>
      {data.map((t, index) => (
        <div className="w-full" style={{ display: "flex", fontSize: 12 }}>
          <div
            className="w-24 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {index + 1}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {t.foodName}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {t.category}
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            Open Recipe
          </div>
          <div
            className="flex-1 border border-gray-100 p-3"
            style={{ fontSize: extreSmallFont }}
          >
            {t.price}
          </div>

          <div className="border border-gray-100 py-3 px-6 flex gap-4">
            <label
              onClick={() => {
                editMenuHandler(t);
                setModalIsOn(!modalIsOn);
              }}
              htmlFor="editMenuModal"
              className="duration-500 text-green-600 bg-white hover:bg-green-600 border border-green-600 hover:text-white py-2 px-2 rounded cursor-pointer"
            >
              <FaEdit />
            </label>
            <button
              onClick={() => deleteMenuHandler(t.id)}
              className="duration-500 text-red-600 bg-white hover:bg-red-600 border border-red-600 hover:text-white py-2 px-2 rounded"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
      {modalIsOn && (
        <EditMenuModal
          tableData={tableData}
          modalIsOn={modalIsOn}
          setModalIsOn={setModalIsOn}
          setRerender={setRerender}
          rerender={rerender}
        />
      )}
    </div>
  );
};

export default DataFrame;
