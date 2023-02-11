import { auth } from "../../../config/adminFirebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";


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
