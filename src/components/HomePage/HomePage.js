import React, { useContext } from "react";
import "./HomePage.css";
import Card from "../Card/Card";
import AuthContext from "../../store/auth-context";

const HomePage = () => {
  const ctx = useContext(AuthContext);
  const isLoggedIn = ctx.isLoggedIn;
  return (
    <div className="home-div">
      <h1 className="heading-1">
        Welcome to the Customer Feedback Application
      </h1>
      {isLoggedIn && <h3 className="heading-2">Administrator Section</h3>}
      <div className="home-card">
        {!isLoggedIn && <Card text="Submit Feedback" link="feedback" />}
        {!isLoggedIn && <Card text="Admin Login" link="/auth?mode=login" />}
        {isLoggedIn && <Card text="View Feedbacks" link="/view" />}
      </div>
    </div>
  );
};

export default HomePage;
