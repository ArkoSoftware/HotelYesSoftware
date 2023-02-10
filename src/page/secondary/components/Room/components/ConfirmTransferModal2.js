import React from "react";
import Modal from "styled-react-modal";

const ConfirmTransferModal2 = ({ isOpen, setIsOpen, callFunction }) => {
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
              onClick={() => callFunction()}
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
