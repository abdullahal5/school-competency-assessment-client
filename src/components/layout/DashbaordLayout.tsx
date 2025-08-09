import { useState } from "react";
import {
  Button,
  Layout,
  Menu,
  theme,
  Avatar,
  Typography,
  Space,
  Spin,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { useGetMeQuery } from "../../redux/features/user/userApi";
import { removeFromLocalStorage } from "../../utils/local-storage";
import { baseApi } from "../../redux/api/baseApi";
import { toast } from "sonner";
import { getMenuItemsByRole } from "../../constant/sidebarItem.constant";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { data: getMyProfile, isLoading: isProfileLoading } =
    useGetMeQuery(undefined);

  if (isProfileLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  const user = getMyProfile?.data;
  const items = getMenuItemsByRole(user);

  const handleLogout = () => {
    dispatch(logout());
    removeFromLocalStorage("auth_key");
    dispatch(baseApi.util.resetApiState());
    toast.success("User logged out");
  };

  const sidebarBg = "#1a3a3f";
  const sidebarTextColor = "#e0f2f1";
  const sidebarHighlight = "#2AA09B";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{ background: sidebarBg, color: sidebarTextColor }}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div className="demo-logo-vertical" style={{ padding: "16px" }}>
          <Space direction="vertical" size={4} style={{ width: "100%" }}>
            <Space align="center" size="middle" style={{ width: "100%" }}>
              <Avatar
                size="large"
                style={{ backgroundColor: sidebarHighlight }}
                icon={<UserOutlined />}
              />
              {!collapsed && (
                <Text
                  strong
                  style={{ color: sidebarTextColor, fontSize: "16px" }}
                >
                  Test_School
                </Text>
              )}
            </Space>
            {!collapsed && user && (
              <Text
                style={{
                  color: sidebarTextColor,
                  fontSize: "14px",
                  opacity: 0.75,
                  paddingLeft: "40px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
                title={`${user.name} (${user.role})`}
              >
                {user.name} ({user.role})
              </Text>
            )}
          </Space>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            background: sidebarBg,
            color: sidebarTextColor,
            borderRight: 0,
          }}
          items={items}
        />

        <div
          style={{
            padding: "16px",
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              color: sidebarTextColor,
              width: "100%",
              textAlign: "left",
              height: "48px",
            }}
          >
            {!collapsed && "Logout"}
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <div style={{ paddingRight: "24px" }}>
            <Avatar
              style={{ backgroundColor: "#2AA09B", cursor: "pointer" }}
              icon={<UserOutlined />}
            />
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: "8px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
