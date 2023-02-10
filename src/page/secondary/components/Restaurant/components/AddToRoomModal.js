import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "styled-react-modal";
import { getTableList } from "../functions/function";
import { getRoomList } from "../../Room/functions/function";
import ConfirmTransferModal from "./ConfirmTransferModal";

const AddToRoomModal = ({
  isOpen,
  setIsOpen,
  orderInfo,
  tableNumber,
  rerender,
  setRerender,
  toggleModal2,
}) => {
  const [occupiedRoom, setOccupiedRoom] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [state, setState] = useState();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const getAllData = async () => {
    const arr = await getRoomList();
    setOccupiedRoom(arr.arr3);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-4/6 h-4/6 overflow-y-scroll ">
        <div className="text-xl">Select a room</div>
        {occupiedRoom.map((data) => (
          <button
            onClick={() => {
              setIsOpen2(true);
              setState(data);
            }}
            className="bg-gray-300 p-3 w-24 h-24 m-4 rounded-xl"
            style={{ fontSize: 13 }}
          >
            <div className="text-center">{data.roomNumber}</div>
          </button>
        ))}
      </div>
      {isOpen2 ? (
        <ConfirmTransferModal
          toggleModal2={toggleModal2}
          toggleModalFinal={toggleModal}
          rerender={rerender}
          setRerender={setRerender}
          tableNumber={tableNumber}
          orderInfo={orderInfo}
          state={state}
          isOpen={isOpen2}
          setIsOpen={setIsOpen2}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default AddToRoomModal;
