import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import { addNewEntry } from "./functions/function";
import { useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../../../config/adminFirebase";

const ModalViewNewEntry = ({ isOpen, toggleModal, setIsOpen }) => {
  const [unit, setUnit] = React.useState();
  const [itemName, setItemName] = React.useState();

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/3 ">
        <div className="flex">
          <span className="text-xl tracking-tighter">New Entry</span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-4">
            <InputView label={"Name"} value={itemName} setValue={setItemName} />
          </div>
          <div className="my-4">
            <InputView label={"Unit"} value={unit} setValue={setUnit} />
          </div>
          <button
            onClick={() => {
              if (addNewEntry(itemName, unit)) {
                setIsOpen(false);
                setItemName("");
                setUnit("");
              }
            }}
            className="bg-green-700 p-3 text-white rounded-xl w-full mt-8"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalViewNewEntry;
