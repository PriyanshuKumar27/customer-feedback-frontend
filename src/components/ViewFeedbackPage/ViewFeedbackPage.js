import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { URL } from "../../assets/config";
import { failure, load, success } from "../../actions/actions";
import { initialState } from "../../actions/initialState";
import { reducer } from "../../actions/reducer";
import CommentCard from "../CommentCard/CommentCard";
import LoadingScreen from "../LoaderComponent/LoadingScreen";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./ViewFeedbackPage.css";
import { toast } from "react-toastify";

const ViewFeedbackPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();
  if (!ctx.isLoggedIn) {
    navigate("/");
  }

  useEffect(() => {
    dispatch(load());
    axios
      .get(`${URL}/api/feedback`)
      .then((response) => {
        toast.success("Sucessfully fetched feedbacks");
        dispatch(success());
        ctx.handleFeedback(response.data);
      })
      .catch((e) => {
        toast.error("Error fetching feedback");
        dispatch(failure());
      });
  }, []);

  return (
    <>
      {state.isLoading && <LoadingScreen />}
      {state.isError && <ErrorPage message={"No data found!"} />}
      {!state.isLoading && !state.isError && (
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
