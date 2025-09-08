"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Avatar,
  Table,
  Tag,
  Progress,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Tooltip,
  Empty,
  Statistic,
  Divider,
  Tabs,
  List,
  InputNumber,
} from "antd";
import {
  MdAttachMoney,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdCalendarToday,
  MdTrendingUp,
  MdPayment,
  MdPerson,
  MdCheckCircle,
  MdCancel,
  MdSchedule,
  MdVisibility,
  MdDownload,
  MdPrint,
  MdBook,
  MdAccessTime,
  MdAccountBalance,
  MdReceipt,
  MdTrendingDown,
} from "react-icons/md";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function EarningsPage() {
  const { user } = useAuth();
  return <EarningsContent user={user} />;
}

function EarningsContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [form] = Form.useForm();

  // Mock data
  const earnings = [
    {
      id: 1,
      month: "2024-01",
      totalEarnings: 12500000,
      baseSalary: 8000000,
      bonuses: 2500000,
      overtime: 2000000,
      deductions: 0,
      status: "paid",
      paymentDate: "2024-02-05",
      lessons: 32,
      students: 24,
      courses: 3,
    },
    {
      id: 2,
      month: "2023-12",
      totalEarnings: 11800000,
      baseSalary: 8000000,
      bonuses: 2000000,
      overtime: 1800000,
      deductions: 0,
      status: "paid",
      paymentDate: "2024-01-05",
      lessons: 28,
      students: 22,
      courses: 3,
    },
    {
      id: 3,
      month: "2023-11",
      totalEarnings: 11200000,
      baseSalary: 8000000,
      bonuses: 1500000,
      overtime: 1700000,
      deductions: 0,
      status: "paid",
      paymentDate: "2023-12-05",
      lessons: 26,
      students: 20,
      courses: 2,
    },
  ];

  const payments = [
    {
      id: 1,
      type: "salary",
      amount: 8000000,
      description: "Lương cơ bản tháng 1/2024",
      date: "2024-02-05",
      status: "completed",
      method: "bank_transfer",
      reference: "TXN001234567",
    },
    {
      id: 2,
      type: "bonus",
      amount: 2500000,
      description: "Thưởng hiệu suất tháng 1/2024",
      date: "2024-02-05",
      status: "completed",
      method: "bank_transfer",
      reference: "TXN001234568",
    },
    {
      id: 3,
      type: "overtime",
      amount: 2000000,
      description: "Lương tăng ca tháng 1/2024",
      date: "2024-02-05",
      status: "completed",
      method: "bank_transfer",
      reference: "TXN001234569",
    },
    {
      id: 4,
      type: "bonus",
      amount: 500000,
      description: "Thưởng học viên mới",
      date: "2024-01-15",
      status: "completed",
      method: "bank_transfer",
      reference: "TXN001234570",
    },
  ];

  const courses = [
    {
      id: 1,
      name: "Bơi cơ bản",
      students: 12,
      pricePerStudent: 2500000,
      instructorShare: 0.4,
      totalRevenue: 30000000,
      instructorEarnings: 12000000,
      lessons: 20,
      completedLessons: 12,
    },
    {
      id: 2,
      name: "Bơi nâng cao",
      students: 8,
      pricePerStudent: 3000000,
      instructorShare: 0.4,
      totalRevenue: 24000000,
      instructorEarnings: 9600000,
      lessons: 16,
      completedLessons: 6,
    },
    {
      id: 3,
      name: "Bơi tự do",
      students: 6,
      pricePerStudent: 4000000,
      instructorShare: 0.4,
      totalRevenue: 24000000,
      instructorEarnings: 9600000,
      lessons: 12,
      completedLessons: 10,
    },
  ];

  const stats = [
    {
      title: "Thu nhập tháng này",
      value: "12.5M VND",
      change: "+7.5%",
      changeType: "positive" as const,
      icon: <MdAttachMoney className="text-lg" />,
    },
    {
      title: "Tổng thu nhập năm",
      value: "35.5M VND",
      change: "+12%",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Số buổi dạy",
      value: "32",
      change: "+4",
      changeType: "positive" as const,
      icon: <MdBook className="text-lg" />,
    },
    {
      title: "Học viên",
      value: "24",
      change: "+2",
      changeType: "positive" as const,
      icon: <MdPerson className="text-lg" />,
    },
  ];

  const paymentColumns = [
    {
      title: "Loại thanh toán",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeConfig = {
          salary: { color: "blue", text: "Lương cơ bản" },
          bonus: { color: "green", text: "Thưởng" },
          overtime: { color: "orange", text: "Tăng ca" },
          deduction: { color: "red", text: "Khấu trừ" },
        };
        const config = typeConfig[type as keyof typeof typeConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => (
        <Text strong className="text-green-600">
          {amount.toLocaleString()} VND
        </Text>
      ),
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "date",
      key: "date",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
      render: (method: string) => {
        const methodConfig = {
          bank_transfer: "Chuyển khoản",
          cash: "Tiền mặt",
          check: "Séc",
        };
        return methodConfig[method as keyof typeof methodConfig] || method;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig = {
          completed: { color: "success", text: "Hoàn thành" },
          pending: { color: "processing", text: "Chờ xử lý" },
          failed: { color: "error", text: "Thất bại" },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Badge status={config.color as any} text={config.text} />;
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
          <Tooltip title="Tải hóa đơn">
            <Button size="small" icon={<MdDownload />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const courseEarningsColumns = [
    {
      title: "Khóa học",
      key: "course",
      render: (record: any) => (
        <div>
          <Text strong className="text-sm">
            {record.name}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            {record.students} học viên
          </Text>
        </div>
      ),
    },
    {
      title: "Tiến độ",
      key: "progress",
      render: (record: any) => (
        <div>
          <Progress
            percent={Math.round(
              (record.completedLessons / record.lessons) * 100
            )}
            size="small"
          />
          <Text className="text-xs text-gray-500">
            {record.completedLessons}/{record.lessons} buổi
          </Text>
        </div>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (amount: number) => (
        <Text strong>{amount.toLocaleString()} VND</Text>
      ),
    },
    {
      title: "Thu nhập",
      dataIndex: "instructorEarnings",
      key: "instructorEarnings",
      render: (amount: number) => (
        <Text strong className="text-green-600">
          {amount.toLocaleString()} VND
        </Text>
      ),
    },
    {
      title: "Tỷ lệ chia",
      key: "share",
      render: (record: any) => (
        <Text>{(record.instructorShare * 100).toFixed(0)}%</Text>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
          <Tooltip title="Báo cáo">
            <Button size="small" icon={<MdReceipt />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const renderStatsCards = () => (
    <Row gutter={[16, 16]} className="mb-6">
      {stats.map((stat, index) => (
        <Col xs={12} sm={12} md={6} lg={6} key={index}>
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <Title level={5} className="text-sm font-medium mb-0">
                {stat.title}
              </Title>
              <div className="text-blue-600">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold mb-2">{stat.value}</div>
            <Text className="text-xs text-gray-500">
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {stat.change}
              </span>{" "}
              so với tháng trước
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderOverview = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card title="Biểu đồ thu nhập" className="mb-6">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <MdTrendingUp className="text-4xl text-blue-500 mb-2" />
                <Text type="secondary">Biểu đồ thu nhập theo tháng</Text>
              </div>
            </div>
          </Card>

          <Card title="Lịch sử thanh toán gần đây">
            <Table
              columns={paymentColumns}
              dataSource={payments}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Tóm tắt tháng này" className="mb-6">
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between">
                <Text>Lương cơ bản:</Text>
                <Text strong>8,000,000 VND</Text>
              </div>
              <div className="flex justify-between">
                <Text>Thưởng:</Text>
                <Text strong className="text-green-600">
                  2,500,000 VND
                </Text>
              </div>
              <div className="flex justify-between">
                <Text>Tăng ca:</Text>
                <Text strong className="text-blue-600">
                  2,000,000 VND
                </Text>
              </div>
              <Divider />
              <div className="flex justify-between">
                <Text strong>Tổng cộng:</Text>
                <Text strong className="text-lg text-green-600">
                  12,500,000 VND
                </Text>
              </div>
            </Space>
          </Card>

          <Card title="Thông tin tài khoản">
            <Space direction="vertical" size="middle" className="w-full">
              <div>
                <Text type="secondary">Ngân hàng:</Text>
                <div>Vietcombank</div>
              </div>
              <div>
                <Text type="secondary">Số tài khoản:</Text>
                <div>1234567890</div>
              </div>
              <div>
                <Text type="secondary">Chủ tài khoản:</Text>
                <div>{user?.username || "Nguyễn Văn A"}</div>
              </div>
              <Button type="primary" className="w-full">
                Cập nhật thông tin
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderPayments = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Lịch sử thanh toán</Title>
        <Space>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Chọn tháng"
            picker="month"
          />
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdPrint />}>In</Button>
        </Space>
      </div>

      <Table
        columns={paymentColumns}
        dataSource={payments}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );

  const renderCourseEarnings = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thu nhập theo khóa học</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdFilterList />}>Bộ lọc</Button>
        </Space>
      </div>

      <Table
        columns={courseEarningsColumns}
        dataSource={courses}
        rowKey="id"
        pagination={false}
        scroll={{ x: 600 }}
      />
    </Card>
  );

  const renderMonthlyEarnings = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thu nhập theo tháng</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdPrint />}>In</Button>
        </Space>
      </div>

      <List
        dataSource={earnings}
        renderItem={(earning) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="flex items-center justify-between">
                  <Text strong>
                    Tháng {dayjs(earning.month).format("MM/YYYY")}
                  </Text>
                  <Text strong className="text-lg text-green-600">
                    {earning.totalEarnings.toLocaleString()} VND
                  </Text>
                </div>
              }
              description={
                <div className="mt-2">
                  <Row gutter={16}>
                    <Col span={6}>
                      <Statistic
                        title="Lương cơ bản"
                        value={earning.baseSalary}
                        formatter={(value) => `${value?.toLocaleString()} VND`}
                        valueStyle={{ fontSize: "14px" }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Thưởng"
                        value={earning.bonuses}
                        formatter={(value) => `${value?.toLocaleString()} VND`}
                        valueStyle={{ fontSize: "14px", color: "#52c41a" }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Tăng ca"
                        value={earning.overtime}
                        formatter={(value) => `${value?.toLocaleString()} VND`}
                        valueStyle={{ fontSize: "14px", color: "#1890ff" }}
                      />
                    </Col>
                    <Col span={6}>
                      <Statistic
                        title="Buổi dạy"
                        value={earning.lessons}
                        suffix="buổi"
                        valueStyle={{ fontSize: "14px" }}
                      />
                    </Col>
                  </Row>
                </div>
              }
            />
            <Space>
              <Button size="small" icon={<MdVisibility />}>
                Chi tiết
              </Button>
              <Button size="small" icon={<MdDownload />}>
                Hóa đơn
              </Button>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );

  return (
    <div className="p-4 pt-16 lg:pt-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Title
                level={1}
                className="text-gray-900 mb-2 text-lg md:text-2xl lg:text-3xl"
              >
                Thu nhập
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Theo dõi thu nhập và lịch sử thanh toán của bạn
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdDownload />}>
                Xuất báo cáo
              </Button>
            </Space>
          </div>
        </div>

        {/* Stats */}
        {renderStatsCards()}

        {/* Main Content */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
          <TabPane
            tab={
              <span>
                <MdTrendingUp className="mr-2" />
                Tổng quan
              </span>
            }
            key="overview"
          >
            {renderOverview()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdPayment className="mr-2" />
                Thanh toán
              </span>
            }
            key="payments"
          >
            {renderPayments()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdBook className="mr-2" />
                Theo khóa học
              </span>
            }
            key="courses"
          >
            {renderCourseEarnings()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdCalendarToday className="mr-2" />
                Theo tháng
              </span>
            }
            key="monthly"
          >
            {renderMonthlyEarnings()}
          </TabPane>
        </Tabs>

        {/* Payment Modal */}
        <Modal
          title="Chi tiết thanh toán"
          open={paymentModalVisible}
          onCancel={() => setPaymentModalVisible(false)}
          footer={null}
          width={600}
        >
          {selectedPayment && (
            <div>
              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Text strong>Loại thanh toán:</Text>
                  <div>
                    <Tag color="blue">Lương cơ bản</Tag>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Số tiền:</Text>
                  <div className="text-lg text-green-600">
                    {selectedPayment.amount?.toLocaleString()} VND
                  </div>
                </Col>
              </Row>

              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Text strong>Ngày thanh toán:</Text>
                  <div>{dayjs(selectedPayment.date).format("DD/MM/YYYY")}</div>
                </Col>
                <Col span={12}>
                  <Text strong>Trạng thái:</Text>
                  <div>
                    <Badge status="success" text="Hoàn thành" />
                  </div>
                </Col>
              </Row>

              <Row gutter={16} className="mb-4">
                <Col span={24}>
                  <Text strong>Mô tả:</Text>
                  <div>{selectedPayment.description}</div>
                </Col>
              </Row>

              <Row gutter={16} className="mb-4">
                <Col span={24}>
                  <Text strong>Mã giao dịch:</Text>
                  <div className="font-mono">{selectedPayment.reference}</div>
                </Col>
              </Row>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setPaymentModalVisible(false)}>
                  Đóng
                </Button>
                <Button type="primary" icon={<MdDownload />}>
                  Tải hóa đơn
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
