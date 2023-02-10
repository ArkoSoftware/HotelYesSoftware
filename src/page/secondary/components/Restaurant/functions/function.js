import React from "react";
import { auth, db, database } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { child, get, push, ref, remove, set, update } from "firebase/database";

export const getTableList = async function () {
  const realRef = ref(database);
  const arr2 = [];
  const filterTable = [];
  await get(child(realRef, `liveRestaurant/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveRestaurant/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr2.push(snapshot.val());
            filterTable.push(snapshot.val().form.tableNumber);
          }
        });
      }
    }
  });
  const doc1 = collection(db, "tableList");
  if (filterTable.length == 0) {
    filterTable.push("");
  }
  const q = query(doc1, where("tableNumber", "not-in", filterTable));
  const snap = await getDocs(q);
  const arr = [];
  snap.forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });
  arr.sort(function (a, b) {
    return a.tableNumber - b.tableNumber;
  });
  return { arr, arr2 };
};

export const getMenuItem = async function () {
  const doc1 = collection(db, "menu");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push(docs.data());
  });
  return arr;
};

export const addOrderData = async function (form) {
  const ref1 = ref(database, "liveRestaurant/table" + form.tableNumber);
  await set(ref1, {
    form,
  });
};

export const updateOrderData = async function (data) {
  const form = data.state.form;

  const ref1 = ref(database, "liveRestaurant/table" + form.tableNumber);
  await update(ref1, {
    form: {
      guests: data.guests,
      menuData: JSON.stringify(data.menuData),
      tableNumber: data.tableNumber,
      total: data.total,
      billNo: data.billNo,
    },
  });
};

export const assignBillToRoom = async function (data, orderInfo, tableNumber) {
  const roomNumber = data.roomNumber;
  const ref1 = ref(database, "liveBooking/checkIn" + roomNumber + "/order");
  await push(ref1, orderInfo);

  try {
    const ref1 = ref(database, "liveRestaurant/table" + tableNumber);
    await remove(ref1);
  } catch {}
};

export const confirmCheckout = async function (tableNumber, itemList) {
  const realRef = ref(database);
  const arr2 = [];
  const filterTable = [];
  let localString = new Date().toLocaleDateString();
  let parts = localString.split("/");

  // pad the month and day with leading zeros if necessary
  let month = ("0" + parts[0]).slice(-2);
  let day = ("0" + parts[1]).slice(-2);
  let year = parts[2];

  var checkInDate = `${year}-${month}-${day}`;

  await get(
    child(realRef, `liveRestaurant/table` + tableNumber + `/form`)
  ).then((snapshot) => {
    if (snapshot.exists()) {
      arr2.push(snapshot.val());
    }
  });
  const collection1 = collection(db, "restaurantSales", checkInDate, "history");
  const snap = await addDoc(collection1, {
    data: arr2[0],
    date: serverTimestamp(),
  });
  const collection2 = collection(
    db,
    "dailyRestaurantRecord",
    checkInDate,
    "record"
  );
  const snap2 = await addDoc(collection2, {
    data: arr2[0],
    date: serverTimestamp(),
  });
  try {
    const ref1 = ref(database, "liveRestaurant/table" + tableNumber);
    await remove(ref1);
  } catch {}
};
