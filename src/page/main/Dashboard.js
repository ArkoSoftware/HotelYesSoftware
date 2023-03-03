import React from "react";

const Dashboard = () => {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto pt-16 md:pt-28 relative">
      <p className="absolute right-0 bg-green-500 text-white py-2 px-5">Admin</p>
      <p className="border py-20 text-2xl md:text-3xl lg:text-4xl text-center font-bold text-slate-700 border-green-500 shadow-md shadow-slate-500">
        Welcome
        <br />
        <em className="text-green-500">To</em>
        <br />
        Dashboard
      </p>
    </div>
  );
};

export default Dashboard;
