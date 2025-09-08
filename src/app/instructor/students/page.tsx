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
} from "antd";
import {
  MdPerson,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdEmail,
  MdPhone,
  MdCalendarToday,
  MdTrendingUp,
  MdGroup,
  MdAssignment,
  MdFeedback,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import { useState, useEffect } from "react";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function StudentsPage() {
  const { user } = useAuth();
  return <StudentsContent user={user} />;
}

function StudentsContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("all");
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [editStudentModalVisible, setEditStudentModalVisible] = useState(false);
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [form] = Form.useForm();

  // Mock data
  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      course: "Bơi cơ bản",
      courseId: 1,
      progress: 75,
      attendance: 85,
      lastLesson: "2024-01-20",
      status: "active",
      joinDate: "2024-01-01",
      totalLessons: 20,
      completedLessons: 15,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      course: "Bơi nâng cao",
      courseId: 2,
      progress: 60,
      attendance: 90,
      lastLesson: "2024-01-19",
      status: "active",
      joinDate: "2024-01-15",
      totalLessons: 16,
      completedLessons: 10,
      rating: 4.8,
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0456789123",
      course: "Bơi tự do",
      courseId: 3,
      progress: 90,
      attendance: 95,
      lastLesson: "2024-01-21",
      status: "active",
      joinDate: "2023-12-01",
      totalLessons: 12,
      completedLessons: 11,
      rating: 5.0,
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0567891234",
      course: "Bơi cơ bản",
      courseId: 1,
      progress: 45,
      attendance: 70,
      lastLesson: "2024-01-18",
      status: "inactive",
      joinDate: "2024-01-10",
      totalLessons: 20,
      completedLessons: 9,
      rating: 4.2,
    },
  ];

  const courses = [
    { id: 1, name: "Bơi cơ bản", level: "Cơ bản" },
    { id: 2, name: "Bơi nâng cao", level: "Nâng cao" },
    { id: 3, name: "Bơi tự do", level: "Chuyên nghiệp" },
  ];

  const stats = [
    {
      title: "Tổng học viên",
      value: students.length,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdGroup className="text-lg" />,
    },
    {
      title: "Đang học",
      value: students.filter((s) => s.status === "active").length,
      change: "+1",
      changeType: "positive" as const,
      icon: <MdPerson className="text-lg" />,
    },
    {
      title: "Hoàn thành",
      value: students.filter((s) => s.progress === 100).length,
      change: "+3",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Điểm danh TB",
      value: "87%",
      change: "+5%",
      changeType: "positive" as const,
      icon: <MdAssignment className="text-lg" />,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchText.toLowerCase()) ||
      student.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesCourse =
      !filterCourse || student.courseId.toString() === filterCourse;
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "active" && student.status === "active") ||
      (activeTab === "inactive" && student.status === "inactive");

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const studentColumns = [
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
      render: (progress: number, record: any) => (
        <div>
          <Progress percent={progress} size="small" />
          <Text className="text-xs text-gray-500">
            {record.completedLessons}/{record.totalLessons} buổi
          </Text>
        </div>
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
          <Tooltip title="Xem chi tiết">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<MdEdit />}
              onClick={() => {
                setSelectedStudent(record);
                setEditStudentModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Điểm danh">
            <Button
              size="small"
              icon={<MdAssignment />}
              onClick={() => {
                setSelectedStudent(record);
                setAttendanceModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Phản hồi">
            <Button size="small" icon={<MdFeedback />} />
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

  const renderStudentList = () => (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            placeholder="Tìm kiếm học viên..."
            prefix={<MdSearch />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Lọc theo khóa học"
            value={filterCourse}
            onChange={setFilterCourse}
            allowClear
            className="w-full sm:w-48"
          >
            {courses.map((course) => (
              <Select.Option key={course.id} value={course.id.toString()}>
                {course.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button
          type="primary"
          icon={<MdAdd />}
          onClick={() => setAddStudentModalVisible(true)}
        >
          Thêm học viên
        </Button>
      </div>

      <Table
        columns={studentColumns}
        dataSource={filteredStudents}
        rowKey="id"
        pagination={{ pageSize: 10 }}
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
                Quản lý học viên
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Theo dõi tiến độ và thông tin học viên của bạn
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAssignment />}>
                Điểm danh hàng loạt
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
                <MdGroup className="mr-2" />
                Tất cả ({students.length})
              </span>
            }
            key="all"
          >
            {renderStudentList()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdPerson className="mr-2" />
                Đang học ({students.filter((s) => s.status === "active").length}
                )
              </span>
            }
            key="active"
          >
            {renderStudentList()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdTrendingUp className="mr-2" />
                Hoàn thành ({students.filter((s) => s.progress === 100).length})
              </span>
            }
            key="completed"
          >
            {renderStudentList()}
          </TabPane>
        </Tabs>

        {/* Add Student Modal */}
        <Modal
          title="Thêm học viên mới"
          open={addStudentModalVisible}
          onCancel={() => setAddStudentModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Khóa học"
              name="courseId"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn khóa học">
                {courses.map((course) => (
                  <Select.Option key={course.id} value={course.id}>
                    {course.name} - {course.level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày bắt đầu"
              name="joinDate"
              rules={[{ required: true }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setAddStudentModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Thêm học viên thành công!");
                  setAddStudentModalVisible(false);
                }}
              >
                Thêm học viên
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Edit Student Modal */}
        <Modal
          title="Chỉnh sửa thông tin học viên"
          open={editStudentModalVisible}
          onCancel={() => setEditStudentModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" initialValues={selectedStudent}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập họ và tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              label="Khóa học"
              name="courseId"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn khóa học">
                {courses.map((course) => (
                  <Select.Option key={course.id} value={course.id}>
                    {course.name} - {course.level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Select.Option value="active">Đang học</Select.Option>
                <Select.Option value="inactive">Tạm dừng</Select.Option>
              </Select>
            </Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setEditStudentModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Cập nhật thông tin thành công!");
                  setEditStudentModalVisible(false);
                }}
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Attendance Modal */}
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
                  <Select
                    placeholder="Chọn khóa học"
                    value={selectedStudent?.courseId}
                  >
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
              <Title level={5}>Học viên: {selectedStudent?.name}</Title>
              <div className="flex items-center space-x-4 mt-2">
                <Avatar size={40}>{selectedStudent?.name?.charAt(0)}</Avatar>
                <div>
                  <Text strong>{selectedStudent?.name}</Text>
                  <br />
                  <Text type="secondary" className="text-sm">
                    {selectedStudent?.email}
                  </Text>
                </div>
              </div>
              <Divider />
              <div className="flex justify-center space-x-4">
                <Button
                  type="primary"
                  size="large"
                  className="bg-green-500 border-green-500"
                >
                  Có mặt
                </Button>
                <Button size="large" danger>
                  Vắng mặt
                </Button>
                <Button size="large">Có phép</Button>
              </div>
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
