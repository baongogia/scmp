"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layout, Row, Col, Typography, Button, Input } from "antd";
import {
  MdFacebook,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdSend,
  MdAccessTime,
  MdSecurity,
  MdSupport,
} from "react-icons/md";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Hide footer on instructor pages to avoid layout conflicts
  const isInstructorPage = pathname?.startsWith("/instructor");

  if (isInstructorPage) {
    return null;
  }

  const footerLinks = {
    company: [
      { name: "Về chúng tôi", href: "/about" },
      { name: "Đội ngũ", href: "/team" },
      { name: "Tin tức", href: "/news" },
      { name: "Tuyển dụng", href: "/careers" },
    ],
    services: [
      { name: "Khóa học bơi cơ bản", href: "/courses/basic" },
      { name: "Khóa học bơi nâng cao", href: "/courses/advanced" },
      { name: "Huấn luyện cá nhân", href: "/courses/private" },
      { name: "Khóa học cho trẻ em", href: "/courses/kids" },
    ],
    support: [
      { name: "Trung tâm trợ giúp", href: "/help" },
      { name: "Liên hệ hỗ trợ", href: "/contact" },
      { name: "Chính sách bảo mật", href: "/privacy" },
      { name: "Điều khoản sử dụng", href: "/terms" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: <MdFacebook />,
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      href: "#",
      color: "hover:text-red-500",
    },
  ];

  return (
    <AntFooter
      className="bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 text-gray-800 relative overflow-hidden"
      style={{
        padding: "0",
        minHeight: "500px",
        height: "auto",
        display: "block",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="py-8 border-b border-gray-300 mb-8">
          <Row justify="center" align="middle">
            <Col xs={24} lg={16} className="text-center">
              <Title level={2} className="text-gray-800 mb-4 font-bold">
                Đăng ký nhận tin tức mới nhất
              </Title>
              <Text className="text-gray-600 text-lg mb-8 block">
                Nhận thông tin về các khóa học mới, tips bơi lội và ưu đãi đặc
                biệt
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Nhập email của bạn"
                  size="large"
                  className="flex-1 rounded-xl border-gray-300 bg-white text-gray-800 placeholder-gray-500"
                  style={{ height: "48px" }}
                />
                <Button
                  type="primary"
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-xl text-white"
                  style={{ height: "48px", minWidth: "120px" }}
                >
                  <MdSend className="mr-2" />
                  Đăng ký
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">SC</span>
                </div>
                <Title level={3} className="text-gray-800 mb-0 font-bold">
                  Swim Course
                </Title>
              </div>
              <Text className="text-gray-600 mb-4 block leading-relaxed">
                Hệ thống quản lý khóa học bơi chuyên nghiệp, kết nối học viên
                với các huấn luyện viên chất lượng cao. Nền tảng hiện đại nhất
                cho việc quản lý và phát triển kỹ năng bơi lội.
              </Text>
            </div>
          </Col>

          {/* Company Links */}
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-4 font-bold">
                Công ty
              </Title>
              <div className="space-y-3">
                {footerLinks.company.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 block text-sm font-medium hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </Col>

          {/* Services Links */}
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-4 font-bold">
                Dịch vụ
              </Title>
              <div className="space-y-3">
                {footerLinks.services.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 block text-sm font-medium hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </Col>

          {/* Support & Contact */}
          <Col xs={24} sm={12} lg={6}>
            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-4 font-bold">
                Hỗ trợ & Liên hệ
              </Title>
              <div className="space-y-2 mb-4">
                {footerLinks.support.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 block text-sm font-medium hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </AntFooter>
  );
}
