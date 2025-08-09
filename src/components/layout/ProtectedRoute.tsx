import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

type TDecodedUser = {
  role: string;
  id: string;
  email: string;
} & { [key: string]: unknown };

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const { token } = useAppSelector((state) => state.auth);

  let user: TDecodedUser | null = null;

  if (token) {
    user = jwtDecode(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
