import React from "react";
import { auth, db } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore/lite";
import { async } from "@firebase/util";

export const getItemList = async function () {
  const doc1 = collection(db, "itemList");
  const q = query(doc1, where("quantity", "!=", 0));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push([docs.id, data]);
  });
  return arr;
};
export const getCategoryItem = async function () {
  const doc1 = collection(db, "itemList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  return arr;
};
export const getVendorItem = async function () {
  const doc1 = collection(db, "vendorList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  return arr;
};
export const addNewStock = async function (itemName, quantity) {
  const doc1 = collection(db, "itemList");
  const q = query(doc1, where("itemName", "==", itemName));
  const snap = await getDocs(q);
  snap.forEach(async (docs) => {
    const data = docs.id;
    const doc2 = doc(db, "itemList", data);
    const snap2 = await updateDoc(doc2, { quantity: increment(quantity) });
    return "Done";
  });
};
export const addNewEntry = async function (itemName, category, unit) {
  const doc1 = collection(db, "itemList");
  const snap = await addDoc(doc1, {
    itemName: itemName,
    category: category,
    unit: unit,
    quantity: 0,
    uid: auth.currentUser.uid,
    user: auth.currentUser.email,
    time: serverTimestamp(),
  }).then(() => {
    return true;
  });
};
