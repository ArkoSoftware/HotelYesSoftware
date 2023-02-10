import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../page/Authentication/Signin";
import Signup from "../page/Authentication/Signup";

const AuthRouter = () => {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AuthRouter;
