import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { URL, emailRegex, passwordRegex } from "../../assets/config";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { toast } from "react-toastify";
import "./AuthComponent.css";

const AuthComponent = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const mode = searchParams.get("mode") || "login";
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const emailHandler = () => {
    setIsValidEmail(emailRegex.test(emailRef.current.value));
  };

  const passwordHandler = () => {
    setIsValidPassword(passwordRegex.test(passwordRef.current.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const obj = {
      username: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const resData = await axios.post(`${URL}/api/user/${mode}`, obj);
      toast.success(resData.data.message);
      if (mode === "login") {
        const token = resData.data.token;
        setTimeout(() => {
          ctx.onLogin(token);
        }, 0);
      }
      navigate("/");
    } catch (e) {
      toast.error(e?.response?.data?.error || e?.message);
    }
  };

  return (
    <form className="form-div" onSubmit={handleSubmit}>
      <div className="field-wrapper header">
        <h2>{mode === "signup" ? "Sign up" : "Login"}</h2>
      </div>
      <div className="field-wrapper">
        <label htmlFor="email">Username/Email</label>
        <input
          id="email"
          name="input-email"
          ref={emailRef}
          onChange={emailHandler}
          type="text"
          required
          s
        ></input>
        {!isValidEmail && (
          <span className="error-spn">Please enter a valid email</span>
        )}
      </div>
      <div className="field-wrapper">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="input-password"
          ref={passwordRef}
          onChange={passwordHandler}
          type="password"
          required
        ></input>
        <p className="info">
          {" "}
          Password should include 8 to 15 characters which contain at least one
          lowercase letter, one uppercase letter, one numeric digit, and one
          special character
        </p>
        {!isValidPassword && (
          <span className="error-spn">Please enter a valid password</span>
        )}
      </div>
      <div className="field-wrapper btn">
        <button
          disabled={
            !isValidEmail ||
            !isValidPassword ||
            !emailRef.current?.value ||
            !passwordRef.current?.value
          }
          className="submit-btn"
          type="submit"
        >
          Submit
        </button>
        <span className="auth-text">
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Register/Sign up" : "Login"}
          </Link>
        </span>
      </div>
    </form>
  );
};

export default AuthComponent;
