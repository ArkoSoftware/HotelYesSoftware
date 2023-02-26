import React from "react";

const RoomUpdateModal = () => {
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
          <h3 className="text-lg font-bold">Update Room Data</h3>
          <div className="py-4">
            <label htmlFor="RoomNumber">Room Number</label>
            <input
              type="text"
              name="RoomNumber"
              id=""
              placeholder="Room Number"
            />
            <label htmlFor="Price">Price</label>
            <input type="text" name="Price" id="Price" placeholder="Price" />
            <label htmlFor="RoomType">Room Type</label>
            <select name="RoomType" id="RoomType">

            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomUpdateModal;
