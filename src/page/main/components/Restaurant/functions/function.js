import { auth, db } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore/lite";

export const getTableList = async function () {
  const doc1 = collection(db, "tableList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  arr.sort(function (a, b) {
    return a.tableNumber - b.tableNumber;
  });
  return arr;
};
export const addTable = async function (tableNumber) {
  const doc1 = collection(db, "tableList");
  const snap = await addDoc(doc1, {
    tableNumber: parseInt(tableNumber),
    uid: auth.currentUser.uid,
    user: auth.currentUser.email,
    time: serverTimestamp(),
  }).then(() => {
    return true;
  });
};
