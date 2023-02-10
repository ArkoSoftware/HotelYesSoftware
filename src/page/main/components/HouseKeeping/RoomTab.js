import React from "react";
import { IoEllipsisVertical, IoCheckbox } from "react-icons/io5";

export const RoomTab = ({ data }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      {data.map((item) => (
        <div className="p-4">
          <RoomCard item={item} />
        </div>
      ))}
    </div>
  );
};

export const RoomCard = ({ item }) => {
  return (
    <div className="bg-gray-200 w-44 h-44 rounded-2xl flex flex-col p-4">
      <div className="ml-auto">
        <IoEllipsisVertical />
      </div>
      <div className="text-2xl text-center my-auto">{item.roomNumber}</div>
      <div className="flex">
        <div
          className="capitalize mt-auto bg-red-500 px-3 py-1 rounded-xl text-white my-auto"
          style={{ alignSelf: "flex-start", fontSize: 10 }}
        >
          Dirty Room
        </div>
        <IoCheckbox size={28} color="#31A65C" className="my-auto ml-auto" />
      </div>
    </div>
  );
};
