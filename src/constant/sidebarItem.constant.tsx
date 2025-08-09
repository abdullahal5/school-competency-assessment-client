import {
  DashboardOutlined,
  FileOutlined,
  QuestionOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

type User = {
  role?: "admin" | "supervisor" | "student";
};

export const getMenuItemsByRole = (user?: User | null): MenuProps["items"] => {
  const menuItemsByRole: Record<string, MenuProps["items"]> = {
    admin: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>,
        style: { marginBottom: "8px" },
      },
      {
        key: "2",
        icon: <QuestionOutlined />,
        label: <Link to={`/${user?.role}/dashboard/questions`}>Questions</Link>,
        style: { marginBottom: "8px" },
      },
    ],
    supervisor: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">Dashboard</Link>,
        style: { marginBottom: "8px" },
      },
      {
        key: "2",
        icon: <FileOutlined />,
        label: <Link to="/courses">Courses</Link>,
        style: { marginBottom: "8px" },
      },
      {
        key: "3",
        icon: <TeamOutlined />,
        label: <Link to="/students">Students</Link>,
        style: { marginBottom: "8px" },
      },
    ],
    student: [
      {
        key: "1",
        icon: <DashboardOutlined />,
        label: <Link to="/dashboard">Dashboard</Link>,
        style: { marginBottom: "8px" },
      },
      {
        key: "2",
        icon: <FileOutlined />,
        label: <Link to="/courses">Courses</Link>,
        style: { marginBottom: "8px" },
      },
    ],
  };

  const role = user?.role || "student";
  return menuItemsByRole[role] || menuItemsByRole["student"];
};
