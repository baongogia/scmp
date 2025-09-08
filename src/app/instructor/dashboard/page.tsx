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
  List,
  Tag,
  Progress,
  Table,
  Badge,
  Tabs,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  message,
  Tooltip,
  Empty,
} from "antd";
import {
  MdPerson,
  MdBook,
  MdCalendarToday,
  MdAttachMoney,
  MdAccessTime,
  MdStar,
  MdEmail,
  MdPhone,
  MdEdit,
  MdAdd,
  MdNotifications,
  MdAssignment,
  MdTrendingUp,
  MdSchedule,
  MdGroup,
  MdFeedback,
} from "react-icons/md";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function InstructorDashboard() {
  const { user } = useAuth();
  return <DashboardContent user={user} />;
}

function DashboardContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] =
    useState(false);
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [form] = Form.useForm();

  const stats = [
    {
      title: "Tổng học viên",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: <MdPerson className="text-lg" />,
    },
    {
      title: "Khóa học đang dạy",
      value: "3",
      change: "+1",
      changeType: "positive" as const,
      icon: <MdBook className="text-lg" />,
    },
    {
      title: "Buổi học tuần này",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: <MdCalendarToday className="text-lg" />,
    },
    {
      title: "Thu nhập tháng này",
      value: "12.5M VND",
      change: "+8%",
      changeType: "positive" as const,
      icon: <MdAttachMoney className="text-lg" />,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "lesson",
      title: "Buổi học bơi cơ bản",
      time: "2 giờ trước",
      description: "Đã hoàn thành buổi học với 8 học viên",
    },
    {
      id: 2,
      type: "enrollment",
      title: "Học viên mới đăng ký",
      time: "4 giờ trước",
      description: "Nguyễn Văn A đã đăng ký khóa học bơi nâng cao",
    },
    {
      id: 3,
      type: "payment",
      title: "Thanh toán học phí",
      time: "1 ngày trước",
      description: "Trần Thị B đã thanh toán học phí tháng 12",
    },
    {
      id: 4,
      type: "review",
      title: "Đánh giá mới",
      time: "2 ngày trước",
      description: "Lê Văn C đã đánh giá 5 sao cho khóa học",
    },
  ];

  const upcomingLessons = [
    {
      id: 1,
      title: "Bơi cơ bản - Buổi 5",
      time: "18:00 - 19:00",
      date: "Hôm nay",
      students: 8,
      location: "Bể bơi ABC",
    },
    {
      id: 2,
      title: "Bơi nâng cao - Buổi 3",
      time: "19:00 - 20:30",
      date: "Ngày mai",
      students: 6,
      location: "Bể bơi XYZ",
    },
    {
      id: 3,
      title: "Bơi cơ bản - Buổi 6",
      time: "18:00 - 19:00",
      date: "Thứ 4",
      students: 8,
      location: "Bể bơi ABC",
    },
  ];

  // Dữ liệu mẫu cho các chức năng
  const courses = [
    {
      id: 1,
      name: "Bơi cơ bản cho người mới",
      level: "Cơ bản",
      students: 12,
      maxStudents: 15,
      progress: 60,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
    },
    {
      id: 2,
      name: "Bơi nâng cao",
      level: "Nâng cao",
      students: 8,
      maxStudents: 10,
      progress: 40,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
    },
    {
      id: 3,
      name: "Bơi tự do chuyên nghiệp",
      level: "Chuyên nghiệp",
      students: 6,
      maxStudents: 8,
      progress: 80,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-02-28",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      course: "Bơi cơ bản",
      progress: 75,
      attendance: 85,
      lastLesson: "2024-01-20",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      course: "Bơi nâng cao",
      progress: 60,
      attendance: 90,
      lastLesson: "2024-01-19",
      status: "active",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0456789123",
      course: "Bơi tự do",
      progress: 90,
      attendance: 95,
      lastLesson: "2024-01-21",
      status: "active",
    },
  ];

  const weeklySchedule = [
    {
      day: "Thứ 2",
      lessons: [
        { time: "18:00 - 19:00", course: "Bơi cơ bản", students: 8 },
        { time: "19:30 - 20:30", course: "Bơi nâng cao", students: 6 },
      ],
    },
    {
      day: "Thứ 4",
      lessons: [
        { time: "18:00 - 19:00", course: "Bơi cơ bản", students: 8 },
        { time: "19:30 - 21:00", course: "Bơi tự do", students: 6 },
      ],
    },
    {
      day: "Thứ 6",
      lessons: [{ time: "18:00 - 19:30", course: "Bơi nâng cao", students: 8 }],
    },
    {
      day: "Chủ nhật",
      lessons: [
        { time: "09:00 - 10:30", course: "Bơi cơ bản", students: 10 },
        { time: "15:00 - 16:30", course: "Bơi tự do", students: 6 },
      ],
    },
  ];

  // Columns cho bảng học viên
  const studentColumns = [
    {
      title: "Học viên",
      key: "student",
      render: (record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar>{record.name.charAt(0)}</Avatar>
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary" className="text-xs">
              {record.email}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      key: "course",
      render: (course: string) => <Tag color="blue">{course}</Tag>,
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: "Điểm danh",
      dataIndex: "attendance",
      key: "attendance",
      render: (attendance: number) => (
        <Text className={attendance >= 80 ? "text-green-600" : "text-red-600"}>
          {attendance}%
        </Text>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "active" ? "success" : "default"}
          text={status === "active" ? "Đang học" : "Tạm dừng"}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Button size="small" icon={<MdEdit />}>
            Sửa
          </Button>
          <Button size="small" icon={<MdFeedback />}>
            Phản hồi
          </Button>
        </Space>
      ),
    },
  ];

  const renderOverviewTab = () => (
    <div>
      {/* Stats Grid */}
      <Row gutter={[16, 16]} className="mb-6 md:mb-8">
        {stats.map((stat, index) => (
          <Col xs={12} sm={12} md={6} lg={6} key={index}>
            <Card className="h-full stats-card fade-in-up">
              <div className="flex items-center justify-between mb-4">
                <Title level={5} className="text-sm font-medium mb-0">
                  {stat.title}
                </Title>
                <div className="text-blue-600 stat-icon">{stat.icon}</div>
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

      <Row gutter={[16, 16]} className="lg:gutter-32">
        {/* Recent Activities */}
        <Col xs={24} lg={16} className="mb-6 lg:mb-0">
          <Card className="h-full dashboard-card slide-in-right">
            <div className="mb-4">
              <Title level={4} className="mb-2">
                Hoạt động gần đây
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Các hoạt động mới nhất trong hệ thống
              </Paragraph>
            </div>

            <List
              dataSource={recentActivities}
              renderItem={(activity) => (
                <List.Item className="activity-item">
                  <List.Item.Meta
                    avatar={
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    }
                    title={
                      <Text className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </Text>
                    }
                    description={
                      <div>
                        <Text className="text-sm text-gray-500 block">
                          {activity.description}
                        </Text>
                        <Text className="text-xs text-gray-400">
                          {activity.time}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <Button type="default" className="w-full mt-4">
              Xem tất cả hoạt động
            </Button>
          </Card>
        </Col>

        {/* Upcoming Lessons */}
        <Col xs={24} lg={8}>
          <Card className="h-full dashboard-card">
            <div className="mb-4">
              <Title level={4} className="mb-2">
                Buổi học sắp tới
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Lịch dạy trong tuần này
              </Paragraph>
            </div>

            <Space direction="vertical" size="middle" className="w-full">
              {upcomingLessons.map((lesson) => (
                <Card key={lesson.id} size="small" className="schedule-card">
                  <div className="flex items-center justify-between mb-2">
                    <Text className="text-sm font-medium text-gray-900">
                      {lesson.title}
                    </Text>
                    <Tag color="blue">{lesson.date}</Tag>
                  </div>
                  <Space direction="vertical" size="small" className="w-full">
                    <Text className="text-xs text-gray-600">
                      <MdAccessTime className="mr-1" />
                      {lesson.time}
                    </Text>
                    <Text className="text-xs text-gray-600">
                      <MdPerson className="mr-1" />
                      {lesson.students} học viên
                    </Text>
                    <Text className="text-xs text-gray-600">
                      📍 {lesson.location}
                    </Text>
                  </Space>
                </Card>
              ))}
            </Space>

            <Button type="primary" className="w-full mt-4">
              Xem lịch đầy đủ
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderCoursesTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Quản lý khóa học</Title>
          <Text type="secondary">Danh sách các khóa học bạn đang quản lý</Text>
        </div>
        <Button type="primary" icon={<MdAdd />}>
          Tạo khóa học mới
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {courses.map((course) => (
          <Col xs={24} md={12} lg={8} key={course.id}>
            <Card
              className="h-full dashboard-card"
              actions={[
                <Button key="edit" type="text" icon={<MdEdit />}>
                  Chỉnh sửa
                </Button>,
                <Button key="students" type="text" icon={<MdGroup />}>
                  Học viên
                </Button>,
                <Button key="schedule" type="text" icon={<MdSchedule />}>
                  Lịch học
                </Button>,
              ]}
            >
              <div className="mb-4">
                <Title level={4} className="mb-2">
                  {course.name}
                </Title>
                <Tag color="blue">{course.level}</Tag>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Học viên:</Text>
                  <Text strong>
                    {course.students}/{course.maxStudents}
                  </Text>
                </div>

                <div>
                  <Text>Tiến độ khóa học:</Text>
                  <Progress
                    percent={course.progress}
                    size="small"
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{course.startDate}</span>
                  <span>{course.endDate}</span>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const renderStudentsTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Quản lý học viên</Title>
          <Text type="secondary">Theo dõi tiến độ và thông tin học viên</Text>
        </div>
        <Space>
          <Button icon={<MdAdd />}>Thêm học viên</Button>
          <Button
            type="primary"
            icon={<MdAssignment />}
            onClick={() => setAttendanceModalVisible(true)}
          >
            Điểm danh
          </Button>
        </Space>
      </div>

      <Card className="dashboard-table">
        <Table
          columns={studentColumns}
          dataSource={students}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );

  const renderScheduleTab = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Lịch giảng dạy</Title>
          <Text type="secondary">Xem và quản lý lịch dạy hàng tuần</Text>
        </div>
        <Button type="primary" icon={<MdAdd />}>
          Thêm buổi học
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {weeklySchedule.map((day, index) => (
          <Col xs={24} md={12} lg={6} key={index}>
            <Card
              title={day.day}
              className="h-full"
              headStyle={{
                backgroundColor: "#f0f9ff",
                borderBottom: "1px solid #e0e7ff",
              }}
            >
              {day.lessons.length > 0 ? (
                <Space direction="vertical" size="middle" className="w-full">
                  {day.lessons.map((lesson, lessonIndex) => (
                    <Card
                      key={lessonIndex}
                      size="small"
                      className="schedule-card"
                    >
                      <div className="space-y-2">
                        <Text strong className="text-sm">
                          {lesson.course}
                        </Text>
                        <div className="text-xs text-gray-500">
                          <div>⏰ {lesson.time}</div>
                          <div>👥 {lesson.students} học viên</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </Space>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Không có lịch học"
                  className="py-8"
                />
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const renderProfileTab = () => (
    <div>
      <Title level={3}>Thông tin cá nhân</Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card>
            <div className="text-center mb-4">
              <Avatar
                size={120}
                src={user?.featured_image?.path}
                className="border-4 border-blue-500 mb-4"
              >
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <Title level={4}>{user?.username || "Huấn luyện viên"}</Title>
              <Tag color="blue">{user?.role_system || "INSTRUCTOR"}</Tag>
            </div>
            <Button
              type="primary"
              className="w-full"
              onClick={() => setProfileModalVisible(true)}
            >
              Chỉnh sửa thông tin
            </Button>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Thông tin chi tiết">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text type="secondary">Email:</Text>
                <div>{user?.email}</div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Số điện thoại:</Text>
                <div>{user?.phone || "Chưa cập nhật"}</div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Kinh nghiệm:</Text>
                <div>5 năm</div>
              </Col>
              <Col span={12}>
                <Text type="secondary">Đánh giá:</Text>
                <div>
                  <MdStar className="text-yellow-500 inline mr-1" />
                  4.8/5 (124 đánh giá)
                </div>
              </Col>
              <Col span={24}>
                <Text type="secondary">Chuyên môn:</Text>
                <div className="mt-1">
                  <Tag>Bơi tự do</Tag>
                  <Tag>Bơi ngửa</Tag>
                  <Tag>Bơi bướm</Tag>
                  <Tag>Bơi ếch</Tag>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="p-4 pt-16 lg:pt-8 md:p-8">
      <div className="max-w-7xl mx-auto dashboard-content">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="min-w-0">
                <Title
                  level={1}
                  className="text-gray-900 mb-1 text-lg md:text-2xl lg:text-3xl"
                >
                  Chào mừng trở lại, {user?.username || "Huấn luyện viên"}!
                </Title>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag color="blue" className="font-semibold">
                    {user?.role_system || "INSTRUCTOR"}
                  </Tag>
                  {user?.role_front?.map((role: string, index: number) => (
                    <Tag key={index} color="blue" className="font-semibold">
                      {role}
                    </Tag>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600 gap-1 sm:gap-0">
                  <div className="flex items-center space-x-1">
                    <MdEmail className="text-blue-600" />
                    <span className="truncate">{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center space-x-1">
                      <MdPhone className="text-blue-600" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Space className="flex-shrink-0">
              <Button
                icon={<MdNotifications />}
                onClick={() => setNotificationModalVisible(true)}
                size="small"
                className="md:size-default"
              >
                <span className="hidden sm:inline">Thông báo</span>
              </Button>
              <Button
                type="primary"
                icon={<MdTrendingUp />}
                size="small"
                className="md:size-default"
              >
                <span className="hidden sm:inline">Báo cáo</span>
              </Button>
            </Space>
          </div>
          <Paragraph className="text-gray-600 mt-4">
            Quản lý các khóa học bơi và theo dõi tiến độ học viên của bạn
          </Paragraph>
        </div>

        {/* Main Content with Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          className="dashboard-tabs"
        >
          <TabPane
            tab={
              <span>
                <MdTrendingUp className="mr-2" />
                Tổng quan
              </span>
            }
            key="overview"
          >
            {renderOverviewTab()}
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
            {renderCoursesTab()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdGroup className="mr-2" />
                Học viên
              </span>
            }
            key="students"
          >
            {renderStudentsTab()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdSchedule className="mr-2" />
                Lịch dạy
              </span>
            }
            key="schedule"
          >
            {renderScheduleTab()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdPerson className="mr-2" />
                Hồ sơ
              </span>
            }
            key="profile"
          >
            {renderProfileTab()}
          </TabPane>
        </Tabs>

        {/* Modals */}
        <Modal
          title="Chỉnh sửa thông tin cá nhân"
          open={profileModalVisible}
          onCancel={() => setProfileModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tên đầy đủ" name="fullName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Kinh nghiệm (năm)" name="experience">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Chuyên môn" name="specialties">
              <Select mode="multiple" placeholder="Chọn chuyên môn">
                <Select.Option value="freestyle">Bơi tự do</Select.Option>
                <Select.Option value="backstroke">Bơi ngửa</Select.Option>
                <Select.Option value="butterfly">Bơi bướm</Select.Option>
                <Select.Option value="breaststroke">Bơi ếch</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setProfileModalVisible(false)}>Hủy</Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Cập nhật thông tin thành công!");
                  setProfileModalVisible(false);
                }}
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Gửi thông báo"
          open={notificationModalVisible}
          onCancel={() => setNotificationModalVisible(false)}
          footer={null}
          width={500}
        >
          <Form layout="vertical">
            <Form.Item label="Người nhận" required>
              <Select mode="multiple" placeholder="Chọn học viên">
                {students.map((student) => (
                  <Select.Option key={student.id} value={student.id}>
                    {student.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Tiêu đề" required>
              <Input placeholder="Nhập tiêu đề thông báo" />
            </Form.Item>
            <Form.Item label="Nội dung" required>
              <Input.TextArea rows={4} placeholder="Nhập nội dung thông báo" />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setNotificationModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Gửi thông báo thành công!");
                  setNotificationModalVisible(false);
                }}
              >
                Gửi thông báo
              </Button>
            </div>
          </Form>
        </Modal>

        <Modal
          title="Điểm danh học viên"
          open={attendanceModalVisible}
          onCancel={() => setAttendanceModalVisible(false)}
          footer={null}
          width={700}
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Khóa học" required>
                  <Select placeholder="Chọn khóa học">
                    {courses.map((course) => (
                      <Select.Option key={course.id} value={course.id}>
                        {course.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Ngày học" required>
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <div className="border rounded-lg p-4">
              <Title level={5}>Danh sách học viên</Title>
              <List
                dataSource={students.slice(0, 5)}
                renderItem={(student) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar>{student.name.charAt(0)}</Avatar>}
                      title={student.name}
                      description={student.course}
                    />
                    <Space>
                      <Button type="primary" size="small">
                        Có mặt
                      </Button>
                      <Button size="small">Vắng mặt</Button>
                    </Space>
                  </List.Item>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={() => setAttendanceModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Điểm danh thành công!");
                  setAttendanceModalVisible(false);
                }}
              >
                Lưu điểm danh
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
