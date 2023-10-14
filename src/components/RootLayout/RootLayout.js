import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainNavigation from "../MainNavigation/MainNavigation";
import "./RootLayout.css";

const RootLayout = () => {
  return (
    <div className="root-div">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
      <header>
        <MainNavigation />
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
