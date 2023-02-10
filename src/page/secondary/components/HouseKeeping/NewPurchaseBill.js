import React, { useState } from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import DatePicker from "../DatePicker";
import PurchaseTable from "./PurchaseTable";

const NewPurchaseBill = ({ isOpen, toggleModal }) => {
  const [unit, setUnit] = React.useState();
  const [itemName, setItemName] = React.useState();
  const [isDateOpen, setDateIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div
        className="bg-white rounded-xl p-8 overflow-y-scroll"
        style={{ width: "90%", height: "90%" }}
      >
        <div className="flex">
          <span className="text-xl tracking-tighter">Purchase Bill</span>
          <div className="ml-auto flex space-x-3">
            <button
              className="bg-green-700 text-white rounded p-2 px-5"
              onClick={toggleModal}
            >
              Save
            </button>
            <button
              className="bg-gray-300 rounded p-2 px-5"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="mt-5 flex space-x-2 flex-wrap">
          <div className="flex-1">
            <InputView label={"Bill Number"} />
          </div>
          <div className="flex-1">
            <DatePicker label={"Bill Date"} />
          </div>
          <div className="flex-1">
            <DatePicker label={"Due Date"} />
          </div>
          <div className="flex-1">
            <InputView label={"Purchase Order"} />
          </div>
          <div className="flex-1">
            <SelectView
              label={"Types"}
              data={["Data 1", "Data 2", "Data 3", "Data 4"]}
            />
          </div>
        </div>
        <div className="mt-10 flex space-x-2">
          <div className="flex-1">
            <InputView label={"Supplier / Vendor"} />
          </div>
          <div className="flex-1 flex space-x-3">
            <div className="flex-1">
              <InputView label={"Supplier Invoice Number"} />
            </div>

            <div className="flex-1">
              <DatePicker label={"Supplier Invoice Number"} />
            </div>
          </div>
        </div>
        <div className="my-3 mt-7">
          <PurchaseTable />
        </div>
      </div>
    </Modal>
  );
};

export default NewPurchaseBill;
/*
<SelectView
            label={"Item Name"}
            data={["Data 1", "Data 2", "Data 3", "Data 4"]}
          />
 <InputView label={"Unit (Litre)"} />*/
