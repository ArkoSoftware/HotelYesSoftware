import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";

import { RoomTab } from "./components/HouseKeeping/RoomTab";
import NewPurchaseBill from "./components/HouseKeeping/NewPurchaseBill";
import DataFrame from "./components/HouseKeeping/DataFrame";
import { useEffect } from "react";
import { listOfDirtyRoom } from "./components/HouseKeeping/functions/function";
let data = [
  {
    billId: 210,
    rooms: 10,
    date: "2nd Jan",
    price: 2400,
    delivered: "NotDelivered",
  },
];
let title = ["Bill Id", "No. of Rooms", "Date", "Price", "Delivered"];

const HouseKeeping = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomData, setRoomData] = useState([]);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  const getDirtyRoomData = async () => {
    const arr = await listOfDirtyRoom();
    setRoomData(arr);
  };

  useEffect(() => {
    getDirtyRoomData();
  }, []);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">HouseKeeping</div>

          <div className="pt-5">
            <RoomTab data={roomData} />
          </div>
        </div>
        <NewPurchaseBill isOpen={isOpen} toggleModal={toggleModal} />
      </div>
    </ModalProvider>
  );
};

export default HouseKeeping;

/*
<div className="pt-10 px-4 pb-8">
            <DataFrame data={data} title={title} />
          </div>
          <button
            onClick={() => toggleModal()}
            className="rounded-xl border bg-blue-700 text-white text-sm py-2 px-8 mt-2 mx-4"
          >
            Make HouseKeeping Bill
          </button>
          */
