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
} from "antd";
import {
  MdBarChart,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdCalendarToday,
  MdTrendingUp,
  MdPerson,
  MdCheckCircle,
  MdCancel,
  MdSchedule,
  MdVisibility,
  MdDownload,
  MdPrint,
  MdBook,
  MdAccessTime,
  MdGroup,
  MdAttachMoney,
  MdAssessment,
  MdPieChart,
  MdShowChart,
} from "react-icons/md";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function ReportsPage() {
  const { user } = useAuth();
  return <ReportsContent user={user} />;
}

function ReportsContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [form] = Form.useForm();

  // Mock data
  const reports = [
    {
      id: 1,
      title: "Báo cáo tháng 1/2024",
      type: "monthly",
      period: "2024-01",
      status: "completed",
      createdDate: "2024-02-01",
      data: {
        totalStudents: 24,
        totalLessons: 32,
        totalEarnings: 12500000,
        attendanceRate: 87,
        courseCompletion: 75,
      },
    },
    {
      id: 2,
      title: "Báo cáo khóa học bơi cơ bản",
      type: "course",
      period: "2024-01",
      status: "completed",
      createdDate: "2024-01-31",
      data: {
        totalStudents: 12,
        totalLessons: 20,
        totalEarnings: 6000000,
        attendanceRate: 85,
        courseCompletion: 60,
      },
    },
    {
      id: 3,
      title: "Báo cáo hiệu suất học viên",
      type: "performance",
      period: "2024-01",
      status: "completed",
      createdDate: "2024-01-30",
      data: {
        totalStudents: 24,
        totalLessons: 32,
        totalEarnings: 12500000,
        attendanceRate: 87,
        courseCompletion: 75,
      },
    },
  ];

  const studentPerformance = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      course: "Bơi cơ bản",
      attendance: 85,
      progress: 75,
      rating: 4.5,
      lessonsCompleted: 15,
      totalLessons: 20,
      lastLesson: "2024-01-20",
    },
    {
      id: 2,
      name: "Trần Thị B",
      course: "Bơi nâng cao",
      attendance: 90,
      progress: 60,
      rating: 4.8,
      lessonsCompleted: 10,
      totalLessons: 16,
      lastLesson: "2024-01-19",
    },
    {
      id: 3,
      name: "Lê Văn C",
      course: "Bơi tự do",
      attendance: 95,
      progress: 90,
      rating: 5.0,
      lessonsCompleted: 11,
      totalLessons: 12,
      lastLesson: "2024-01-21",
    },
  ];

  const courseStats = [
    {
      id: 1,
      name: "Bơi cơ bản",
      students: 12,
      lessons: 20,
      completedLessons: 12,
      revenue: 30000000,
      instructorEarnings: 12000000,
      attendanceRate: 85,
      completionRate: 60,
    },
    {
      id: 2,
      name: "Bơi nâng cao",
      students: 8,
      lessons: 16,
      completedLessons: 6,
      revenue: 24000000,
      instructorEarnings: 9600000,
      attendanceRate: 90,
      completionRate: 37.5,
    },
    {
      id: 3,
      name: "Bơi tự do",
      students: 6,
      lessons: 12,
      completedLessons: 10,
      revenue: 24000000,
      instructorEarnings: 9600000,
      attendanceRate: 95,
      completionRate: 83.3,
    },
  ];

  const stats = [
    {
      title: "Tổng học viên",
      value: 24,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdGroup className="text-lg" />,
    },
    {
      title: "Buổi dạy tháng này",
      value: 32,
      change: "+4",
      changeType: "positive" as const,
      icon: <MdBook className="text-lg" />,
    },
    {
      title: "Tỷ lệ có mặt TB",
      value: "87%",
      change: "+3%",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Thu nhập tháng",
      value: "12.5M VND",
      change: "+7.5%",
      changeType: "positive" as const,
      icon: <MdAttachMoney className="text-lg" />,
    },
  ];

  const reportColumns = [
    {
      title: "Báo cáo",
      key: "report",
      render: (record: any) => (
        <div>
          <Text strong className="text-sm">
            {record.title}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            {dayjs(record.createdDate).format("DD/MM/YYYY")}
          </Text>
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeConfig = {
          monthly: { color: "blue", text: "Hàng tháng" },
          course: { color: "green", text: "Khóa học" },
          performance: { color: "orange", text: "Hiệu suất" },
          custom: { color: "purple", text: "Tùy chỉnh" },
        };
        const config = typeConfig[type as keyof typeof typeConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Thời kỳ",
      dataIndex: "period",
      key: "period",
      render: (period: string) => dayjs(period).format("MM/YYYY"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig = {
          completed: { color: "success", text: "Hoàn thành" },
          processing: { color: "processing", text: "Đang xử lý" },
          failed: { color: "error", text: "Lỗi" },
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
          <Tooltip title="Xem báo cáo">
            <Button
              size="small"
              icon={<MdVisibility />}
              onClick={() => {
                setSelectedReport(record);
                setReportModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Tải xuống">
            <Button size="small" icon={<MdDownload />} />
          </Tooltip>
          <Tooltip title="In">
            <Button size="small" icon={<MdPrint />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const studentPerformanceColumns = [
    {
      title: "Học viên",
      key: "student",
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar size={40}>{record.name.charAt(0)}</Avatar>
          <div>
            <Text strong className="text-sm">
              {record.name}
            </Text>
            <br />
            <Text type="secondary" className="text-xs">
              {record.course}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Điểm danh",
      dataIndex: "attendance",
      key: "attendance",
      render: (attendance: number) => (
        <div>
          <Progress percent={attendance} size="small" />
          <Text className="text-xs text-gray-500">{attendance}%</Text>
        </div>
      ),
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number, record: any) => (
        <div>
          <Progress percent={progress} size="small" />
          <Text className="text-xs text-gray-500">
            {record.lessonsCompleted}/{record.totalLessons} buổi
          </Text>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <Text>{rating}</Text>
        </div>
      ),
    },
    {
      title: "Buổi học cuối",
      dataIndex: "lastLesson",
      key: "lastLesson",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
  ];

  const courseStatsColumns = [
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
      title: "Tỷ lệ có mặt",
      dataIndex: "attendanceRate",
      key: "attendanceRate",
      render: (rate: number) => (
        <div>
          <Progress percent={rate} size="small" />
          <Text className="text-xs text-gray-500">{rate}%</Text>
        </div>
      ),
    },
    {
      title: "Tỷ lệ hoàn thành",
      dataIndex: "completionRate",
      key: "completionRate",
      render: (rate: number) => (
        <div>
          <Progress percent={rate} size="small" />
          <Text className="text-xs text-gray-500">{rate}%</Text>
        </div>
      ),
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
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
          <Card title="Biểu đồ hiệu suất" className="mb-6">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <MdShowChart className="text-4xl text-blue-500 mb-2" />
                <Text type="secondary">Biểu đồ hiệu suất theo tháng</Text>
              </div>
            </div>
          </Card>

          <Card title="Báo cáo gần đây">
            <Table
              columns={reportColumns}
              dataSource={reports}
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
                <Text>Tổng học viên:</Text>
                <Text strong>24</Text>
              </div>
              <div className="flex justify-between">
                <Text>Buổi dạy:</Text>
                <Text strong>32</Text>
              </div>
              <div className="flex justify-between">
                <Text>Tỷ lệ có mặt:</Text>
                <Text strong className="text-green-600">
                  87%
                </Text>
              </div>
              <div className="flex justify-between">
                <Text>Thu nhập:</Text>
                <Text strong className="text-green-600">
                  12.5M VND
                </Text>
              </div>
              <Divider />
              <div className="flex justify-between">
                <Text strong>Đánh giá TB:</Text>
                <Text strong className="text-lg text-yellow-600">
                  4.7/5
                </Text>
              </div>
            </Space>
          </Card>

          <Card title="Thống kê nhanh">
            <Space direction="vertical" size="middle" className="w-full">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">87%</div>
                <Text type="secondary">Tỷ lệ có mặt</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <Text type="secondary">Hoàn thành khóa học</Text>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4.7</div>
                <Text type="secondary">Đánh giá trung bình</Text>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderReports = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Báo cáo đã tạo</Title>
        <Space>
          <Button type="primary" icon={<MdAdd />}>
            Tạo báo cáo mới
          </Button>
          <Button icon={<MdDownload />}>Xuất tất cả</Button>
        </Space>
      </div>

      <Table
        columns={reportColumns}
        dataSource={reports}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );

  const renderStudentPerformance = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Hiệu suất học viên</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdFilterList />}>Bộ lọc</Button>
        </Space>
      </div>

      <Table
        columns={studentPerformanceColumns}
        dataSource={studentPerformance}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
      />
    </Card>
  );

  const renderCourseStats = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thống kê khóa học</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdFilterList />}>Bộ lọc</Button>
        </Space>
      </div>

      <Table
        columns={courseStatsColumns}
        dataSource={courseStats}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
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
                Báo cáo & Thống kê
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Xem và tạo các báo cáo chi tiết về hiệu suất giảng dạy
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAdd />}>
                Tạo báo cáo
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
                <MdBarChart className="mr-2" />
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
                <MdAssessment className="mr-2" />
                Báo cáo
              </span>
            }
            key="reports"
          >
            {renderReports()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdPerson className="mr-2" />
                Học viên
              </span>
            }
            key="students"
          >
            {renderStudentPerformance()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdBook className="mr-2" />
                Khóa học
              </span>
            }
            key="courses"
          >
            {renderCourseStats()}
          </TabPane>
        </Tabs>

        {/* Report Modal */}
        <Modal
          title={`Chi tiết báo cáo - ${selectedReport?.title}`}
          open={reportModalVisible}
          onCancel={() => setReportModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedReport && (
            <div>
              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Text strong>Loại báo cáo:</Text>
                  <div>
                    <Tag color="blue">Hàng tháng</Tag>
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Thời kỳ:</Text>
                  <div>{dayjs(selectedReport.period).format("MM/YYYY")}</div>
                </Col>
              </Row>

              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Text strong>Ngày tạo:</Text>
                  <div>
                    {dayjs(selectedReport.createdDate).format("DD/MM/YYYY")}
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Trạng thái:</Text>
                  <div>
                    <Badge status="success" text="Hoàn thành" />
                  </div>
                </Col>
              </Row>

              <Divider />

              <Title level={5}>Thống kê chính</Title>
              <Row gutter={16} className="mb-4">
                <Col span={8}>
                  <Statistic
                    title="Tổng học viên"
                    value={selectedReport.data?.totalStudents}
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Tổng buổi dạy"
                    value={selectedReport.data?.totalLessons}
                    valueStyle={{ fontSize: "18px" }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Thu nhập"
                    value={selectedReport.data?.totalEarnings}
                    formatter={(value) => `${value?.toLocaleString()} VND`}
                    valueStyle={{ fontSize: "18px", color: "#52c41a" }}
                  />
                </Col>
              </Row>

              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Statistic
                    title="Tỷ lệ có mặt"
                    value={selectedReport.data?.attendanceRate}
                    suffix="%"
                    valueStyle={{ fontSize: "18px", color: "#1890ff" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Hoàn thành khóa học"
                    value={selectedReport.data?.courseCompletion}
                    suffix="%"
                    valueStyle={{ fontSize: "18px", color: "#722ed1" }}
                  />
                </Col>
              </Row>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setReportModalVisible(false)}>
                  Đóng
                </Button>
                <Button type="primary" icon={<MdDownload />}>
                  Tải xuống
                </Button>
                <Button icon={<MdPrint />}>In</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
