import { useState } from "react";
import { Button, Row, Divider, Typography, Form, Input, Space } from "antd";
import { toast } from "sonner";
import TCForm from "../components/form/TCForm";
import TCInput from "../components/form/TCInput";
import type { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "../redux/features/auth/authApi";
import { useRegisterMutation } from "../redux/features/user/userApi";

const { Title } = Typography;

const Register = () => {
  const [isVerifyOtpFormOpen, setIsVerifyOtpFormOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState<string | null>(null);

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: isOtpVerifyLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();

  // Register form submit
  const onSubmit = async (data: FieldValues) => {
    try {
      const result = await register(data).unwrap();
      if (result.data?.userId) {
        setEmailForOtp(data.email);
        setIsVerifyOtpFormOpen(true);
        toast.success("Registration successful! Please verify OTP.");
      }
    } catch {
      toast.error("Registration failed", { duration: 2000 });
    }
  };

  // OTP form submit
  const onVerifyOtp = async (values: { otp: string }) => {
    if (!emailForOtp) return;
    try {
      await verifyOtp({ email: emailForOtp, otp: values.otp }).unwrap();
      toast.success("OTP verified successfully!");
      setIsVerifyOtpFormOpen(false);
      // Optionally navigate or reset form
    } catch {
      toast.error("OTP verification failed", { duration: 2000 });
    }
  };

  // Resend OTP handler
  const onResendOtp = async () => {
    if (!emailForOtp) return;
    try {
      await resendOtp({ email: emailForOtp }).unwrap();
      toast.success("OTP resent successfully!");
    } catch {
      toast.error("Failed to resend OTP", { duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      className="min-h-screen bg-gradient-to-br from-[#26A69A]/10 to-[#26A69A]/30"
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden border-0">
        <div className="bg-[#26A69A] p-6 text-center">
          <Title level={2} className="!mb-0 !text-white">
            {isVerifyOtpFormOpen ? "Verify OTP" : "Create Your Account"}
          </Title>
          <p className="text-white/80 mt-1">
            {isVerifyOtpFormOpen
              ? "Enter the 6-digit OTP sent to your email"
              : "Join us today"}
          </p>
        </div>

        <div className="p-8">
          {!isVerifyOtpFormOpen ? (
            <TCForm
              onSubmit={onSubmit}
              defaultValues={{
                name: "",
                email: "",
                password: "",
              }}
            >
              <div className="space-y-4">
                <TCInput
                  type="text"
                  name="name"
                  label="Full Name"
                  placeholder="Enter your full name"
                />

                <TCInput
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                />

                <TCInput
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter a password"
                />

                <div className="flex items-start mb-4">
                  <input type="checkbox" id="terms" className="mt-1 mr-2" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-[#26A69A]">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#26A69A]">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-2 h-12 rounded-lg font-semibold text-base hover:bg-[#1e8c7f]"
                style={{
                  backgroundColor: "#26A69A",
                  borderColor: "#26A69A",
                  transition: "background-color 0.3s",
                  opacity: isRegisterLoading ? 0.6 : 1,
                  cursor: isRegisterLoading ? "not-allowed" : "pointer",
                }}
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Registering..." : "Register Now"}
              </Button>

              <Divider className="my-6">or</Divider>

              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-[#26A69A] hover:underline">
                  Sign in
                </Link>
              </div>
            </TCForm>
          ) : (
            // OTP verification form
            <Form
              layout="vertical"
              onFinish={onVerifyOtp}
              requiredMark={false}
              className="space-y-6"
            >
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  { required: true, message: "Please enter the OTP" },
                  {
                    len: 6,
                    message: "OTP must be exactly 6 digits",
                  },
                  {
                    pattern: /^\d{6}$/,
                    message: "OTP must be numeric",
                  },
                ]}
              >
                <Input
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  size="large"
                  autoFocus
                />
              </Form.Item>

              <Space size="middle" className="w-full justify-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isOtpVerifyLoading}
                  className="flex-1"
                >
                  Verify OTP
                </Button>

                <Button
                  type="default"
                  onClick={onResendOtp}
                  loading={isResendOtpLoading}
                  className="flex-1"
                >
                  Resend OTP
                </Button>
              </Space>
            </Form>
          )}
        </div>
      </div>
    </Row>
  );
};

export default Register;
