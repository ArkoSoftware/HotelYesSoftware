import React, { useEffect, useState } from "react";
import Modal from "styled-react-modal";
import InputView from "../../InputView";
import {
  addBankInfo,
  addSahakariInfo,
  deposit,
  getBankInfo,
  getShakariInfo,
} from "../function/function";
import ErrorMessage from "../../../../ErrorMessage";
import SelectView from "../SelectView";
import SelectView2 from "../SelectView2";

const BankTransfer = ({ isOpen, setIsOpen }) => {
  const [number, setNumber] = useState("");
  const [showError, setShowError] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [sahakariList, setSahakariList] = useState([]);
  const [depositType, setDepositType] = useState("");
  const [account, setAccount] = useState("");
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const validate = function () {
    console.log(number, account, depositType);
    if (number == "" || account == "" || depositType == "") {
      return false;
    } else {
      return true;
    }
  };
  const getAllData = async () => {
    const arr = await getBankInfo();
    const arr2 = await getShakariInfo();
    setBankList(arr);
    setSahakariList(arr2);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white w-1/3 p-6 rounded-xl flex flex-col space-y-5">
        <div className="text-2xl my-4">Bank/ Sahakari Transfer</div>
        <SelectView
          label={"Deposit Organization"}
          data={["", "Bank Transfer", "Sahakari Deposit"]}
          setValue={setDepositType}
        />
        {depositType == "Bank Transfer" ? (
          <SelectView2
            label={"Bank Account"}
            data={bankList}
            setValue={setAccount}
          />
        ) : (
          <></>
        )}
        {depositType == "Sahakari Deposit" ? (
          <SelectView2
            label={"Sahakari Account"}
            data={sahakariList}
            setValue={setAccount}
          />
        ) : (
          <></>
        )}
        <InputView
          label={"Enter Transfer Amount"}
          value={number}
          setValue={setNumber}
        />
        <ErrorMessage
          show={showError}
          message={"Add all the field information"}
        />
        <button
          onClick={() => {
            if (validate()) {
              deposit({ account, number, depositType });
              toggleModal();
            } else {
              setShowError(true);
            }
          }}
          className="rounded-xl bg-green-700 text-white w-full p-3 "
          style={{ fontSize: 12 }}
        >
          Add Record
        </button>
      </div>
    </Modal>
  );
};

export default BankTransfer;
