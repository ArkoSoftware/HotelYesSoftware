import React from "react";
import { auth, db } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore/lite";

export const getRoomList = async function () {
  const doc1 = collection(db, "roomList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  arr.sort(function (a, b) {
    return a.roomNumber - b.roomNumber;
  });
  return arr;
};
export const addRoom = async function (roomNumber, price, type) {
  const doc1 = collection(db, "roomList");
  const snap = await addDoc(doc1, {
    roomNumber: parseInt(roomNumber),
    price: parseInt(price),
    type: type,
    uid: auth.currentUser.uid,
    user: auth.currentUser.email,
    time: serverTimestamp(),
  }).then(() => {
    return true;
  });
};
