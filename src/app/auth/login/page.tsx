"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form, Input, Button, Card, Alert, Typography, Space } from "antd";
import {
  MdPerson,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccess, showError } from "@/hooks/useNotifications";
import { getCookie } from "@/utils/client/getCookie";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading } = useAuth();

  // Check for success message from registration
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
      showSuccess(message, "Đăng ký thành công");
    }
  }, [searchParams]);

  // Check if already authenticated
  useEffect(() => {
    const token = getCookie("token");
    const user = localStorage.getItem("swim_user");

    if (token && user) {
      const redirectTo =
        searchParams.get("redirect") || "/instructor/dashboard";
      router.push(redirectTo);
    }
  }, [router, searchParams]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError("");

    try {
      const result = await login(values.email, values.password);

      if (result.success) {
        showSuccess(result.message || "Đăng nhập thành công");
        setIsRedirecting(true);

        // Force redirect after successful login
        setTimeout(() => {
          const redirectTo =
            searchParams.get("redirect") || "/instructor/dashboard";
          // Try router.push first, fallback to window.location
          try {
            router.push(redirectTo);
          } catch {
            window.location.href = redirectTo;
          }
        }, 1500);
      } else {
        const errorMsg = result.message || "Đăng nhập thất bại";
        setError(errorMsg);
        showError(errorMsg, "Đăng nhập thất bại");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMsg = "Có lỗi xảy ra khi đăng nhập";
      setError(errorMsg);
      showError(errorMsg, "Lỗi hệ thống");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e40af' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-600 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-800 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-700 rounded-full opacity-10 animate-pulse delay-2000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-3 mb-8 group"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl">SC</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">
              Swim Course
            </span>
          </Link>

          <div className="mb-6">
            <Title
              level={1}
              className="text-gray-900 mb-3 font-bold"
              style={{ fontSize: "2rem" }}
            >
              Chào mừng trở lại
            </Title>
            <Text className="text-lg text-gray-600">
              Đăng nhập để tiếp tục quản lý khóa học của bạn
            </Text>
          </div>
        </div>

        {/* Login Form */}
        <Card
          className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm"
          style={{ borderRadius: "24px" }}
        >
          <div className="text-center mb-8">
            <Title level={3} className="text-gray-900 mb-2 font-bold">
              Đăng nhập tài khoản
            </Title>
            <Text className="text-gray-600">
              Nhập thông tin đăng nhập để truy cập hệ thống
            </Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            {successMessage && (
              <Alert
                message={successMessage}
                type="success"
                className="mb-4"
                showIcon
              />
            )}

            {isRedirecting && (
              <Alert
                message="Đăng nhập thành công! Đang chuyển hướng đến dashboard..."
                type="success"
                className="mb-4"
                showIcon
              />
            )}

            {error && (
              <Alert message={error} type="error" className="mb-4" showIcon />
            )}

            <Form.Item
              name="email"
              label={<span className="text-gray-700 font-semibold">Email</span>}
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                prefix={<MdPerson className="text-blue-600" />}
                placeholder="Nhập email của bạn"
                disabled={isLoading}
                className="h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500"
                style={{ fontSize: "16px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="text-gray-700 font-semibold">Mật khẩu</span>
              }
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<MdLock className="text-blue-600" />}
                placeholder="Nhập mật khẩu"
                disabled={isLoading}
                className="h-12 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500"
                style={{ fontSize: "16px" }}
                iconRender={(visible) =>
                  visible ? (
                    <MdVisibility className="text-blue-600" />
                  ) : (
                    <MdVisibilityOff className="text-blue-600" />
                  )
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading || isRedirecting}
                disabled={isRedirecting}
                className="w-full bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  height: "56px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "16px",
                }}
              >
                {isRedirecting
                  ? "Đang chuyển hướng..."
                  : isLoading
                  ? "Đang đăng nhập..."
                  : "Đăng nhập"}
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center pt-6 border-t border-gray-200 space-y-4">
            <Text className="text-gray-600 text-lg">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Đăng ký ngay
              </Link>
            </Text>

            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <Link
                href="/auth/demo"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Xem demo
              </Link>
              <span>•</span>
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
