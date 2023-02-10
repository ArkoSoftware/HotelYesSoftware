import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "styled-react-modal";
import {
  assignBillToRoom,
  confirmCheckout,
  getTableList,
} from "../functions/function";
import { getRoomList } from "../../Room/functions/function";

const ConfirmTransferModal2 = ({ isOpen, setIsOpen, tableNumber, state }) => {
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
        <div className="font-bold text-red-700 text-xl">Confirm Checkout?</div>
        <div className="mt-auto flex flex-row space-x-3 w-full">
          <div className="flex-1">
            <button
              onClick={() => confirmCheckout(tableNumber, state)}
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

export default ConfirmTransferModal2;
