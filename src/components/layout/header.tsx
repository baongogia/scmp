"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Dropdown,
  Menu,
  Avatar,
  Space,
  Typography,
  Drawer,
} from "antd";
import {
  MdPerson,
  MdSettings,
  MdLogout,
  MdNotifications,
  MdMenu,
  MdHome,
  MdBook,
  MdInfo,
  MdPhone,
} from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

const { Text } = Typography;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Hide header on instructor pages to avoid double sidebar
  const isInstructorPage = pathname?.startsWith("/instructor");

  if (isInstructorPage) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigation = [
    { name: "Trang chủ", href: "/", icon: <MdHome /> },
    { name: "Khóa học", href: "/courses", icon: <MdBook /> },
    { name: "Về chúng tôi", href: "/about", icon: <MdInfo /> },
    { name: "Liên hệ", href: "/contact", icon: <MdPhone /> },
  ];

  const userMenuItems = [
    {
      key: "dashboard",
      icon: <MdPerson />,
      label: <Link href="/instructor/dashboard">Dashboard</Link>,
    },
    {
      key: "settings",
      icon: <MdSettings />,
      label: <Link href="/settings">Cài đặt</Link>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <MdLogout />,
      label: "Đăng xuất",
      onClick: handleSignOut,
    },
  ];

  const mobileMenuItems = [
    ...navigation.map((item) => ({
      key: item.href,
      icon: item.icon,
      label: (
        <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
          {item.name}
        </Link>
      ),
    })),
    ...(isAuthenticated
      ? [
          { type: "divider" as const },
          {
            key: "dashboard",
            icon: <MdPerson />,
            label: (
              <Link
                href="/instructor/dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ),
          },
          {
            key: "settings",
            icon: <MdSettings />,
            label: (
              <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                Cài đặt
              </Link>
            ),
          },
          {
            key: "logout",
            icon: <MdLogout />,
            label: "Đăng xuất",
            onClick: () => {
              handleSignOut();
              setIsMenuOpen(false);
            },
          },
        ]
      : [
          { type: "divider" as const },
          {
            key: "login",
            icon: <MdPerson />,
            label: (
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                Đăng nhập
              </Link>
            ),
          },
          {
            key: "register",
            icon: <MdPerson />,
            label: (
              <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                Đăng ký
              </Link>
            ),
          },
        ]),
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Swim Course
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 font-medium"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Space size="middle">
                <Button type="text" icon={<MdNotifications />} size="large" />

                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  arrow
                >
                  <Button
                    type="text"
                    className="flex items-center space-x-2 h-auto p-2"
                  >
                    <Avatar
                      size="small"
                      src={user?.featured_image?.path}
                      className="bg-gray-300"
                    >
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Text className="text-sm font-medium">
                      {user?.username || "Huấn luyện viên"}
                    </Text>
                  </Button>
                </Dropdown>
              </Space>
            ) : (
              <Button
                type="primary"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                size="large"
                style={{ borderRadius: "12px", fontWeight: "600" }}
              >
                <Link href="/auth/login" className="text-white">
                  Đăng nhập
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button - hide on laptop/desktop */}
          <div className="sm:hidden">
            <Button
              type="text"
              icon={<MdMenu />}
              size="large"
              onClick={() => setIsMenuOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-lg">Swim Course</span>
          </div>
        }
        placement="right"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
        width={280}
      >
        {isAuthenticated && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar
                size="large"
                src={user?.featured_image?.path}
                className="bg-gray-300"
              >
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <div>
                <Text className="font-medium block">
                  {user?.username || "Huấn luyện viên"}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {user?.email || "swim@example.com"}
                </Text>
              </div>
            </div>
          </div>
        )}

        <Menu mode="vertical" items={mobileMenuItems} className="border-none" />
      </Drawer>
    </header>
  );
}
