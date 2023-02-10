import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../../../config/adminFirebase";

export const getAllExpenseData = async function (date) {
  let localString = new Date(date).toLocaleDateString();
  let parts = localString.split("/");

  // pad the month and day with leading zeros if necessary
  let month = ("0" + parts[0]).slice(-2);
  let day = ("0" + parts[1]).slice(-2);
  let year = parts[2];

  var searchDate = `${year}-${month}-${day}`;

  const col1 = collection(db, "dailyRecord", searchDate, "record");
  const col2 = collection(db, "deposit", searchDate, "record");
  const snap1 = await getDocs(col1);
  const snap2 = await getDocs(col2);
  const arr = [];
  const arr2 = [];
  var total = 0;
  snap1.forEach((docs) => {
    const data = docs.data();
    const info1 = data.vendorName;
    const info2 = data.billType;
    const info3 = data.total;
    const info4 = data.billNumber;
    total = total + parseInt(data.total);
    arr.push([info1, info2, info4, info3]);
  });
  snap2.forEach((docs) => {
    const data = docs.data();
    const name = JSON.parse(data.bank.account).name;
    const acc = JSON.parse(data.bank.account).number;
    const amount = parseInt(data.bank.number);
    const depositType = data.depositType;
    total = total + amount;

    arr2.push([name, depositType, acc, amount]);
  });

  return { arr, arr2, total };
};
export const getAllIncomeData = async function (date) {
  let localString = new Date(date).toLocaleDateString();
  let parts = localString.split("/");

  // pad the month and day with leading zeros if necessary
  let month = ("0" + parts[0]).slice(-2);
  let day = ("0" + parts[1]).slice(-2);
  let year = parts[2];

  var searchDate = `${year}-${month}-${day}`;
  const col1 = collection(db, "dailyRoomRecord", searchDate, "record");
  const col2 = collection(db, "dailyRestaurantRecord", searchDate, "record");
  const snap1 = await getDocs(col1);
  const snap2 = await getDocs(col2);
  const arr = [];
  const arr2 = [];
  var total = 0;
  snap1.forEach((docs) => {
    const data = docs.data();
    const info1 = data.data.customerName;
    const info2 = data.data.billNo;
    const info3 = data.grandTotal;
    total = total + parseInt(info3);
    arr.push([info1, info2, info3]);
  });
  snap2.forEach((docs) => {
    const data = docs.data();
    const info1 = data.data.tableNumber;
    const info2 = data.data.billNo;
    const info3 = data.data.total;
    total = total + parseInt(info3);
    arr.push([info1, info2, info3]);
  });
  return { arr, arr2, total };
};
