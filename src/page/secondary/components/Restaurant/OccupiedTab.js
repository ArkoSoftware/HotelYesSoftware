import React, { useState } from "react";

import ModalView from "./ModalView";
import { IoEllipsisVertical } from "react-icons/io5";
import OccupiedModalView from "./OccupiedModalView";

export const OccupiedTab = ({ tableData, rerender, setRerender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const toggleModal = function () {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-row space-x-4">
        {tableData.map((data) => (
          <button
            onClick={() => {
              setTableInfo(data);
              toggleModal();
            }}
          >
            <div className="border border-green-700 bg-green-200 w-24 h-24 rounded-2xl flex flex-col p-4 m-3">
              <div className="ml-auto">
                <IoEllipsisVertical size={12} />
              </div>
              <div
                className="text-2xl text-center my-auto"
                style={{ fontSize: 12 }}
              >
                {data.form.tableNumber}
              </div>
            </div>
          </button>
        ))}
      </div>
      {isOpen ? (
        <OccupiedModalView
          rerender={rerender}
          setRerender={setRerender}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
          state={tableInfo}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
