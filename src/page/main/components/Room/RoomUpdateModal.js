import { doc, updateDoc } from "firebase/firestore/lite";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../../../../config/adminFirebase";

const RoomUpdateModal = ({
  allRoomData,
  rerender,
  setRerender,
  roomId,
  isModalOn,
  setIsModalOn,
}) => {
  const item = allRoomData.find((room) => room?.id === roomId);
  const [roomNumberError, setRoomNumberError] = useState("");
  const [priceError, setPriceError] = useState("");

  const updateRoomHandle = async (event) => {
    event.preventDefault();
    const form = event.target;
    const roomNumber = form.RoomNumber.value;
    const price = form.Price.value;
    const roomType = form.RoomType.value;

    if (!/^\d+$/.test(roomNumber)) {
      setRoomNumberError("* enter valid room number");
    } else {
      setRoomNumberError("");
    }

    if (!/^\d+$/.test(price)) {
      setPriceError("* enter valid number");
    } else {
      setPriceError("");
    }

    const roomRef = doc(db, "roomList", item?.id);
    await updateDoc(roomRef, {
      type: roomType,
      roomNumber,
      price,
    })
      .then(() => {
        toast.success("Update room successfully!");
        setRerender(!rerender);
        setIsModalOn(!isModalOn);
      })
      .catch(() => {
        toast.error("Update failed!");
      });
  };

  return (
    <div>
      <input type="checkbox" id="editRoomModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editRoomModal"
            className="cursor-pointer absolute right-3 rounded-full top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-normal">Update Room Data</h3>
          <form className="py-4" onSubmit={(e) => updateRoomHandle(e)}>
            <label className="block text-xs" htmlFor="RoomNumber">
              Room Number{" "}
              <span className="text-red-500">{roomNumberError}</span>
            </label>

            <input
              type="text"
              name="RoomNumber"
              id="RoomNumber"
              defaultValue={item?.roomNumber}
              placeholder="Room Number"
              className="input input-bordered input-sm w-full mb-4 mt-2"
              required
            />
            <label className="block text-xs" htmlFor="Price">
              Price <span className="text-red-500">{priceError}</span>
            </label>
            <input
              type="text"
              name="Price"
              id="Price"
              placeholder="Price"
              defaultValue={item?.price}
              className="input input-bordered input-sm w-full mb-4 mt-2"
              required
            />
            <label className="block text-xs" htmlFor="RoomType">
              Room Type
            </label>
            <select
              name="RoomType"
              id="RoomType"
              className="input input-sm input-bordered w-full mt-2"
            >
              <option disabled selected>
                {item?.type ? item?.type : "Choose one"}
              </option>
              {[
                "King Size",
                "Double + Single Bed",
                "3 Single Bed",
                "2 Double Bed",
                "2 Single Bed",
              ].map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 duration-300 text-white mt-5 py-2 rounded-md w-full"
            >
              Update Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomUpdateModal;
