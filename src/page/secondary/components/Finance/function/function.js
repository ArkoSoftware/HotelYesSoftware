import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db } from "../../../../../config/adminFirebase";

export const addBankInfo = async function (bank) {
  const collection1 = collection(db, "bankInformation");
  const snap = await addDoc(collection1, bank);
};
export const addSahakariInfo = async function (bank) {
  const collection1 = collection(db, "sahakariInformation");
  const snap = await addDoc(collection1, bank);
};
export const getBankInfo = async function (bank) {
  const collection1 = collection(db, "bankInformation");
  const snap = await getDocs(collection1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};
export const getShakariInfo = async function (bank) {
  const collection1 = collection(db, "sahakariInformation");
  const snap = await getDocs(collection1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};

export const deposit = (bank) => {
  let localString2 = new Date().toLocaleDateString();
  let parts2 = localString2.split("/");

  // pad the month and day with leading zeros if necessary
  let month2 = ("0" + parts2[0]).slice(-2);
  let day2 = ("0" + parts2[1]).slice(-2);
  let year2 = parts2[2];

  var checkOutDate = `${year2}-${month2}-${day2}`;
  const collection1 = collection(db, "deposit", checkOutDate, "record");
  const snap = addDoc(collection1, { bank, time: serverTimestamp() });
};
