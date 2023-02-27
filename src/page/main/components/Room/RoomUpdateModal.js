import React from "react";
import toast from "react-hot-toast";

const RoomUpdateModal = ({ data }) => {
  const { type, roomNumber, time, user, price, id } = data;

  const updateRoomHandle = (event) => {
    event.preventDefault();
    const form = event.target;
    const roomNumber = form.RoomNumber.value;
    const price = form.Price.value;
    const roomType = form.RoomType.value; 

    
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
