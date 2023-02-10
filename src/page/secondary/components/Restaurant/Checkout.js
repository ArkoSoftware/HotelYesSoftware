import { child, get, ref } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../../../config/adminFirebase";
import InputView from "./components/InputView";
import { useState } from "react";
import ConfirmTransferModal2 from "./components/ConfirmTransferModal2";
import { ModalProvider } from "styled-react-modal";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const state = useLocation().state;
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);

  const getAllData = async () => {
    const realRef = ref(database);
    const arr2 = [];

    await get(
      child(realRef, `liveRestaurant/table` + state.tableNumber + `/form`)
    ).then((snapshot) => {
      if (snapshot.exists()) {
        arr2.push(snapshot.val());
      }
    });
    let t = 0;
    const data = JSON.parse(arr2[0].menuData);
    for (let i = 0; i < data.length; i++) {
      t = t + parseInt(data[i][2]) * parseInt(data[i][1]);
    }
    setTotal(t);
    setDisplayTotal(t);
    setItemList(data);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <ModalProvider>
      <div className="p-8">
        <div className="flex flex-col p-8 bg-gray-200 rounded-xl">
          <div className="flex">
            <div className="">
              <InputView label={"Invoice To:"} />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-700 text-white rounded-xl ml-auto px-8 "
              style={{ fontSize: 12 }}
            >
              Checkout
            </button>
          </div>
          <div className=" flex flex-row my-7">
            <div className="font-bold mr-4" style={{ fontSize: 14 }}>
              Invoice Date:
            </div>
            <div className="" style={{ fontSize: 12 }}>
              {new Date().toDateString()}
            </div>
          </div>
          <div className=" flex flex-row mb-7">
            <div className="font-bold mr-4" style={{ fontSize: 14 }}>
              Food Bill
            </div>
          </div>
          <div className="bg-black p-3 flex flex-row">
            <div className="text-white px-4" style={{ fontSize: 13 }}>
              S.N.
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Food Name
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Price
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Quantity
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Total
            </div>
          </div>

          {itemList.map((item, index) => {
            return (
              <div className="bg-gray-300 flex flex-row">
                <div
                  className="text-black p-3 px-6 border border-gray-400"
                  style={{ fontSize: 13 }}
                >
                  {index + 1}
                </div>
                <div
                  className="flex-1 text-black p-3 border border-gray-400"
                  style={{ fontSize: 13 }}
                >
                  {item[0]}
                </div>
                <div
                  className="flex-1 text-black p-3 border border-gray-400"
                  style={{ fontSize: 13 }}
                >
                  {item[2]}
                </div>
                <div
                  className="flex-1 text-black p-3 border border-gray-400"
                  style={{ fontSize: 13 }}
                >
                  {item[1]}
                </div>
                <div
                  className="flex-1 text-black p-3 border border-gray-400"
                  style={{ fontSize: 13 }}
                >
                  {parseInt(item[2]) * parseInt(item[1])}
                </div>
              </div>
            );
          })}
          <div className="bg-black p-3 flex flex-row">
            <div className="text-white px-4" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}></div>
            <div
              className="flex-1 text-white text-center"
              style={{ fontSize: 13 }}
            >
              Discount:
            </div>
            <div
              className="flex-1 text-white text-right"
              style={{ fontSize: 13 }}
            >
              <input
                onChange={(e) => {
                  var dis = parseInt(e.currentTarget.value) || 0;
                  setDisplayTotal(total - dis);
                }}
                type="text"
                className="bg-black text-white text-right w-full py-2"
              />
            </div>
          </div>
          <div className="bg-black p-3 flex flex-row">
            <div className="text-white px-4" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}></div>
            <div
              className="flex-1 text-white text-center"
              style={{ fontSize: 13 }}
            >
              Total:
            </div>
            <div
              className="flex-1 text-white text-right"
              style={{ fontSize: 13 }}
            >
              Rs. {displayTotal}
            </div>
          </div>
        </div>
        <ConfirmTransferModal2
          state={itemList}
          tableNumber={state.tableNumber}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </ModalProvider>
  );
};

export default Checkout;
