import React, { useContext, useState } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import ModalView from "./ModalView";
import { mediumFont } from "../../../../theme";
import { NavContext } from "../../../../contexts/NavProvider";
import Loader from "../../../../components/Loader/Loader";
export const RoomTab = ({
  available,
  booked,
  reserved,
  dirty,
  rerender,
  setRerender,
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
      {!(
        available.length ||
        booked.length ||
        reserved.length ||
        dirty.length
      ) ? (
        <Loader />
      ) : (
        <div className="flex flex-col flex-wrap ">
          {available.length !== 0 && (
            <>
              <h4 className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
                Available Room
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-5 md:gap-0">
                {available.map((item, idx) => (
                  <div className="md:p-4" key={idx}>
                    <RoomCard
                      item={item}
                      setState={setRoomInfo}
                      setIsOpen={setIsOpen}
                      isOpen={isOpen}
                      setType={setType}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {reserved.length !== 0 && (
            <>
              <h4 className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
                Reserved Room
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-5 md:gap-0">
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
              </div>
            </>
          )}
          {booked.length !== 0 && (
            <>
              <h4 className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
                Booked Room
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-5 md:gap-0">
                {booked.map((item, idx) => (
                  <div
                    className="p-4"
                    key={idx}
                    onClick={() => setSideBarOn(!sideBarOn)}
                  >
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
            </>
          )}
          {dirty.length !== 0 && (
            <>
              <h4 className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
                Dirty Room
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8 gap-5 md:gap-0">
                {dirty.map((item, idx) => (
                  <div className="p-4" key={idx}>
                    <RoomCardDirty item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
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

export const RoomCard = ({ item, setState, setIsOpen, isOpen, setType }) => {
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setState(item);
          setIsOpen(!isOpen);
          setType("NewRoom");
          setSideBarOn(!sideBarOn);
        }}
        className="bg-gray-200 w-36 h-36 md:w-28 md:h-28 rounded-2xl flex flex-col p-4"
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
      className="border border-orange-500 bg-orange-100 w-36 h-36 md:w-28 md:h-28 rounded-2xl flex flex-col p-4"
    >
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
      className="border border-green-500 bg-green-100 w-36 h-36 md:w-28 md:h-28 rounded-2xl flex flex-col p-4"
    >
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
    </button>
  );
};
export const RoomCardDirty = ({ item }) => {
  return (
    <div className="border border-red-500 bg-red-100 w-36 h-36 md:w-28 md:h-28 rounded-2xl flex flex-col p-4">
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
    </div>
  );
};
