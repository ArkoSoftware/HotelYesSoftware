import React, { useState } from "react";
import Modal from "styled-react-modal";
import InputView from "../../InputView";
import { addBankInfo } from "../function/function";
import ErrorMessage from "../../../../ErrorMessage";

const AddBankInfo = ({ isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const validate = function () {
    if (number == "" || name == "") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white w-1/3 p-6 rounded-xl flex flex-col space-y-5">
        <div className="text-2xl my-4">Add Bank Information</div>
        <InputView label={"Enter Bank Name"} value={name} setValue={setName} />
        <InputView
          label={"Enter Account Number"}
          value={number}
          setValue={setNumber}
        />
        <ErrorMessage
          show={showError}
          message={"Add all the field information"}
        />
        <button
          onClick={() => {
            if (validate()) {
              addBankInfo({ name, number });
              toggleModal();
            } else {
              setShowError(true);
            }
          }}
          className="rounded-xl bg-green-700 text-white w-full p-3 "
          style={{ fontSize: 12 }}
        >
          Add Bank Info
        </button>
      </div>
    </Modal>
  );
};

export default AddBankInfo;
