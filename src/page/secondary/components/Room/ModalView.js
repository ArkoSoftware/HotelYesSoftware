import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import DatePicker from "../../../../components/DatePicker";
import { useState } from "react";
import {
  addData,
  checkIn,
  checkInReserve,
  deleteReservation,
  updateData,
} from "./functions/function";
import { auth } from "../../../../config/adminFirebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ErrorMessage from "../../../ErrorMessage";
import { useContext } from "react";
import { NavContext } from "../../../../contexts/NavProvider";

const RoomSmallTab = ({ state }) => {
  return (
    <div className="border border-gray-500 w-44 h-44 rounded-2xl flex flex-col p-4 mx-auto">
      <div className="text-2xl text-center my-auto">{state.roomNumber}</div>
      {state.type == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {state.type || state.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-gray-200 text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {state.type || state.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 12 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{state.price || state.roomRate}</div>
      </div>
    </div>
  );
};
const ModalView = ({
  isOpen,
  setIsOpen,
  toggleModal,
  state,
  type,
  rerender,
  setRerender,
}) => {
  const [customerName, setCustomerName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [nationality, setNationality] = React.useState("");
  const [idNo, setIdNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [checkInDate, setCheckInDate] = useState(new Date().getTime());
  const [checkOutDate, setCheckOutDate] = useState("");
  const [noOfNights, setNoOfNights] = useState("");
  const [arrivedFrom, setArrivedFrom] = useState("");
  const [goingTo, setGoingTo] = useState("");
  const [purpose, setPurpose] = useState("");
  const [occupation, setOccupation] = useState("");
  const [method, setMethod] = useState("");
  const [billNo, setBillNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [roomRate, setRoomRate] = useState("");
  const [advance, setAdvance] = useState("");
  const [roomRateType, setRoomRateType] = useState("EP");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [showError, setShowError] = useState("");
  const [showErrorReserve, setShowErrorReserve] = useState("");

  const { sideBarOn, setSideBarOn } = useContext(NavContext);
  const emptyField = () => {
    setCustomerName("");
    setPhoneNumber("");
    setNationality("");
    setIdNo("");
    setAddress("");
    setEmail("");
    setNoOfNights("");
    setNoOfGuests("");
    setArrivedFrom("");
    setGoingTo("");
    setPurpose("");
    setOccupation("");
    setMethod("");
    setBillNo("");
    setVehicleNo("");
    setRoomRate("");
    setAdvance("");
    setRoomRateType("");
    setNoOfGuests("");
    setCheckInDate(new Date().getTime());
    setCheckOutDate("");
  };
  const changeData = () => {
    if (type == "NewRoom") {
      emptyField();
    } else {
      console.log(state);
      setCustomerName(state.customerName);
      setPhoneNumber(state.phoneNumber);
      setNationality(state.nationality);
      setIdNo(state.idNo);
      setAddress(state.address);
      setEmail(state.email);
      setNoOfNights(state.noOfNights);
      setNoOfGuests(state.noOfGuests);
      setArrivedFrom(state.arrivedFrom);
      setGoingTo(state.goingTo);
      setPurpose(state.purpose);
      setOccupation(state.occupation);
      setMethod(state.method);
      setBillNo(state.billNo);
      setVehicleNo(state.vehicleNo);
      setRoomRate(state.roomRate);
      setAdvance(state.advance);
      setRoomRateType(state.roomRateType);
      setNoOfGuests(state.noOfGuests);
      setCheckInDate(state.checkInDate || "");
      setCheckOutDate(state.checkOutDate || "");
    }
  };
  const validateData = () => {
    if (
      customerName == "" ||
      checkInDate == "" ||
      phoneNumber == "" ||
      nationality == "" ||
      idNo == "" ||
      address == "" ||
      email == "" ||
      noOfNights == "" ||
      advance == "" ||
      goingTo == "" ||
      purpose == "" ||
      occupation == "" ||
      method == "" ||
      billNo == "" ||
      vehicleNo == "" ||
      roomRate == "" ||
      !(/^\d+$/.test(advance))
    ) {
      setShowError(true);
    } else {
      return true;
    }
  };
  const validateReserveData = () => {
    if (customerName == "" || !(/^\d+$/.test(advance)) || !(/^\d+$/.test(roomRate))) { 
      alert(!(/^\d+$/.test("f")))
      setShowErrorReserve(true);
    } else {
      return true;
    }
  };
  useEffect(() => {
    changeData();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-5/6 h-full overflow-y-scroll">
        <div className="flex">
          {type == "NewRoom" && (
            <span className="text-xl tracking-tighter">Book New Room</span>
          )}
          {type == "Reserve" && (
            <span className="text-xl tracking-tighter">Check In</span>
          )}
          {type == "Booked" && (
            <span className="text-xl tracking-tighter">Guest Detail</span>
          )}
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-4 flex flex-col md:flex-row space-x-2">
            <div className=" px-5">
              <RoomSmallTab state={state} />
            </div>
            <div className="flex flex-col w-full space-y-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex flex-col md:flex-row md:space-x-6">
                <InputView
                  required={true}
                  label={"Customer Name"}
                  value={customerName}
                  error={showError || showErrorReserve}
                  setValue={setCustomerName}
                />
                <InputView
                  label={"Phone Number"}
                  value={phoneNumber}
                  error={showError}
                  setValue={setPhoneNumber}
                />
                <InputView
                  label={"Nationality"}
                  value={nationality}
                  setValue={setNationality}
                  error={showError}
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <InputView
                  label={"Id No:"}
                  value={idNo}
                  error={showError}
                  setValue={setIdNo}
                />
                <InputView
                  label={"Address"}
                  value={address}
                  setValue={setAddress}
                  error={showError}
                />
                <InputView
                  label={"Email:"}
                  value={email}
                  error={showError}
                  setValue={setEmail}
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="flex flex-col w-full">
                  <DatePicker
                    required={true}
                    label={"Check In Date"}
                    setValue={setCheckInDate}
                    value={checkInDate}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <DatePicker
                    label={"Check Out Date"}
                    setValue={setCheckOutDate}
                    value={checkOutDate}
                    error={showError}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-col md:flex-row md:space-x-8">
            <InputView
              label={"Arrived From:"}
              value={arrivedFrom}
              setValue={setArrivedFrom}
              error={showError}
            />
            <InputView
              label={"Going To:"}
              value={goingTo}
              setValue={setGoingTo}
              error={showError}
            />
            <InputView
              label={"Purpose Of Visit:"}
              value={purpose}
              setValue={setPurpose}
              error={showError}
            />

            <InputView
              label={"Occupation:"}
              value={occupation}
              setValue={setOccupation}
              error={showError}
            />
          </div>

          <div className="my-4 flex flex-col md:flex-row md:space-x-8">
            <InputView
              label={"Method Of Payment"}
              value={method}
              setValue={setMethod}
              error={showError}
            />
            <InputView
              label={"Bill No."}
              error={showError}
              value={billNo}
              setValue={setBillNo}
            />
            <InputView
              label={"Vehicle No."}
              value={vehicleNo}
              setValue={setVehicleNo}
              error={showError}
            />
          </div>
          <div className="my-4 mb-0 flex flex-col md:flex-row md:space-x-8 border border-gray-700 bg-gray-200 p-4 rounded-xl">
            <InputView
              label={"Room Rate"}
              value={roomRate}
              setValue={setRoomRate}
              error={showError || showErrorReserve}
            />
            <InputView
              label={"Advance Payment"}
              value={advance}
              setValue={setAdvance}
              error={showError || showErrorReserve}
            />
            <SelectView
              label={"Room Rate Type"}
              data={["EP", "BB", "MAP", "AP"]}
              setValue={setRoomRateType}
            />
            <InputView
              label={"No. Of Guests"}
              value={noOfGuests}
              setValue={setNoOfGuests}
              error={showError}
            />
          </div>
          <div className="mt-3">
            <ErrorMessage
              message={"Complete all the field with * "}
              show={showError || showErrorReserve}
            />
          </div>
          {type == "NewRoom" && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => {
                  if (validateData()) {
                    checkIn({
                      customerName,
                      phoneNumber,
                      nationality,
                      idNo,
                      address,
                      email,
                      checkInDate,
                      checkOutDate,
                      noOfNights,
                      arrivedFrom,
                      goingTo,
                      purpose,
                      occupation,
                      method,
                      billNo,
                      vehicleNo,
                      roomRate,
                      advance,
                      roomRateType,
                      noOfGuests,
                      roomNumber: state.roomNumber,
                      roomType: state.type,
                      roomOriginalPrice: state.price,
                      discount: state.price - roomRate,
                      status: "Booked",
                      uploadedBy: auth.currentUser.uid,
                    });

                    setIsOpen(!isOpen);
                    setRerender(!rerender);
                  }
                }}
                style={{ fontSize: 12 }}
                className="bg-green-700 p-2 text-white rounded-xl w-full mt-8 flex-1"
              >
                Check In
              </button>
              <button
                onClick={() => {
                  if (validateReserveData()) {
                    addData({
                      customerName,
                      phoneNumber,
                      nationality,
                      idNo,
                      address,
                      email,
                      checkInDate,
                      checkOutDate,
                      noOfNights,
                      arrivedFrom,
                      goingTo,
                      purpose,
                      occupation,
                      method,
                      billNo,
                      vehicleNo,
                      roomRate,
                      advance,
                      roomRateType,
                      noOfGuests,
                      roomNumber: state.roomNumber,
                      roomType: state.type,
                      roomOriginalPrice: state.price,
                      discount: state.price - roomRate,
                      status: "Reserved",
                      uploadedBy: auth.currentUser.uid,
                    });

                    setRerender(!rerender);
                    setIsOpen(!isOpen);
                    setSideBarOn(!isOpen);
                  }
                }}
                style={{ fontSize: 12 }}
                className="p-2 text-red-500 rounded-xl w-full mt-8 flex-1 border border-red-500"
              >
                Reserve
              </button>
            </div>
          )}
          {type == "Reserve" && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => {
                  if (validateData()) {
                    checkInReserve({
                      customerName,
                      phoneNumber,
                      nationality,
                      idNo,
                      address,
                      email,
                      checkInDate: new Date().getTime(),
                      checkOutDate,
                      noOfNights,
                      arrivedFrom,
                      goingTo,
                      purpose,
                      occupation,
                      method,
                      billNo,
                      vehicleNo,
                      roomRate,
                      advance,
                      roomRateType,
                      noOfGuests,
                      id: state.id,
                      roomNumber: state.roomNumber,
                      roomType: state.roomType,
                      roomOriginalPrice: state.roomOriginalPrice,
                      discount: state.roomOriginalPrice - roomRate,
                      status: "Booked",
                      uploadedBy: auth.currentUser.uid,
                      date: new Date(),
                    });

                    setRerender(!rerender);
                    setIsOpen(!isOpen);
                    setSideBarOn(!sideBarOn);
                  }
                }}
                style={{ fontSize: 12 }}
                className="bg-green-700 p-2 text-white rounded-xl w-full mt-8 flex-1"
              >
                Check In
              </button>
              <div className="flex-1 flex flex-row space-x-2">
                <button
                  onClick={async () => {
                    if (validateData()) {
                      updateData({
                        customerName,
                        phoneNumber,
                        nationality,
                        idNo,
                        address,
                        email,
                        checkInDate,
                        checkOutDate,
                        noOfNights,
                        arrivedFrom,
                        goingTo,
                        purpose,
                        occupation,
                        method,
                        billNo,
                        vehicleNo,
                        roomRate,
                        advance,
                        roomRateType,
                        noOfGuests,
                        roomNumber: state.roomNumber,
                        roomType: state.roomType,
                        roomOriginalPrice: state.roomOriginalPrice,
                        discount: state.price - roomRate,
                        status: "Reserved",
                        uploadedBy: auth.currentUser.uid,
                        id: state.id,
                      });

                      setRerender(!rerender);
                      setIsOpen(!isOpen);
                      setSideBarOn(!isOpen);
                    }
                  }}
                  style={{ fontSize: 12 }}
                  className="border border-green-500 bg-green-200 p-2 text-green-800 rounded-xl w-full mt-8 flex-1"
                >
                  Save
                </button>
                <button
                  onClick={async () => {
                    await deleteReservation(state);
                    setRerender(!rerender);
                    setIsOpen(!isOpen);
                    setSideBarOn(!sideBarOn);
                  }}
                  style={{ fontSize: 12 }}
                  className="border border-red-500 bg-red-200 p-2 text-red-800 rounded-xl w-full mt-8 flex-1"
                >
                  Cancel Reservation
                </button>
              </div>
            </div>
          )}
          {type == "Booked" && (
            <div className="flex flex-row space-x-4">
              <Link
                to="/room/checkout"
                state={state}
                style={{ fontSize: 12 }}
                className="border border-red-500 bg-red-200 p-2 text-red-800 rounded-xl w-full mt-8 flex-1 text-center"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
