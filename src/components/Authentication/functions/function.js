import { auth } from "../../../config/adminFirebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const createNewAccount = async (email, password) => {
  // await createUserWithEmailAndPassword(auth, email, password);
  //sendEmailVerification(auth.currentUser);
  signOut(auth);
};
export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const signOutFromAccount = () => {
  signOut(auth);
};
