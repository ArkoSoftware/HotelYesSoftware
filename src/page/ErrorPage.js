import React from "react";
import error from "../asset/error.jpg";

const ErrorPage = () => {
  return (
    <div>
      <img className="w-3/4 md:w-1/2 mx-auto mt-[10%]" src={error} alt="" />
    </div>
  );
};

export default ErrorPage;
