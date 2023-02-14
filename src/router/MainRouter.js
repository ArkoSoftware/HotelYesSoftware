import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Sidebar from "../components/main/Sidebar";
import * as TabPage from "../page/main";
import * as LowPage from "../page/secondary";
import { UserContext } from "../contexts/context";
import Navbar from "../components/main/Navbar";
import { NavContext } from "../contexts/NavProvider";

const MainRouter = () => {
  const value = React.useContext(UserContext).admin;
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  return (
    <div className="">
      {/* <BrowserRouter basename="/"> */}
      <HashRouter basename="/">
        <Navbar />
        <div className={`drawer ${sideBarOn && "drawer-mobile"} `}>
          <input
            id="sidebar-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content z-50">
            {/* <!-- Page content here --> */}
            <div className="flex flex-row duration-500 relative h-full">
              {value ? (
                <Routes>
                  <Route path="/" element={<TabPage.Dashboard />} />
                  <Route
                    path="/hierarchymanagement"
                    element={<TabPage.HierarchyManagement />}
                  />
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
          <div className="drawer-side">
            <label
              htmlFor="sidebar-drawer"
              onClick={() => setSideBarOn(!sideBarOn)}
              className="drawer-overlay"
            ></label>
            <ul className="menu w-60 bg-transparent text-base-content">
              {/*  <!-- Sidebar content here --> */}
              <Sidebar />
            </ul>
          </div>
        </div>
      </HashRouter>
    </div>
  );
};

export default MainRouter;
