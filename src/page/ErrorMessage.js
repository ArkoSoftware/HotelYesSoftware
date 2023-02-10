import React from "react";

const ErrorMessage = ({ show, message }) => {
  return (
    <>
      {show ? (
        <div className="bg-red-500 rounded p-3">
          <p className="text-white text-sm text-center">{message}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorMessage;
