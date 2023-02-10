import React from "react";
import { ModalProvider } from "styled-react-modal";
import { RoomTab } from "./components/Room/RoomTab";
import { useEffect } from "react";
import { getRoomList } from "./components/Room/functions/function";
import { useState } from "react";
import { largeFont } from "../../theme";
import DatePicker from "./components/Room/components/DatePicker";

const Room = () => {
  const [rerender, setRerender] = useState(false);
  const [available, setAvailable] = useState([]);
  const [booked, setBooked] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [dirty, setDirty] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date().getTime());
  const getAllData = async () => {
    const arr = await getRoomList(selectDate);
    setAvailable(arr.arr);
    setBooked(arr.arr3);
    setReserved(arr.arr2);
    setDirty(arr.arr4);
  };

  useEffect(() => {
    getAllData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="w-full h-full overflow-y-scroll">
        <div className="p-8">
          <div className=" text-2xl font-bold tracking-tighter">Book Room</div>
          <div className="w-1/3 my-4 flex flex-col space-y-4 ">
            <div className="flex flex-1">
              <DatePicker
                label={"Pick a Date"}
                value={selectDate}
                setValue={setSelectDate}
              />
            </div>
            <div className=" flex-1">
              <button
                onClick={() => getAllData()}
                className="bg-green-600 rounded-xl px-8 h-10 mt-auto text-sm text-white"
              >
                Search
              </button>
            </div>
          </div>

          <RoomTab
            rerender={rerender}
            setRerender={setRerender}
            available={available}
            booked={booked}
            reserved={reserved}
            dirty={dirty}
          />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Room;
