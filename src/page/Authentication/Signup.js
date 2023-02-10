import React from "react";
import SignupForm from "../../components/Authentication/SignupForm";
import { Header } from "../../components";

const Signup = () => {
  return (
    <div className="bg-gradient-to-b from-[#423561] to-[#632F56] h-screen flex flex-col">
      <Header />
      <div className="flex flex-row my-auto justify-center items-center ">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
