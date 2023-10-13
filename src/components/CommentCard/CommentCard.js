import React from "react";

const CommentCard = ({ name, email, company, comments }) => {
  return (
    <div className="comment-card">
      <div className="card-wrapper">
        <p>Name: </p>
        <p>{name}</p>
      </div>
      <div className="card-wrapper">
        <p>Email: </p>
        <p>{email}</p>
      </div>
      <div className="card-wrapper">
        <p>Company: </p>
        <p>{company}</p>
      </div>
      <div className="card-wrapper">
        <p>Comment: </p>
        <p>{comments}</p>
      </div>
    </div>
  );
};

export default CommentCard;
