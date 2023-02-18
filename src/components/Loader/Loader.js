import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center py-2">
      <RotatingLines
        strokeColor="#4fa94d"
        strokeWidth="5"
        animationDuration="0.75"
        width="46"
        visible={true}
      />
    </div>
  );
};

export default Loader;
