import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import BankTransfer from "./components/Finance/components/BankTransfer";
import AddBankInfo from "./components/Finance/components/AddBankInfo";
import SahakariTransfer from "./components/Finance/components/SahakariTransfer";
import { Link } from "react-router-dom";

const Finance = () => {
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isAddBankOpen, setIsAddBankOpen] = useState(false);
  const [isSahakariOpen, setIsSahakariOpen] = useState(false);
  return (
    <ModalProvider>
      <div className="p-5">
        <div className="text-xl">Financial Entry</div>
        <div className="py-5 flex ">
          <button
            onClick={() => setIsBankOpen(!isBankOpen)}
            className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            style={{ fontSize: 12 }}
          >
            Transfer
          </button>
          <button
            onClick={() => setIsAddBankOpen(!isAddBankOpen)}
            className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            style={{ fontSize: 12 }}
          >
            Add Bank Information
          </button>
          <button
            onClick={() => setIsSahakariOpen(!isSahakariOpen)}
            className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            style={{ fontSize: 12 }}
          >
            Enter Saharkari Information
          </button>
        </div>
        <Link
          to="/dailyBook"
          className="rounded-xl bg-green-800 text-white text-sm py-2 px-8 mt-10 mx-4"
          style={{ fontSize: 12 }}
        >
          Daily Book
        </Link>
      </div>
      <BankTransfer isOpen={isBankOpen} setIsOpen={setIsBankOpen} />
      <AddBankInfo isOpen={isAddBankOpen} setIsOpen={setIsAddBankOpen} />
      <SahakariTransfer isOpen={isSahakariOpen} setIsOpen={setIsSahakariOpen} />
    </ModalProvider>
  );
};

export default Finance;
