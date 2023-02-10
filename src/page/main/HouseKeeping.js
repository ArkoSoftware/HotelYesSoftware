import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";

import { RoomTab } from "./components/HouseKeeping/RoomTab";
import NewPurchaseBill from "./components/HouseKeeping/NewPurchaseBill";
import DataFrame from "./components/HouseKeeping/DataFrame";
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
const roomdata = [
  {
    roomNumber: 1,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 2,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 3,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 4,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 1,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 2,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 3,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 4,
    roomType: "premium",
    price: 2400,
  },
];

const HouseKeeping = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">HouseKeeping</div>
          <div className="pt-10 px-4 pb-8">
            <DataFrame data={data} title={title} />
          </div>
          <button
            onClick={() => toggleModal()}
            className="rounded-xl border bg-blue-700 text-white text-sm py-2 px-8 mt-2 mx-4"
          >
            Make HouseKeeping Bill
          </button>
          <div className="pt-5">
            <RoomTab data={roomdata} />
          </div>
        </div>
        <NewPurchaseBill isOpen={isOpen} toggleModal={toggleModal} />
      </div>
    </ModalProvider>
  );
};

export default HouseKeeping;
