import React, { useContext } from "react";
import "./MainNavigation.css";
import { HomeIcon } from "../../assets/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const logoutHandler = () => {
    setTimeout(() => {
      ctx.onLogout();
    }, 0);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" alt="Home">
        <HomeIcon />
      </Link>
      <ul className="nav-links">
        <div className="menu">
          {!ctx.isLoggedIn ? (
            <Link to={`/auth/?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Sign up" : "Login"}
            </Link>
          ) : (
            <button className="logout" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default MainNavigation;
