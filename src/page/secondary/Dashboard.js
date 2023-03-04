import React from "react";
import { useContext } from "react";
import { NavContext } from "../../contexts/NavProvider";
import { ThreeDots } from  'react-loader-spinner'

const Dashboard = () => {
  const { activeUser } = useContext(NavContext);
  return (
    <div className="w-4/5 md:w-1/2 mx-auto pt-16 md:pt-28 relative">
      <p className="absolute right-0 bg-sky-500 text-white py-2 px-5">
        {activeUser?.role ? activeUser.role :
        <ThreeDots 
        height="25" 
        width="48" 
        radius="9"
        color="#fff" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
         />}
      </p>
      <p className="border py-20 text-2xl md:text-3xl lg:text-4xl text-center font-bold text-slate-700 border-sky-500 shadow-md shadow-slate-500">
        Welcome
        <br />
        <em className="text-sky-500">To</em>
        <br />
        Dashboard
      </p>
    </div>
  );
};

export default Dashboard;
