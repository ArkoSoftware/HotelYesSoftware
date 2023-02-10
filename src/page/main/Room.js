import React, { useState } from "react";
import { RoomTab } from "./components/Room/RoomTab";
import { ModalProvider } from "styled-react-modal";

import ModalView from "./components/Room/ModalView";
import { extreSmallFont, largeFont } from "../../theme";
import { getRoomList } from "./components/Room/functions/function";
import { useEffect } from "react";

const Room = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rerender, setRerender] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  const [roomdata, setRoomData] = useState([]);
  const getAllData = async () => {
    const arr = await getRoomList();
    setRoomData(arr);
  };

  useEffect(() => {
    getAllData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Manage Rooms
          </div>
          <button
            onClick={toggleModal}
            className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            style={{ fontSize: 12 }}
          >
            Add New Room
          </button>
          <div className="pt-5">
            <RoomTab roomdata={roomdata} rerender={rerender} />
          </div>
        </div>
        <ModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
          setRerender={setRerender}
          rerender={rerender}
        />
      </div>
    </ModalProvider>
  );
};

export default Room;
