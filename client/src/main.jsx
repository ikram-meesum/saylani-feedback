import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
// import StudentForm from "./pages/Form.jsx";
import Comment from "./pages/Comment.jsx";
import Dashboard from "./pages/Dashboard/Home.jsx";
import RegisterStudent from "./pages/Dashboard/RegisterStudent.jsx";
import StudentFeedback from "./pages/Dashboard/StudentFeedback.jsx";
import Teacher from "./pages/Dashboard/Teacher.jsx";
import AllStudent from "./pages/Dashboard/AllStudent.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Ranking from "./pages/Dashboard/Ranking.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/comment/:id/:tid",
    element: <Comment />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/register-student",
    element: <RegisterStudent />,
  },
  {
    path: "/dashboard/student-feedback",
    element: <StudentFeedback />,
  },
  {
    path: "/dashboard/teacher",
    element: <Teacher />,
  },
  {
    path: "/dashboard/student",
    element: <AllStudent />,
  },
  {
    path: "/dashboard/rank",
    element: <Ranking />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
