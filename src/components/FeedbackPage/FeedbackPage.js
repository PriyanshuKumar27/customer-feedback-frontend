import React, { useRef, useState } from "react";
import axios from "axios";
import { URL, emailRegex } from "../../assets/config";
import { useNavigate } from "react-router-dom";
import "./FeedbackPage.css";

const FeedbackPage = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const companyRef = useRef();
  const commentRef = useRef();

  const [isValidName, setIsValidName] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidCompany, setIsValidCompany] = useState(true);
  const [isValidComment, setIsValidComment] = useState(true);

  const nameHandler = () => {
    setIsValidName(nameRef.current.value.trim().length > 0);
  };
  const emailHandler = () => {
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };
  const companyHandler = () => {
    setIsValidCompany(companyRef.current.value.trim().length > 0);
  };
  const commentHanler = () => {
    setIsValidComment(commentRef.current.value.trim().length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      company: companyRef.current.value,
      comments: commentRef.current.value,
    };

    const resData = await axios.post(`${URL}/api/feedback/create`, obj);
    navigate("/");
  };

  return (
    <form className="form-div" onSubmit={handleSubmit}>
      <div className="field-wrapper header">
        <h2>Feedback Form</h2>
      </div>
      <div className="field-wrapper">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="input-name"
          type="text"
          ref={nameRef}
          required
          onChange={nameHandler}
        ></input>
        {!isValidName && (
          <span className="error-spn">Name field can't be empty</span>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="input-email"
          type="email"
          ref={emailRef}
          onChange={emailHandler}
          required
        ></input>
        {!isValidEmail && (
          <span className="error-spn">Please enter a valid email</span>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="input-company"
          type="text"
          ref={companyRef}
          onChange={companyHandler}
          required
        ></input>
        {!isValidCompany && (
          <span className="error-spn">Company field can't be empty</span>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          name="form-comment"
          ref={commentRef}
          onChange={commentHanler}
          required
        />
        {!isValidComment && (
          <span className="error-spn">Comment field can't be empty</span>
        )}
      </div>
      <div className="field-wrapper">
        <button
          disabled={
            !isValidName ||
            !isValidEmail ||
            !isValidComment ||
            !isValidCompany ||
            !emailRef.current?.value ||
            !nameRef.current?.value ||
            !companyRef.current?.value ||
            !commentRef.current?.value
          }
          className="submit-btn"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FeedbackPage;
