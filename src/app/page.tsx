"use client";
import { Button, Card, Typography, Space, Row, Col } from "antd";
import {
  MdPerson,
  MdBook,
  MdCalendarToday,
  MdAttachMoney,
  MdArrowForward,
  MdPlayCircle,
  MdStar,
} from "react-icons/md";
import Link from "next/link";

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const features = [
    {
      icon: <MdPerson className="text-2xl" />,
      title: "Quản lý học viên",
      description:
        "Theo dõi thông tin, tiến độ học tập và điểm danh của học viên",
    },
    {
      icon: <MdBook className="text-2xl" />,
      title: "Quản lý khóa học",
      description: "Tạo và quản lý các khóa học bơi từ cơ bản đến nâng cao",
    },
    {
      icon: <MdCalendarToday className="text-2xl" />,
      title: "Lịch dạy thông minh",
      description: "Sắp xếp lịch dạy linh hoạt và nhắc nhở tự động",
    },
    {
      icon: <MdAttachMoney className="text-2xl" />,
      title: "Theo dõi thu nhập",
      description: "Quản lý thanh toán và theo dõi thu nhập chi tiết",
    },
  ];

  const stats = [
    { label: "Học viên đang dạy", value: "24" },
    { label: "Khóa học đang mở", value: "3" },
    { label: "Buổi học tuần này", value: "8" },
    { label: "Đánh giá trung bình", value: "4.8★" },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Huấn luyện viên",
      content:
        "Hệ thống quản lý rất tiện lợi, giúp tôi theo dõi học viên và lịch dạy một cách hiệu quả.",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      role: "Huấn luyện viên",
      content:
        "Giao diện thân thiện, dễ sử dụng. Tôi có thể quản lý tất cả khóa học và học viên từ một nơi.",
      rating: 5,
    },
    {
      name: "Lê Văn C",
      role: "Huấn luyện viên",
      content:
        "Tính năng theo dõi thu nhập rất hữu ích. Tôi có thể dễ dàng quản lý tài chính của mình.",
      rating: 5,
    },
  ];

  return (
    <div className="bg-white relative">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Nền tảng quản lý khóa học bơi hàng đầu
            </div>

            <Title
              level={1}
              className="text-gray-900 mb-6 font-bold"
              style={{ fontSize: "3.5rem", lineHeight: "1.1" }}
            >
              Quản lý khóa học bơi{" "}
              <span className="text-blue-600 relative">
                chuyên nghiệp
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200 opacity-30 rounded-full"></div>
              </span>
            </Title>

            <Paragraph
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ fontSize: "1.25rem" }}
            >
              Hệ thống quản lý toàn diện giúp huấn luyện viên bơi lội quản lý
              học viên, lịch dạy và thu nhập một cách hiệu quả với công nghệ
              hiện đại.
            </Paragraph>

            <Space size="large" wrap className="justify-center">
              <Button
                type="primary"
                size="large"
                className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  height: "56px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  minWidth: "180px",
                }}
              >
                <Link
                  href="/auth/login"
                  className="text-white flex items-center"
                >
                  Bắt đầu ngay
                  <MdArrowForward className="ml-2 text-lg" />
                </Link>
              </Button>

              <Button
                size="large"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  height: "56px",
                  fontSize: "18px",
                  fontWeight: "600",
                  borderRadius: "12px",
                  minWidth: "180px",
                }}
              >
                <Link href="/courses" className="flex items-center">
                  <MdPlayCircle className="mr-2 text-lg" />
                  Xem demo
                </Link>
              </Button>
            </Space>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Title level={2} className="text-gray-900 mb-4 font-bold">
              Thống kê ấn tượng
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hàng nghìn huấn luyện viên đã tin tưởng và sử dụng hệ thống của
              chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[48, 48]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div className="text-center group p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              Tính năng nổi bật
            </div>
            <Title level={2} className="text-gray-900 mb-6 font-bold">
              Tất cả những gì bạn cần để quản lý hiệu quả
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hệ thống quản lý khóa học bơi toàn diện với các tính năng hiện đại
              được thiết kế đặc biệt cho huấn luyện viên chuyên nghiệp.
            </Paragraph>
          </div>

          <Row gutter={[40, 40]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={index}>
                <Card
                  className="text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg h-full group"
                  style={{ borderRadius: "20px" }}
                >
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white text-2xl">{feature.icon}</div>
                  </div>
                  <Title level={4} className="text-gray-900 mb-4 font-bold">
                    {feature.title}
                  </Title>
                  <Paragraph className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              Phản hồi từ khách hàng
            </div>
            <Title level={2} className="text-gray-900 mb-6 font-bold">
              Những gì huấn luyện viên nói về chúng tôi
            </Title>
            <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hàng nghìn huấn luyện viên đã tin tưởng và đạt được thành công với
              hệ thống của chúng tôi
            </Paragraph>
          </div>

          <Row gutter={[40, 40]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  className="p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg h-full group"
                  style={{ borderRadius: "20px" }}
                >
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <MdStar key={i} className="text-yellow-400 text-xl" />
                    ))}
                  </div>
                  <Paragraph className="text-gray-600 mb-6 italic leading-relaxed text-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </Paragraph>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <Text strong className="text-gray-900 block text-lg">
                        {testimonial.name}
                      </Text>
                      <Text className="text-blue-600 font-medium">
                        {testimonial.role}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Modern Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full opacity-5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full opacity-5 animate-pulse delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Title
            level={2}
            className="text-white mb-6 font-bold"
            style={{ fontSize: "2.5rem" }}
          >
            Sẵn sàng bắt đầu hành trình quản lý chuyên nghiệp?
          </Title>
          <Paragraph
            className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: "1.25rem" }}
          >
            Tham gia cùng hàng nghìn huấn luyện viên đã tin tưởng và sử dụng hệ
            thống quản lý khóa học bơi hiện đại nhất hiện nay.
          </Paragraph>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              type="primary"
              size="large"
              className="bg-white text-blue-600 hover:bg-blue-50 border-white hover:border-blue-50 shadow-2xl hover:shadow-3xl transition-all duration-300"
              style={{
                height: "60px",
                fontSize: "18px",
                fontWeight: "600",
                borderRadius: "16px",
                minWidth: "200px",
              }}
            >
              <Link
                href="/auth/login"
                className="text-blue-600 flex items-center"
              >
                Bắt đầu miễn phí
                <MdArrowForward className="ml-2 text-xl" />
              </Link>
            </Button>

            <Button
              size="large"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300"
              style={{
                height: "60px",
                fontSize: "18px",
                fontWeight: "600",
                borderRadius: "16px",
                minWidth: "200px",
              }}
            >
              <Link href="/contact" className="flex items-center">
                Liên hệ tư vấn
              </Link>
            </Button>
          </div>

          <div className="mt-8 text-blue-200 text-sm">
            <span className="inline-flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Miễn phí 30 ngày đầu tiên • Không cần thẻ tín dụng
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
