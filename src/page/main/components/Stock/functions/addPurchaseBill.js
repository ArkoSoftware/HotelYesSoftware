import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "../../../../../config/adminFirebase";

export const addPurchaseBill = async function (
  billNumber,
  billDate,
  dueDate,
  billType,
  vendorName,
  invoiceNumber,
  listInfo,
  total
) {
  const doc1 = collection(db, "purchaseBill");
  const snap = await addDoc(doc1, {
    billNumber,
    billDate,
    dueDate,
    billType,
    vendorName,
    invoiceNumber,
    total,
    list: JSON.stringify(listInfo),
  });
  let localString = new Date(billDate).toLocaleDateString();
  let parts = localString.split("/");

  // pad the month and day with leading zeros if necessary
  let month = ("0" + parts[0]).slice(-2);
  let day = ("0" + parts[1]).slice(-2);
  let year = parts[2];

  var searchDate = `${year}-${month}-${day}`;
  const doc2 = collection(db, "dailyRecord", searchDate, "record");
  const snap2 = await addDoc(doc2, {
    billNumber,
    billDate,
    dueDate,
    billType,
    vendorName,
    invoiceNumber,
    total,
    list: JSON.stringify(listInfo),
  });
  for (let i = 0; i < listInfo.length; i++) {
    const doc2 = collection(db, "itemList");
    const q = query(doc2, where("itemName", "==", listInfo[i][0]));
    const snap2 = await getDocs(q);
    snap2.forEach(async (docs) => {
      const data = docs.id;
      const doc2 = doc(db, "itemList", data);
      const snap2 = await updateDoc(doc2, {
        quantity: increment(parseInt(listInfo[i][1])),
      });
    });
  }
  return true;
};
