import { child, get, ref, remove } from "firebase/database";
import { auth, database, db } from "../../../../../config/adminFirebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  serverTimestamp,
  query,
  where,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { set } from "firebase/database";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const getRoomList = async function (selectDate) {
  const realRef = ref(database);
  const arr2 = [];
  const arr3 = [];
  const arr = [];
  const arr4 = [];
  const filterRoom = [""];

  await get(child(realRef, `liveReserve/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveReserve/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr2.push(snapshot.val());
            filterRoom.push(snapshot.val().roomNumber);
          }
        });
      }
    }
  });

  (await getDocs(collection(db, "reserved"))).forEach((docs) => {
    const data = docs.data();
    if (data.checkOutDate == "") {
      arr2.push(data);
      filterRoom.push(data.roomNumber);
    } else {
      if (selectDate == data.checkOutDate || selectDate > data.checkOutDate) {
        return;
      }
      if (selectDate >= data.checkInDate && selectDate < data.checkOutDate) {
        arr2.push(data);
        filterRoom.push(data.roomNumber);
      }
    }
  });
  await get(child(realRef, `liveDirty/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveDirty/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr4.push(snapshot.val());
            filterRoom.push(snapshot.val().roomNumber);
          }
        });
      }
    }
  });
  (
    await getDocs(
      query(
        collection(db, "roomList"),
        where("roomNumber", "not-in", filterRoom)
      )
    )
  ).forEach((docs) => {
    const data = docs.data();
    arr.push(data);
  });

  return { arr, arr3, arr2, arr4 };
};

export const addData = async function (form) {
  const doc1 = collection(db, "reserved");
  const snap = await addDoc(doc1, form);
};
export const checkIn = async function (form) {};

const NavigateFinal = function () {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      // 👇 Redirects to about page, note the `replace: true`
      navigate("/room", { replace: true });
    }, 100);
  }, []);
};

export const confirmCheckout = async function (data) {
  if (data.data.order != null) {
    const temp = data;
    temp.data.order = JSON.stringify(data.data.order);
    let localString = new Date(data.data.checkInDate).toLocaleDateString();
    let parts = localString.split("/");

    // pad the month and day with leading zeros if necessary
    let month = ("0" + parts[0]).slice(-2);
    let day = ("0" + parts[1]).slice(-2);
    let year = parts[2];

    var checkInDate = `${year}-${month}-${day}`;

    let localString2 = new Date().toLocaleDateString();
    let parts2 = localString2.split("/");

    // pad the month and day with leading zeros if necessary
    let month2 = ("0" + parts2[0]).slice(-2);
    let day2 = ("0" + parts2[1]).slice(-2);
    let year2 = parts2[2];

    var checkOutDate = `${year2}-${month2}-${day2}`;
    const doc1 = collection(db, "roomHistory", checkInDate, "history");

    const snap = await addDoc(doc1, temp);
    const doc2 = collection(db, "dailyRoomRecord", checkOutDate, "record");
    const snap2 = await addDoc(doc2, temp);
    try {
      const ref1 = ref(database, "liveBooking/checkIn" + data.data.roomNumber);
      await remove(ref1);
    } catch {}
    const ref1 = ref(database, "liveDirty/dirty" + data.data.roomNumber);
    await set(ref1, {
      roomNumber: data.data.roomNumber,
      price: data.data.roomOriginalPrice,
      roomType: data.data.roomType,
    });
  } else {
    const temp = data;
    temp.data.order = JSON.stringify([]);

    let localString = new Date(data.data.checkInDate).toLocaleDateString();
    let parts = localString.split("/");

    // pad the month and day with leading zeros if necessary
    let month = ("0" + parts[0]).slice(-2);
    let day = ("0" + parts[1]).slice(-2);
    let year = parts[2];

    var checkInDate = `${year}-${month}-${day}`;

    let localString2 = new Date().toLocaleDateString();
    let parts2 = localString2.split("/");

    // pad the month and day with leading zeros if necessary
    let month2 = ("0" + parts2[0]).slice(-2);
    let day2 = ("0" + parts2[1]).slice(-2);
    let year2 = parts2[2];

    var checkOutDate = `${year2}-${month2}-${day2}`;
    const doc1 = collection(db, "roomHistory", checkInDate, "history");

    const snap = await addDoc(doc1, temp);
    const doc2 = collection(db, "dailyRoomRecord", checkOutDate, "record");
    const snap2 = await addDoc(doc2, temp);
    try {
      const ref1 = ref(database, "liveBooking/checkIn" + data.data.roomNumber);
      await remove(ref1);
    } catch {}
    const ref1 = ref(database, "liveDirty/dirty" + data.data.roomNumber);
    await set(ref1, {
      roomNumber: data.data.roomNumber,
      price: data.data.roomOriginalPrice,
      roomType: data.data.roomType,
    });
  }
};
