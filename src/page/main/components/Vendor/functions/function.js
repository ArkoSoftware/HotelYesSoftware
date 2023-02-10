import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore/lite";
import { auth, db } from "../../../../../config/adminFirebase";

export const addVendor = async function (
  vendorName,
  vendorAddress,
  vendorCompany
) {
  const doc1 = collection(db, "vendorList");
  const snap = await addDoc(doc1, {
    vendorName: vendorName,
    vendorAddress: vendorAddress,
    vendorCompany: vendorCompany,
    uid: auth.currentUser.uid,
    user: auth.currentUser.email,
    time: serverTimestamp(),
  }).then(() => {
    return true;
  });
};
export const getVendorList = async function () {
  const doc1 = collection(db, "vendorList");
  const snap = await getDocs(doc1);
  const arr = [];
  snap.forEach((docs) => {
    arr.push([docs.id, docs.data()]);
  });
  return arr;
};
