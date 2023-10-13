import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  feedback: [],
  isRefreshed: false,
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const isUserLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isUserLoggedIn) {
      setisLoggedIn(true);
    }
  }, []);

  const loginHandler = (token) => {
    sessionStorage.setItem("isLoggeIn", true);
    sessionStorage.setItem("token", token);
    setisLoggedIn(true);
  };

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
    setisLoggedIn(false);
  };

  const handleFeedback = (data) => {
    setFeedback([...data]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        feedback: feedback,
        handleFeedback: handleFeedback,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
