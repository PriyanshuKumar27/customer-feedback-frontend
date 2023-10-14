import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import HomePage from "./components/HomePage/HomePage";
import FeedbackPage from "./components/FeedbackPage/FeedbackPage";
import AuthenticationPage from "./components/Authentication/AuthenticationPage";
import ViewFeedbackPage from "./components/ViewFeedbackPage/ViewFeedbackPage";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage message={"Error! Not found"} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "feedback", element: <FeedbackPage /> },
      { path: "auth", element: <AuthenticationPage /> },
      { path: "view", element: <ViewFeedbackPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
