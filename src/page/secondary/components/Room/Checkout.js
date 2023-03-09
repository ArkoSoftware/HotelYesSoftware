import { child, get, ref } from "firebase/database";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { database } from "../../../../config/adminFirebase";
import InputView from "./components/InputView";
import { useState } from "react";
import ConfirmTransferModal2 from "./components/ConfirmTransferModal2";
import { ModalProvider } from "styled-react-modal";
import { confirmCheckout } from "./functions/function";
import { NavContext } from "../../../../contexts/NavProvider";

const CheckoutRoom = () => {
  const data = useLocation().state;
  const [invoiceTo, setInvoiceTo] = useState("");
  const [orderBillTotal, setOrderBillTotal] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [numOfNights, setNumOfNights] = useState(0);
  const state = useLocation().state;
  const [displayTotal, setDisplayTotal] = useState(0);
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState(0);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  const checkOutRoom = () => {
    const ad = parseInt(state.advance) || 0;
    confirmCheckout({
      invoiceTo,
      data,
      restaurantTotal: displayTotal,
      discount,
      grandTotal:
        displayTotal +
        parseInt(numOfNights) * parseInt(price) -
        parseInt(state.advance || 0) -
        discount,
    });
  };

  console.log(numOfNights);

  const getAllData = async () => {
    let order;
    let allKeys = {};
    if (data.order) {
      order = data.order;
      allKeys = Object.keys(order);
    }

    const arr = [];
    var total = 0;
    for (var i = 0; i < allKeys.length; i++) {
      arr.push(order[allKeys[i]]);
    }
    for (i = 0; i < arr.length; i++) {
      var d1 = arr[i];
      for (var j = 0; j < d1.length; j++) {
        total = total + d1[j][1] * d1[j][2];
      }
    }
    let numOfNights = 0;
    if (!data.checkOutDate == "" || !data.checkOutDate == null) {
      // numOfNights = (new Date().getTime() - 86400000 - data.checkInDate) / 86400000;
      numOfNights = Math.ceil(
        (data.checkOutDate - data.checkInDate) / 86400000
      );
      setNumOfNights(numOfNights);
      // setNumOfNights(Math.round(numOfNights));
    } else {
      setNumOfNights(data.noOfNights);
    }
    if (state.roomRate == null || state.roomRate == "") {
      setPrice(parseInt(state.roomOriginalPrice));
    } else {
      setPrice(data.roomRate);
    }
    setOrderBillTotal(total);
    setOrderList(arr);
    setDisplayTotal(total);
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
              <InputView label={"Invoice To:"} setValue={setInvoiceTo} />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-700 text-white rounded-xl ml-auto px-8 "
              style={{ fontSize: 12 }}
            >
              Checkout
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-col flex-1">
              <div className=" flex flex-row my-7">
                <div className="font-bold mr-4" style={{ fontSize: 14 }}>
                  Invoice Date:
                </div>
                <div className="" style={{ fontSize: 12 }}>
                  {new Date().toDateString()}
                </div>
              </div>
              <div className=" flex flex-row ">
                <div className="font-bold mr-4" style={{ fontSize: 14 }}>
                  Room Number:
                </div>
                <div className="" style={{ fontSize: 12 }}>
                  {data.roomNumber}
                </div>
              </div>
              <div className=" flex flex-row">
                <div className="font-bold mr-4" style={{ fontSize: 14 }}>
                  Client Name:
                </div>
                <div className="" style={{ fontSize: 12 }}>
                  {data.customerName}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-row my-7">
            <div className="font-bold mr-4" style={{ fontSize: 14 }}>
              Checkout Bill
            </div>
          </div>
          <div className="bg-gray-600 p-3 flex flex-row">
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Room Number
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              No. of nights
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Price
            </div>
            <div className="flex-1 text-white" style={{ fontSize: 13 }}>
              Total
            </div>
          </div>
          <div className="bg-gray-300 p-3 flex flex-row">
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              {state.roomNumber}
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              {numOfNights}
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              {parseInt(price)}
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Rs. {parseInt(numOfNights) * parseInt(price)}
            </div>
          </div>
          <div className="bg-gray-300 p-3 flex flex-row">
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Restaurant Bill
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Rs. {displayTotal}
            </div>
          </div>
          <div className="bg-gray-400 p-3 flex flex-row">
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Advance
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Rs.
              {parseInt(state.advance || 0)}
            </div>
          </div>
          <div className="bg-gray-400 p-3 flex flex-row">
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Discount
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              <input
                onChange={(e) => {
                  var dis = parseInt(e.currentTarget.value) || 0;
                  setDiscount(dis);
                }}
                type="text"
                className="bg-gray-400 text-black w-full outline-none text-left"
              />
            </div>
          </div>
          <div className="bg-gray-400 p-3 flex flex-row">
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}></div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Grand Total
            </div>
            <div className="flex-1 text-black" style={{ fontSize: 13 }}>
              Rs.
              {displayTotal +
                parseInt(numOfNights) * parseInt(price) -
                parseInt(state.advance || 0) -
                discount}
            </div>
          </div>
          {data.hasOwnProperty("order") ? (
            <>
              <div className=" flex flex-row my-7">
                <div className="font-bold mr-4" style={{ fontSize: 14 }}>
                  Food Bill
                </div>
              </div>
              <div className="bg-gray-600 p-3 flex flex-row">
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

              {orderList.map((item) => (
                <>
                  {item.map((docs, index) => (
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
                        {docs[0]}
                      </div>
                      <div
                        className="flex-1 text-black p-3 border border-gray-400"
                        style={{ fontSize: 13 }}
                      >
                        {docs[2]}
                      </div>
                      <div
                        className="flex-1 text-black p-3 border border-gray-400"
                        style={{ fontSize: 13 }}
                      >
                        {docs[1]}
                      </div>
                      <div
                        className="flex-1 text-black p-3 border border-gray-400"
                        style={{ fontSize: 13 }}
                      >
                        {parseInt(docs[2]) * parseInt(docs[1])}
                      </div>
                    </div>
                  ))}
                  <div className="border border-gray-600 bg-gray-600 pt-1"></div>
                </>
              ))}

              <div className="bg-gray-600 p-3 flex flex-row">
                <div className="text-white px-4" style={{ fontSize: 13 }}></div>
                <div
                  className="flex-1 text-white"
                  style={{ fontSize: 13 }}
                ></div>
                <div
                  className="flex-1 text-white"
                  style={{ fontSize: 13 }}
                ></div>
                <div
                  className="flex-1 text-white text-center"
                  style={{ fontSize: 13 }}
                >
                  Food Bill Total:
                </div>
                <div
                  className="flex-1 text-white text-right"
                  style={{ fontSize: 13 }}
                >
                  Rs. {displayTotal}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <ConfirmTransferModal2
          callFunction={checkOutRoom}
          state={itemList}
          tableNumber={state.roomNumber}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </ModalProvider>
  );
};

export default CheckoutRoom;
