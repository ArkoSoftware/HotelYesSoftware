import React, { useEffect, useState } from "react";
import DatePicker from "./components/DailyBook/DatePicker";
import { ModalProvider } from "styled-react-modal";
import {
  getAllExpenseData,
  getAllIncomeData,
} from "./components/DailyBook/functions/function";
const DailyBook = () => {
  const [date, setDate] = useState(new Date().getTime());
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseTotal, setExpenseTotal] = useState();
  const [incomeTotal, setIncomeTotal] = useState();
  const [previousClosing, setPreviousClosing] = useState();
  const getAllData = async () => {
    let today = new Date(date);
    let previousDate = new Date();
    previousDate.setDate(today.getDate() - 1);

    let localString = new Date(previousDate.getTime()).toLocaleDateString();
    let parts = localString.split("/");
    let month = ("0" + parts[0]).slice(-2);
    let day = ("0" + parts[1]).slice(-2);
    let year = parts[2];

    var predate = `${year}-${month}-${day}`;
    const arr11 = await getAllExpenseData(predate);
    const arr12 = await getAllIncomeData(predate);
    const temp11 = [arr11.arr, arr11.arr2];
    const temp12 = [arr12.arr, arr12.arr2];
    setPreviousClosing(parseInt(arr12.total) - parseInt(arr11.total));
    const arr = await getAllExpenseData(date);
    const arr2 = await getAllIncomeData(date);
    const temp = [arr.arr, arr.arr2];
    const temp2 = [arr2.arr, arr2.arr2];
    setIncomeTotal(arr2.total + parseInt(arr12.total) - parseInt(arr11.total));
    setExpenseTotal(arr.total);
    setExpenseData(temp);
    setIncomeData(temp2);

    //setIncomeData(incomeData + parseInt(arr12.total) - parseInt(arr11.total));
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <ModalProvider>
      <div className="p-8 flex flex-col">
        <div className="text-2xl tracking-tighter font-bold">Daily Book</div>
        <div className="w-1/3 my-4 flex flex-col space-y-4 ">
          <div className="flex flex-1">
            <DatePicker label={"Pick a Date"} value={date} setValue={setDate} />
          </div>
          <div className=" flex-1">
            <button
              className="bg-green-600 rounded-xl px-8 h-10 mt-auto text-sm text-white"
              onClick={getAllData}
            >
              Search
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col flex-1">
            <div className="p-3 bg-gray-400 text-center text-sm">Income</div>
            <div
              className="flex flex-row p-2 border border-gray-200 px-5"
              style={{ fontSize: 12 }}
            >
              <div className="flex-1">Closing Balance: </div>
              <div className="flex-1 text-right">Rs. {previousClosing}</div>
            </div>
            {incomeData.map((docs) => (
              <>
                {docs.map((data) => (
                  <div
                    className="flex flex-row p-2 border border-gray-200 px-5"
                    style={{ fontSize: 12 }}
                  >
                    <div className="flex-1">Bill No: {data[1]}</div>
                    <div className="flex-1 text-right">Rs. {data[2]}</div>
                  </div>
                ))}
              </>
            ))}
            <div
              className="flex flex-row p-4 border border-gray-200 bg-gray-300"
              style={{ fontSize: 15 }}
            >
              <div className="flex-1 text-right ">Total: Rs. {incomeTotal}</div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="p-3 bg-gray-400 text-center text-sm">Expense</div>
            {expenseData.map((docs, index) => (
              <>
                {docs.map((data) => (
                  <>
                    {index == 0 ? (
                      <div
                        className="flex flex-row p-2 border border-gray-200 px-5"
                        style={{ fontSize: 12 }}
                      >
                        <div className="flex-1">
                          Bill No: {data[2]} ( {data[1]} )
                        </div>
                        <div className="flex-1 text-right">Rs. {data[3]}</div>
                      </div>
                    ) : (
                      <div
                        className="flex flex-row p-2 border border-gray-200 px-5"
                        style={{ fontSize: 12 }}
                      >
                        <div className="flex-1">
                          Deposited: {data[0]} (
                          {data[2].slice(-3).padStart(data[2].length, "*")} )
                        </div>
                        <div className="flex-1 text-right">Rs. {data[3]}</div>
                      </div>
                    )}
                  </>
                ))}
              </>
            ))}
            <div
              className="flex flex-row p-4 border border-gray-200 bg-gray-300"
              style={{ fontSize: 15 }}
            >
              <div className="flex-1 text-right ">
                Total: Rs. {expenseTotal}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-row p-3 bg-gray-400">
          <div className="font-bold tracking-tighter my-auto">Closing:</div>
          <div className="text-xl my-auto mx-5">
            Rs.{incomeTotal - expenseTotal}
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default DailyBook;
