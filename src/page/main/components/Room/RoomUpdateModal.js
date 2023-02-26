import React from "react";

const RoomUpdateModal = ({ data }) => {
  const { type, roomNumber, time, user, price, id } = data;

  

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
          <div className="py-4">
            <label className="block text-xs" htmlFor="RoomNumber">
              Room Number
            </label>

            <input
              type="text"
              name="RoomNumber"
              id="RoomNumber"
              value={roomNumber}
              placeholder="Room Number"
              className="input input-bordered input-sm w-full mb-4 mt-2"
            />
            <label className="block text-xs" htmlFor="Price">
              Price
            </label>
            <input
              type="text"
              name="Price"
              id="Price"
              placeholder="Price"
              value={price}
              className="input input-bordered input-sm w-full mb-4 mt-2"
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
                {type ? type : "Choose one"}
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

            <button className="bg-green-600 text-white mt-5 py-1 rounded-md w-full">
              Update Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomUpdateModal;
