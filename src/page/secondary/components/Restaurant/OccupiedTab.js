import React, { useContext, useState } from "react";

import { IoEllipsisVertical } from "react-icons/io5";
import { NavContext } from "../../../../contexts/NavProvider";
import OccupiedModalView from "./OccupiedModalView";

export const OccupiedTab = ({ tableData, rerender, setRerender }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);


  const toggleModal = function () {
    setIsOpen(!isOpen);
    setSideBarOn(!sideBarOn)
  };

  return (
    <div className=" flex flex-col">
      <div className="grid grid-cols-3 md:flex flex-row ">
        {tableData.map((data,idx) => (
          <button key={idx}
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
