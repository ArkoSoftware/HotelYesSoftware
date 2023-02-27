import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { extreSmallFont, largeFont } from "../../../../theme";
import Loader from "../../../../components/Loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import RoomUpdateModal from "./RoomUpdateModal";
import { useState } from "react";

export const RoomTab = ({ rerender, roomdata, setRerender }) => {
  return (
    <>
      {!roomdata.length && <Loader />}
      <div className="grid grid-cols-2 gap-5 md:flex flex-row flex-wrap ">
        {roomdata.map((item) => (
          <div className="md:p-4">
            <RoomCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export const RoomCard = ({ item }) => {
  const [data, setData] = useState({});

  return (
    <>
      <div className="bg-gray-200 w-40 md:w-44 h-40 md:h-44 rounded-2xl flex flex-col p-4">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="absolute right-0">
            <IoEllipsisVertical size={12} />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box mr-3"
          >
            <li>
              <label
                htmlFor="editRoomModal"
                className="text-sm px-2 py-1 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => setData(item)}
              >
                <FaEdit />
                Edit
              </label>
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
          className="text-2xl text-center my-4"
          style={{ fontSize: largeFont }}
        >
          {item.roomNumber}
        </div>
        {item.type == "Premium" ? (
          <div
            className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
            style={{ alignSelf: "flex-start", fontSize: extreSmallFont }}
          >
            {item.type}
          </div>
        ) : (
          <div
            className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
            style={{ alignSelf: "flex-start", fontSize: extreSmallFont }}
          >
            {item.type}
          </div>
        )}

        <div className="flex m-1 mt-2" style={{ fontSize: extreSmallFont }}>
          <div className="mr-2 ">Price:</div>
          <div className="">Rs.{item.price}</div>
        </div>
      </div>
      <RoomUpdateModal data={data} setData={setData} />
    </>
  );
};
