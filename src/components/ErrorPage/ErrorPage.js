import React from "react";
import "./ErrorPage.css";

const ErrorPage = ({ message }) => {
  return (
    <div>
      <h1 className="heading-3">{message}</h1>
    </div>
  );
};

export default ErrorPage;
