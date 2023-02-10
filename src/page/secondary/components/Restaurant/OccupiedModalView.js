import React from "react";
import Modal from "styled-react-modal";
import { IoClose, IoEllipsisVertical } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import { extreSmallFont, smallFont } from "../../../../theme";
import DatePicker from "../../../../components/DatePicker";
import { useState } from "react";
import { addData, addOrderData } from "./functions/function";
import { auth } from "../../../../config/adminFirebase";
import OrderTable from "./OrderTable";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

const OccupiedModalView = ({
  isOpen,
  setIsOpen,
  toggleModal,
  state,
  rerender,
  setRerender,
}) => {
  const [total, setTotal] = useState();
  const [value, setValue] = useState();
  const [guests, setGuests] = useState();
  const [billNo, setBillNo] = useState();
  const fixData = () => {
    setGuests(state.form ? state.form.guests : "");
  };
  useEffect(() => {
    fixData();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-5/6 h-5/6 overflow-y-scroll">
        <div className="flex">
          <div className="bg-gray-200 w-24 h-24 rounded-2xl flex flex-col p-4">
            <div className="ml-auto">
              <IoEllipsisVertical size={12} />
            </div>
            <div
              className="text-2xl text-center my-auto"
              style={{ fontSize: 12 }}
            >
              {state.form ? state.form.tableNumber : ""}
            </div>
          </div>
          <div className=" px-5 w-full flex flex-row space-x-4">
            <InputView
              label={"No. of Guests"}
              value={guests}
              setValue={setGuests}
            />
            <InputView label={"Bill No."} value={billNo} setValue={setBillNo} />
          </div>
        </div>
        <div className="px-3 py-4">
          <UpdateOrder
            rerender={rerender}
            setRerender={setRerender}
            toggleModal={toggleModal}
            state={state}
            total={total}
            setTotal={setTotal}
            setValue={setValue}
            guests={guests}
            billNo={billNo}
          />
        </div>
      </div>
    </Modal>
  );
};

export default OccupiedModalView;
