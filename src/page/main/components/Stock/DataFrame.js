import { deleteDoc, doc } from "firebase/firestore/lite";
import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Puff } from "react-loader-spinner";
import { db } from "../../../../config/adminFirebase";
import { extreSmallFont, smallFont } from "../../../../theme";
import { toast } from "react-hot-toast";

const DataFrame = ({ data, title }) => {
  const [onDeleteBtn, setOnDeleteBtn] = useState(true);
  const deleteItemHandler = async (id) => {
    alert(id);
    await deleteDoc(doc(db, "itemList", id))
      .then(() => {
        toast.success("Item deleted Successfully");
        setOnDeleteBtn(false);
      })
      .catch((err) => toast.error("Item delete failed!"));
  };

  return (
    <div className="w-full border border-gray-300 flex flex-col">
      <div
        className="w-full bg-gray-300 p-2"
        style={{ display: "flex", fontSize: smallFont }}
      >
        <div className="md:w-24">S.N.</div>
        {title.map((t, idx) => (
          <div key={idx} className="flex-1 text-center">
            {t}
          </div>
        ))}
      </div>
      {!data.length ? (
        <div className="flex justify-center py-2">
          <Puff
            height="30"
            width="30"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        data.map((t, index) => (
          <div
            key={index}
            className="w-full"
            style={{ display: "flex", fontSize: 12 }}
          >
            <div className="md:w-24 border border-gray-100 p-3">{index + 1}</div>
            <div className="flex-1 border border-gray-100 p-3">
              {t[1].itemName}
            </div>
            <div className="flex-1 border border-gray-100 p-3">
              {t[1].category}
            </div>
            <div className="flex-1 border border-gray-100 flex items-center justify-between">
              <div className=" p-3">{t[1].quantity}</div>
              <div className="dropdown dropdown-left">
                <button
                  tabIndex={0}
                  className="ml-auto bg-black rounded m-1 p-2"
                >
                  <IoChevronDown size={12} color="#fff" />
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-20"
                >
                  <li>
                    <button
                      onClick={() => deleteItemHandler(t[0])}
                      className="py-2 bg-red-700 hover:bg-red-800 text-white text-center"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DataFrame;
