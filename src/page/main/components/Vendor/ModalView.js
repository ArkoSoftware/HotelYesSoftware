import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import { addVendor } from "./functions/function";

const ModalView = ({ isOpen, toggleModal }) => {
  const [vendorName, setVendorName] = React.useState();
  const [vendorAddress, setVendorAdress] = React.useState();
  const [vendorCompany, setVendorCompany] = React.useState();
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/3 ">
        <div className="flex">
          <span className="text-xl tracking-tighter">Add Vendor</span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-4">
            <InputView
              label={"Vendor Name"}
              value={vendorName}
              setValue={setVendorName}
            />
          </div>
          <div className="my-4">
            <InputView
              label={"Vendor Address"}
              value={vendorAddress}
              setValue={setVendorAdress}
            />
          </div>
          <div className="my-4">
            <InputView
              label={"Vendor Company"}
              value={vendorCompany}
              setValue={setVendorCompany}
            />
          </div>
          <button
            onClick={() => {
              if (addVendor(vendorName, vendorAddress, vendorCompany)) {
                toggleModal();
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

export default ModalView;
