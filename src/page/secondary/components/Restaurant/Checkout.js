import { child, get, ref } from "firebase/database";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../../../config/adminFirebase";
import InputView from "./components/InputView";
import { useState } from "react";
import ConfirmTransferModal2 from "./components/ConfirmTransferModal2";
import { ModalProvider } from "styled-react-modal";
import { NavContext } from "../../../../contexts/NavProvider";

const Checkout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const state = useLocation().state;
  const [total, setTotal] = useState(0);
  const [displayTotal, setDisplayTotal] = useState(0);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

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
    setSideBarOn(true);
  }, []);
  return (
    <ModalProvider>
      <div className="p-8 w-full">
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
          <div className="overflow-x-auto">
            <table className="table-normal w-full">
              <thead className="bg-black">
                <tr>
                  <th className="text-white text-[13px] font-normal py-3">
                    S.N.
                  </th>
                  <th className="text-white text-[13px] font-normal py-3">
                    Food Name
                  </th>
                  <th className="text-white text-[13px] font-normal py-3">
                    Food Price
                  </th>
                  <th className="text-white text-[13px] font-normal py-3">
                    Quantity
                  </th>
                  <th className="text-white text-[13px] font-normal py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemList.map((item, index) => (
                  <tr className="bg-gray-300">
                    <th className="font-normal text-center text-[13px] py-3">
                      {index + 1}
                    </th>
                    <td className="font-normal text-center text-[13px] py-3">
                      {item[0]}
                    </td>
                    <td className="font-normal text-center text-[13px] py-3">
                      {item[2]}
                    </td>
                    <td className="font-normal text-center text-[13px] py-3">
                      {item[1]}
                    </td>
                    <td className="font-normal text-center text-[13px] py-3">
                      {parseInt(item[2]) * parseInt(item[1])}
                    </td>
                  </tr>
                ))}
                <tr className="bg-black">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-normal text-white text-center text-[13px] py-3">
                    Discount:
                  </td>
                  <td className="w-28">
                    <input
                      onChange={(e) => {
                        var dis = parseInt(e.currentTarget.value) || 0;
                        setDisplayTotal(total - dis);
                      }}
                      type="text"
                      className="bg-black text-white border text-[13px] rounded-lg text-center py-2"
                    />
                  </td>
                </tr>
                <tr className="bg-black">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-normal text-white text-center text-[13px] py-3">
                    Total:
                  </td>
                  <td className="font-normal text-white text-center text-[13px] py-3">
                    Rs. {displayTotal}
                  </td>
                </tr>
              </tbody>
            </table>
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
