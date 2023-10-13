import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={() => {
        navigate(props.link);
      }}
    >
      <p>{props.text}</p>
    </div>
  );
};

export default Card;
