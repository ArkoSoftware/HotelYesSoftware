import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "styled-react-modal";
import { assignBillToRoom, getTableList } from "../functions/function";
import { getRoomList } from "../../Room/functions/function";

const ConfirmTransferModal = ({
  isOpen,
  setIsOpen,
  state,
  orderInfo,
  tableNumber,
  rerender,
  setRerender,
  toggleModalFinal,
  toggleModal2,
}) => {
  const [selectedRoom, setSelectedRoom] = useState([]);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-2/6 h-2/6  flex flex-col overflow-y-scroll ">
        <div className="font-bold text-red-700 text-xl">Assign Order To ?</div>
        <div className="text-2xl text-center my-auto font-bold tracking-tighter">
          {state.roomNumber}
        </div>
        <div className="mt-auto flex flex-row space-x-3 w-full">
          <div className="flex-1">
            <button
              onClick={() => {
                assignBillToRoom(state, orderInfo, tableNumber);
                setRerender(!rerender);
                toggleModal();
                toggleModal2();
                toggleModalFinal();
              }}
              className="bg-green-700 p-3 rounded-xl  text-white"
              style={{ fontSize: 12 }}
            >
              Confirm
            </button>
          </div>
          <div className="flex-1 ">
            <button
              onClick={() => toggleModal()}
              className="bg-red-700 p-3 rounded-xl  text-white"
              style={{ fontSize: 12 }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmTransferModal;
