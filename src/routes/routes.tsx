import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/admin",
  //   element: (
  //     <ProtectedRoute role="admin">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(adminPaths),
  // },
  // {
  //   path: "/supervisor",
  //   element: (
  //     <ProtectedRoute role="supervisor">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(facultyPaths),
  // },
  // {
  //   path: "/student",
  //   element: (
  //     <ProtectedRoute role="student">
  //       <App />
  //     </ProtectedRoute>
  //   ),
  //   children: routeGenerator(studentPaths),
  // },
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
]);

export default router;
