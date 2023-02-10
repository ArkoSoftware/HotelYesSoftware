import React, { useState } from "react";
import Modal from "styled-react-modal";
import InputView from "../InputView";
import SelectView from "../SelectView";
import DatePicker from "../DatePicker";
import PurchaseTable from "./PurchaseTable";
import { addPurchaseBill } from "./functions/addPurchaseBill";
import { getCategoryItem, getVendorItem } from "./functions/function";
import { useEffect } from "react";

const NewPurchaseBill = ({ isOpen, toggleModal }) => {
  const [billNumber, setBillNumber] = useState();
  const [billDate, setBillDate] = useState(new Date().getTime());
  const [dueDate, setDueDate] = useState("Select Date");
  const [billType, setBillType] = useState("Sales");
  const [vendorName, setVendorName] = useState();
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [listInfo, setListInfo] = useState([]);
  const [total, setTotal] = useState(0);
  const [vendorList, setVendorList] = useState([]);

  const resetState = () => {
    setBillNumber();
    setBillDate("Select Date");
    setDueDate("Select Date");
    setBillType("Sales");
    setVendorName();
    setInvoiceNumber();
    setListInfo([]);
  };
  const getAllData = async () => {
    const arr = [];
    const temp = await getVendorItem();
    for (var i = 0; i < temp.length; i++) {
      arr.push(temp[i].vendorName);
    }
    setVendorList(arr);
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
      <div
        className="bg-white rounded-xl p-8 overflow-y-scroll"
        style={{ width: "90%", height: "90%" }}
      >
        <div className="flex">
          <span className="text-xl tracking-tighter">Purchase Bill</span>
          <div className="ml-auto flex space-x-3">
            <button
              className="bg-green-700 text-white rounded p-2 px-5"
              onClick={async () => {
                const res = await addPurchaseBill(
                  billNumber,
                  billDate,
                  dueDate,
                  billType,
                  vendorName,
                  invoiceNumber,
                  listInfo,
                  total
                );
                if (res) {
                  toggleModal();
                }
              }}
            >
              Save
            </button>
            <button
              className="bg-gray-300 rounded p-2 px-5"
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="mt-5 flex space-x-2 flex-wrap">
          <div className="flex-1">
            <InputView setValue={setBillNumber} label={"Bill Number"} />
          </div>
          <div className="flex-1">
            <DatePicker
              setValue={setBillDate}
              value={billDate}
              label={"Bill Date"}
            />
          </div>
          <div className="flex-1">
            <DatePicker
              value={dueDate}
              setValue={setDueDate}
              label={"Due Date"}
            />
          </div>

          <div className="flex-1">
            <SelectView
              setValue={setBillType}
              label={"Types"}
              data={["Sales", "Credit"]}
            />
          </div>
        </div>
        <div className="mt-10 flex space-x-2">
          <div className="flex-1">
            <label
              htmlFor=""
              className="text-gray-600"
              style={{ fontSize: 12 }}
            >
              Vendor Name
            </label>
            <select
              onChange={(e) => {
                setVendorName(e.target.value);
              }}
              className="p-2 flex-1 border border-gray-400 rounded w-full text-sm"
            >
              <option className="capitalize"></option>
              {vendorList.map((d1) => (
                <option className="capitalize" value={d1}>
                  {d1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 flex space-x-3">
            <div className="flex-1">
              <InputView
                setValue={setInvoiceNumber}
                label={"Supplier Invoice Number"}
              />
            </div>
          </div>
        </div>
        <div className="my-3 mt-7">
          <PurchaseTable
            total={total}
            setTotal={setTotal}
            setValue={setListInfo}
          />
        </div>
      </div>
    </Modal>
  );
};

export default NewPurchaseBill;
/*
<SelectView
            label={"Item Name"}
            data={["Data 1", "Data 2", "Data 3", "Data 4"]}
          />
 <InputView label={"Unit (Litre)"} />*/
