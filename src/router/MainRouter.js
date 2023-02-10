import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/main/Sidebar";
import * as TabPage from "../page/main";
import * as LowPage from "../page/secondary";
import { useState } from "react";
import { UserContext } from "../contexts/context";
const MainRouter = () => {
  const value = React.useContext(UserContext).admin;

  return (
    <div className="">
      <BrowserRouter basename="/">
        <div className="flex flex-row">
          <div className="w-60">
            <Sidebar />
          </div>
          <div className="flex-1 ">
            {value ? (
              <Routes>
                <Route path="/" element={<TabPage.Dashboard />} />
                <Route path="/menu" element={<TabPage.Menu />} />
                <Route path="/dashboard" element={<TabPage.Dashboard />} />
                <Route path="/room" element={<TabPage.Room />} />
                <Route path="/restaurant" element={<TabPage.Restaurant />} />
                <Route path="/kitchen" element={<TabPage.Kitchen />} />

                <Route
                  path="/housekeeping"
                  element={<TabPage.HouseKeeping />}
                />
                <Route path="/finance" element={<TabPage.Finance />} />
                <Route path="/employees" element={<TabPage.Employees />} />
                <Route path="/manageuser" element={<TabPage.ManageUser />} />
                <Route path="/history" element={<TabPage.History />} />
                <Route path="/setting" element={<TabPage.Setting />} />
                <Route path="/vendor" element={<TabPage.Vendor />} />
                <Route path="/dailyBook" element={<LowPage.DailyBook />} />
                <Route
                  path="/assetandexpenses"
                  element={<TabPage.AssetAndExpenses />}
                />
                <Route path="/vendor/info" element={<TabPage.VendorInfo />} />
                <Route
                  path="/vendor/info/bill"
                  element={<TabPage.BillPage />}
                />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<LowPage.Dashboard />} />
                <Route path="/menu" element={<LowPage.Menu />} />
                <Route path="/dashboard" element={<LowPage.Dashboard />} />
                <Route path="/room" element={<LowPage.Room />} />
                <Route path="/restaurant" element={<LowPage.Restaurant />} />
                <Route path="/finance" element={<LowPage.Finance />} />
                <Route path="/dailyBook" element={<LowPage.DailyBook />} />
                <Route
                  path="/stockmanagement"
                  element={<TabPage.StockManagement />}
                />
                <Route
                  path="/restaurant/checkout"
                  element={<LowPage.Checkout />}
                />
                <Route
                  path="/room/checkout"
                  element={<LowPage.CheckoutRoom />}
                />

                <Route
                  path="/housekeeping"
                  element={<LowPage.HouseKeeping />}
                />
                <Route path="/vendor" element={<TabPage.Vendor />} />
                <Route
                  path="/assetandexpenses"
                  element={<TabPage.AssetAndExpenses />}
                />
                <Route path="/vendor/info" element={<TabPage.VendorInfo />} />
                <Route
                  path="/vendor/info/bill"
                  element={<TabPage.BillPage />}
                />

                <Route path="/setting" element={<LowPage.Setting />} />
              </Routes>
            )}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
