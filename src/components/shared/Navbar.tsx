"use client";

import { useState, useEffect } from "react";
import { Button, Drawer, Menu, Avatar, Skeleton, Dropdown } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  LoginOutlined,
  BookOutlined,
  TrophyOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { removeFromLocalStorage } from "../../utils/local-storage";
import { toast } from "sonner";
import { baseApi } from "../../redux/api/baseApi";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const {
    data: getMyProfile,
    isLoading: isProfileLoading,
    refetch,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });

  const user = getMyProfile?.data;
  const isAuthenticated = !!token && !!user;
  const isLoadingAuth = token && !user && !isProfileLoading;

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const menuItems = [
    {
      key: "assessments",
      label: "Assessments",
      icon: <BookOutlined />,
    },
    {
      key: "certifications",
      label: "Certifications",
      icon: <TrophyOutlined />,
    },
    {
      key: "help",
      label: "Help",
      icon: <QuestionCircleOutlined />,
    },
    {
      key: "contact",
      label: "Contact",
      icon: <PhoneOutlined />,
    },
  ];

  const handleLogout = () => {
    setIsLoggingOut(true);
    try {
      dispatch(logout());
      removeFromLocalStorage("auth_key");
      dispatch(baseApi.util.resetApiState());
      toast.success("User logged out");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const userMenuItems = [
    {
      key: "dashboard",
      label: (
        <Link to={`${user?.role}/dashboard`}>
          <div className="flex items-center gap-2">
            <DashboardOutlined />
            <span>Dashboard</span>
          </div>
        </Link>
      ),
      disabled: isLoggingOut,
    },
    {
      key: "logout",
      label: (
        <div
          onClick={!isLoggingOut ? handleLogout : undefined}
          className="flex items-center gap-2"
          style={{ color: "red" }}
        >
          <LogoutOutlined />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </div>
      ),
      disabled: isLoggingOut,
    },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#30B2AD]">Test_School</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href="#"
                  className="text-gray-700 hover:text-[#30B2AD] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  {item.icon}
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons or User Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoadingAuth ? (
              <Skeleton.Avatar active size="large" />
            ) : isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                  <Avatar size="large" icon={<UserOutlined />} />
                </div>
              </Dropdown>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    type="text"
                    icon={<LoginOutlined />}
                    className="text-gray-700 hover:text-[#30B2AD] border-0"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    className="bg-[#30B2AD] border-[#30B2AD] hover:bg-[#26a69a]"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        title={
          <div className="text-2xl font-bold text-[#30B2AD]">Test_School</div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        bodyStyle={{ padding: 0 }}
      >
        <div className="flex flex-col h-full">
          <Menu
            mode="vertical"
            items={menuItems}
            className="border-0 flex-1"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="p-4 border-t border-gray-100 space-y-3">
            {isLoadingAuth ? (
              <Skeleton.Avatar active size="large" />
            ) : isAuthenticated ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="topRight"
                arrow
              >
                <div className="flex items-center space-x-3 px-4 py-2 cursor-pointer">
                  <Avatar size="large" icon={<UserOutlined />} />
                  <span className="font-medium">
                    {user?.name || user?.email}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    type="text"
                    icon={<LoginOutlined />}
                    className="w-full text-left justify-start text-gray-700 hover:text-[#30B2AD] border-0"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    type="primary"
                    icon={<UserOutlined />}
                    className="w-full bg-[#30B2AD] border-[#30B2AD] hover:bg-[#26a69a]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
}
