import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../MainNavigation/MainNavigation";
import "./RootLayout.css";

const RootLayout = () => {
  return (
    <div className="root-div">
      <header>
        <MainNavigation />
      </header>
      <Outlet />
    </div>
  );
};

export default RootLayout;
