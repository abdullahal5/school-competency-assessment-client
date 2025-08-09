import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import DashboardLayout from "../components/layout/DashbaordLayout";
import Home from "../pages/admin/Home";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Question from "../pages/admin/question/Question";
import Competency from "../pages/admin/competency/Competency";
import Test from "../pages/admin/test/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "questions",
        element: <Question />,
      },
      {
        path: "competency",
        element: <Competency />,
      },
      {
        path: "test-session",
        element: <Test />,
      },
    ],
  },
]);

export default router;
