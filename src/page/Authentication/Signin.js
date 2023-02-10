import React from "react";
import { Header, LoginForm } from "../../components";
const Signin = () => {
  return (
    <div className="bg-gradient-to-b from-[#423561] to-[#632F56] h-screen flex flex-col">
      <Header />
      <div className="flex flex-row my-auto justify-center items-center ">
        <LoginForm />
      </div>
    </div>
  );
};

export default Signin;
