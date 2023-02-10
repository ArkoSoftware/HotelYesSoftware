import { addDoc, collection, doc } from "firebase/firestore/lite";
import { auth, db } from "../../../../../config/adminFirebase";
import { async } from "@firebase/util";
export const addCategory = async function (category) {
  const doc1 = collection(db, "menuCategory");
  const snap = await addDoc(doc1, {
    category,
    user: auth.currentUser.uid,
    email: auth.currentUser.email,
  }).then(() => {
    return true;
  });
};

export const addMenu = async function (foodName, category, infoList, price) {
  const doc1 = collection(db, "menu");
  const snap = await addDoc(doc1, {
    foodName,
    category,
    price,
    list: JSON.stringify(infoList),
  });

  return true;
};
