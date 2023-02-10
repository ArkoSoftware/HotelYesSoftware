import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createNewAccount } from "./functions/function";
import { extreSmallFont, largeFont, mediumFont, smallFont } from "../../theme";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = () => {
    if (email != "" && password !== "") {
      createNewAccount(email, password);
    }
  };
  return (
    <div className="px-2 w-1/3">
      <div className=" py-5 px-10 bg-white rounded flex flex-col space-y-6">
        <p
          className="text-center font-bold text-4xl tracking-tight text-gray-800"
          style={{ fontSize: largeFont }}
        >
          Create New Account
        </p>
        <p
          className="text-center text-gray-400 my-3 text-sm"
          style={{ fontSize: smallFont }}
        >
          Enter with correct credentials
        </p>
        <div className="">
          <div className="flex flex-row">
            <p
              className=" tracking-tighter text-gray-600"
              style={{ fontSize: extreSmallFont }}
            >
              You Email
            </p>
            <p className="text-sm text-red-600 ml-1">*</p>
          </div>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id=""
            className="p-2 border border-gray-300 rounded mx-auto w-full"
            style={{ fontSize: smallFont }}
          />
        </div>
        <div className="">
          <div className="flex flex-row">
            <p
              className=" tracking-tighter text-gray-600"
              style={{ fontSize: extreSmallFont }}
            >
              You Password
            </p>
            <p className="text-sm text-red-600 ml-1">*</p>
          </div>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id=""
            className="p-2 border border-gray-300 rounded mx-auto w-full"
            style={{ fontSize: smallFont }}
          />
        </div>

        <button
          onClick={() => {
            submitForm();
          }}
          className="bg-[#632F56] p-3 rounded-lg"
        >
          <p className="text-white" style={{ fontSize: smallFont }}>
            Signup
          </p>
        </button>
        <div className=" border-t pt-3">
          <Link to="/">
            <button className="mx-auto w-full mb-10">
              <p style={{ fontSize: smallFont }}>Already Have an Account?</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
