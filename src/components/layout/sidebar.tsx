"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Menu, Button, Typography, Drawer, Avatar } from "antd";
import {
  MdDashboard,
  MdPerson,
  MdBook,
  MdCalendarToday,
  MdSettings,
  MdBarChart,
  MdNotifications,
  MdGroup,
  MdAttachMoney,
  MdMenu,
  MdLogout,
} from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  userRole: "INSTRUCTOR";
}

export function Sidebar({ userRole }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    {
      key: "/instructor/dashboard",
      icon: <MdDashboard />,
      label: <Link href="/instructor/dashboard">Dashboard</Link>,
    },
    {
      key: "/instructor/students",
      icon: <MdPerson />,
      label: <Link href="/instructor/students">Học viên</Link>,
    },
    {
      key: "/instructor/courses",
      icon: <MdBook />,
      label: <Link href="/instructor/courses">Khóa học</Link>,
    },
    {
      key: "/instructor/schedule",
      icon: <MdCalendarToday />,
      label: <Link href="/instructor/schedule">Lịch dạy</Link>,
    },
    {
      key: "/instructor/attendance",
      icon: <MdGroup />,
      label: <Link href="/instructor/attendance">Điểm danh</Link>,
    },
    // {
    //   key: "/instructor/earnings",
    //   icon: <MdAttachMoney />,
    //   label: <Link href="/instructor/earnings">Thu nhập</Link>,
    // },
    {
      key: "/instructor/reports",
      icon: <MdBarChart />,
      label: <Link href="/instructor/reports">Báo cáo</Link>,
    },
    {
      key: "/instructor/notifications",
      icon: <MdNotifications />,
      label: <Link href="/instructor/notifications">Thông báo</Link>,
    },
    {
      key: "/instructor/settings",
      icon: <MdSettings />,
      label: <Link href="/instructor/settings">Cài đặt</Link>,
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <MdLogout />,
      label: "Đăng xuất",
      onClick: async () => {
        await logout();
      },
    },
  ];

  // Mobile menu button - only show on instructor pages
  const MobileMenuButton = () =>
    isMobile ? (
      <Button
        type="text"
        icon={<MdMenu />}
        onClick={() => setMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-[1001] bg-white shadow-md rounded-lg"
        size="large"
      />
    ) : null;

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <Sider
      collapsible
      collapsed={isCollapsed}
      onCollapse={setIsCollapsed}
      width={250}
      collapsedWidth={80}
      className="bg-white border-r border-gray-200 shadow-lg hidden lg:block"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-center">
            {!isCollapsed ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <Text strong className="text-lg text-gray-900">
                  Swim Course
                </Text>
              </div>
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SC</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            className="border-0"
            style={{ height: "100%" }}
          />
        </div>
        <div className="bg-gray-50 p-4">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } gap-1.5`}
          >
            <Avatar
              size={isCollapsed ? "large" : "small"}
              src={user?.featured_image?.path}
              className="bg-gray-300"
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </Avatar>
            <Text
              className={`${
                isCollapsed ? "hidden" : ""
              } text-sm font-medium text-gray-900`}
            >
              {user?.username || "Huấn luyện viên"}
            </Text>
          </div>
        </div>
      </div>
    </Sider>
  );

  // Mobile Drawer
  const MobileDrawer = () => (
    <Drawer
      title={
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SC</span>
          </div>
          <Text strong className="text-lg text-gray-900">
            Swim Course
          </Text>
        </div>
      }
      placement="left"
      onClose={() => setMobileMenuOpen(false)}
      open={mobileMenuOpen}
      width={280}
      className="lg:hidden"
    >
      <Menu
        mode="vertical"
        selectedKeys={[pathname]}
        items={menuItems.map((item) => ({
          ...item,
          label:
            typeof item.label === "string" ? (
              item.label
            ) : (
              <div onClick={() => setMobileMenuOpen(false)}>{item.label}</div>
            ),
          onClick:
            item.key === "logout"
              ? async () => {
                  setMobileMenuOpen(false);
                  await logout();
                }
              : item.onClick,
        }))}
        className="border-0"
      />
    </Drawer>
  );

  return (
    <>
      <MobileMenuButton />
      <DesktopSidebar />
      {isMobile && <MobileDrawer />}
    </>
  );
}
