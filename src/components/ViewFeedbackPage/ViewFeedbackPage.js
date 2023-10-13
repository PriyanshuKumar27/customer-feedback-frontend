import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { URL } from "../../assets/config";
import CommentCard from "../CommentCard/CommentCard";
import "./ViewFeedbackPage.css";
import LoadingScreen from "../LoaderComponent/LoadingScreen";

const ViewFeedbackPage = () => {
  const [loading, setIsloading] = useState(false);
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();
  if (!ctx.isLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    setIsloading(true);
    axios
      .get(`${URL}/api/feedback`)
      .then((response) => {
        ctx.handleFeedback(response.data);
      })
      .catch(() => {})
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <div className="comment-container">
          {ctx.feedback.map((ele, i) => {
            if (i % 2 === 0) {
              return (
                <div className="comment-div">
                  <CommentCard
                    key={ele.id}
                    name={ele.name}
                    email={ele.email}
                    company={ele.company}
                    comments={ele.comments}
                  />
                  {ctx.feedback[i + 1] && (
                    <CommentCard
                      key={ctx.feedback[i + 1].id}
                      name={ctx.feedback[i + 1].name}
                      email={ctx.feedback[i + 1].email}
                      company={ctx.feedback[i + 1].company}
                      comments={ctx.feedback[i + 1].comments}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

export default ViewFeedbackPage;
