import React, { useContext, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import ModalView from "./ModalView";
import { mediumFont } from "../../../../theme";
import { NavContext } from "../../../../contexts/NavProvider";
export const RoomTab = ({
  available,
  booked,
  reserved,
  dirty,
  rerender,
  setRerender,
  deleteRoom,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const [type, setType] = useState();
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setSideBarOn(!sideBarOn);
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-col flex-wrap ">
        <div className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
          Available Room
        </div>
        <div className="flex flex-wrap">
          {available.map((item, idx) => (
            <div className="p-4" key={idx}>
              <RoomCard
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
                deleteRoom={deleteRoom}
              />
            </div>
          ))}
          {reserved.map((item, idx) => (
            <div
              className="p-4"
              key={idx}
              onClick={() => setSideBarOn(!sideBarOn)}
            >
              <RoomCardReserved
                state={item}
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
              />
            </div>
          ))}
          {booked.map((item, idx) => (
            <div className="p-4" key={idx}>
              <RoomCardBooked
                state={item}
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
              />
            </div>
          ))}
        </div>
        <div className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
          Dirty Room
        </div>
        <div className="flex flex-row flex-wrap">
          {dirty.map((item, idx) => (
            <div className="p-4" key={idx}>
              <RoomCardDirty item={item} />
            </div>
          ))}
        </div>
      </div>
      {isOpen ? (
        <ModalView
          rerender={rerender}
          setRerender={setRerender}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
          state={roomInfo}
          type={type}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export const RoomCard = ({
  item,
  setState,
  setIsOpen,
  isOpen,
  setType,
  deleteRoom,
}) => {
  const { sideBarOn, setSideBarOn } = useContext(NavContext); 
  
  return (
    <div className="relative">
      <div className="dropdown dropdown-left absolute right-3 top-1">
        <button
          tabIndex={0}
          className="border duration-500 border-transparent hover:border-green-600 hover:bg-green-500 hover:text-white p-1 rounded-full"
        >
          <IoEllipsisVertical size={10} />
        </button>
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 p-2 shadow rounded-box w-20 mr-4"
        >
          <button
            onClick={() => deleteRoom(item.id)}
            className="py-2 bg-red-700 hover:bg-red-800 rounded text-white text-center"
          >
            Delete
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          setState(item);
          setIsOpen(!isOpen);
          setType("NewRoom");
          setSideBarOn(!sideBarOn);
        }}
        className="bg-gray-200 w-36 h-36 rounded-2xl flex flex-col p-4"
      >
        <div
          className="text-2xl text-center my-3 mx-auto"
          style={{ fontSize: mediumFont }}
        >
          {item.roomNumber}
        </div>
        {item.type == "Premium" ? (
          <div
            className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
            style={{ alignSelf: "flex-start", fontSize: 8 }}
          >
            {item.type}
          </div>
        ) : (
          <div
            className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
            style={{ alignSelf: "flex-start", fontSize: 8 }}
          >
            {item.type}
          </div>
        )}

        <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
          <div className="mr-2 ">Price:</div>
          <div className="">Rs.{item.price}</div>
        </div>
      </button>
    </div>
  );
};
export const RoomCardReserved = ({
  item,
  setState,
  setIsOpen,
  isOpen,
  setType,
}) => {
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
        setType("Reserve");
      }}
      className="border border-orange-500 bg-orange-100 w-36 h-36 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.roomType == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.roomOriginalPrice}</div>
      </div>
    </button>
  );
};
export const RoomCardBooked = ({
  item,
  setState,
  setIsOpen,
  isOpen,
  setType,
}) => {
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
        setType("Booked");
      }}
      className="border border-green-500 bg-green-100 w-36 h-36 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.roomType == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.roomRate}</div>
      </div>
    </button>
  );
};
export const RoomCardDirty = ({ item }) => {
  return (
    <div className="border border-red-500 bg-red-100 w-36 h-36 rounded-2xl flex flex-col p-4">
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.roomType == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.roomRate}</div>
      </div>
    </div>
  );
};
