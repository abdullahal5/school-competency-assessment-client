/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row, Divider, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import TCForm from "../components/form/TCForm";
import TCInput from "../components/form/TCInput";
import TCSelect from "../components/form/TCSelect";
import type { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { setToLocalStorage } from "../utils/local-storage";

const { Title } = Typography;

const roleCredentials: any = {
  admin: { email: "nowey44788@cotasen.com", password: "12345678" },
  supervisor: { email: "supervisor@example.com", password: "supervisor123" },
  student: { email: "student@example.com", password: "student123" },
};

const LoginFormFields = () => {
  const { control, setValue } = useFormContext();

  const role = useWatch({ control, name: "role" });

  useEffect(() => {
    if (role && roleCredentials[role]) {
      setValue("email", roleCredentials[role].email);
      setValue("password", roleCredentials[role].password);
    }
  }, [role, setValue]);

  return (
    <div className="space-y-4">
      <TCSelect
        name="role"
        label="Login As"
        options={[
          { value: "admin", label: "Admin" },
          { value: "supervisor", label: "Supervisor" },
          { value: "student", label: "Student" },
        ]}
      />
      <TCInput type="email" name="email" label="Email Address" />
      <TCInput type="password" name="password" label="Password" />
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const { email, password } = data;

    try {
      const payload = { email, password };
      const result = await login(payload).unwrap();

      if (result.statusCode === 200) {
        const decodedUser = jwtDecode<TUser>(result.data.accessToken);

        setToLocalStorage("auth_key", result.data.accessToken);

        dispatch(
          setUser({
            user: decodedUser,
            token: result.data.accessToken,
          })
        );

        toast.success("Login successful");
        navigate(`/${decodedUser.role}/dashboard`);
      }
    } catch {
      toast.error("Invalid credentials");
    }
  };

  const defaultRole = "admin";

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gradient-to-br from-[#26A69A]/10 to-[#26A69A]/30"
    >
      <div className="w-full bg-white max-w-md shadow-xl rounded-2xl overflow-hidden border-0">
        <div className="bg-[#26A69A] p-6 text-center">
          <Title level={2} className="!mb-0 !text-white">
            Welcome Back
          </Title>
          <p className="text-white/80 mt-1">Please login to your account</p>
        </div>

        <div className="p-8">
          <TCForm
            onSubmit={onSubmit}
            defaultValues={{
              role: defaultRole,
              email: roleCredentials[defaultRole].email,
              password: roleCredentials[defaultRole].password,
            }}
          >
            <LoginFormFields />

            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-6 h-12 rounded-lg font-semibold text-base hover:bg-[#1e8c7f]"
              style={{
                backgroundColor: "#26A69A",
                borderColor: "#26A69A",
                transition: "background-color 0.3s",
                opacity: loginLoading ? 0.6 : 1,
                cursor: loginLoading ? "not-allowed" : "pointer",
              }}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <>
                  <div className="text-white">
                    <LoadingOutlined spin style={{ marginRight: 8 }} />
                    Signing In...
                  </div>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <Divider className="my-6">or</Divider>

            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#26A69A] hover:underline">
                Register
              </Link>
            </div>
          </TCForm>
        </div>
      </div>
    </Row>
  );
};

export default Login;
