import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import { addRoom } from "./functions/function";
import { auth } from "../../../../config/adminFirebase";
import { extreSmallFont, largeFont } from "../../../../theme";
import ErrorMessage from "../../../ErrorMessage";
import { useState } from "react";

const ModalView = ({
  isOpen,
  setIsOpen,
  toggleModal,
  setRerender,
  rerender,
}) => {
  const [showError, setShowError] = useState(false);
  const [roomNumber, setRoomNumber] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/2">
        <div className="flex">
          <span
            className="text-xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Add New Room
          </span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <div className="my-2">
            <InputView
              label={"Room Number"}
              value={roomNumber}
              setValue={setRoomNumber}
            />
          </div>
          <div className="my-2">
            <InputView label={"Price"} value={price} setValue={setPrice} />
          </div>
          <div className="my-2">
            <SelectView
              label={"Room Type"}
              data={[
                "",
                "King Size",
                "Double + Single Bed",
                "3 Single Bed",
                "2 Double Bed",
                "2 Single Bed",
              ]}
              setValue={setRoomType}
            />
          </div>
          <ErrorMessage
            show={showError}
            message={"Please Fill All The Information"}
          />
          <button
            onClick={() => {
              if (roomNumber == "" || price == "" || roomType == "") {
                setShowError(!showError);
              } else {
                if (addRoom(roomNumber, price, roomType)) {
                  setIsOpen(false);
                  setRoomNumber();
                  setPrice();
                  setRoomType("");
                  setRerender(!rerender);
                }
              }
            }}
            className="bg-green-700 p-3 text-white rounded-xl w-full mt-5"
            style={{ fontSize: 14 }}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
