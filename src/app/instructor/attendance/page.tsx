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
  Checkbox,
  Radio,
} from "antd";
import {
  MdGroup,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdCalendarToday,
  MdTrendingUp,
  MdAssignment,
  MdPerson,
  MdCheckCircle,
  MdCancel,
  MdSchedule,
  MdVisibility,
  MdDownload,
  MdPrint,
  MdBook,
  MdAccessTime,
} from "react-icons/md";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function AttendancePage() {
  const { user } = useAuth();
  return <AttendanceContent user={user} />;
}

function AttendanceContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("today");
  const [attendanceModalVisible, setAttendanceModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [form] = Form.useForm();

  // Mock data
  const lessons = [
    {
      id: 1,
      title: "Bơi cơ bản - Buổi 5",
      course: "Bơi cơ bản",
      courseId: 1,
      date: "2024-01-22",
      startTime: "18:00",
      endTime: "19:00",
      students: 8,
      maxStudents: 15,
      location: "Bể bơi ABC",
      status: "scheduled",
      attendanceStatus: "pending", // pending, completed
    },
    {
      id: 2,
      title: "Bơi nâng cao - Buổi 3",
      course: "Bơi nâng cao",
      courseId: 2,
      date: "2024-01-22",
      startTime: "19:00",
      endTime: "20:30",
      students: 6,
      maxStudents: 10,
      location: "Bể bơi XYZ",
      status: "scheduled",
      attendanceStatus: "pending",
    },
    {
      id: 3,
      title: "Bơi cơ bản - Buổi 4",
      course: "Bơi cơ bản",
      courseId: 1,
      date: "2024-01-20",
      startTime: "18:00",
      endTime: "19:00",
      students: 8,
      maxStudents: 15,
      location: "Bể bơi ABC",
      status: "completed",
      attendanceStatus: "completed",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      course: "Bơi cơ bản",
      courseId: 1,
      attendance: 85,
      totalLessons: 20,
      presentLessons: 17,
      absentLessons: 2,
      excusedLessons: 1,
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
      course: "Bơi nâng cao",
      courseId: 2,
      attendance: 90,
      totalLessons: 16,
      presentLessons: 14,
      absentLessons: 1,
      excusedLessons: 1,
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0456789123",
      course: "Bơi cơ bản",
      courseId: 1,
      attendance: 95,
      totalLessons: 20,
      presentLessons: 19,
      absentLessons: 0,
      excusedLessons: 1,
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0567891234",
      course: "Bơi cơ bản",
      courseId: 1,
      attendance: 70,
      totalLessons: 20,
      presentLessons: 14,
      absentLessons: 5,
      excusedLessons: 1,
    },
  ];

  const attendanceRecords = [
    {
      id: 1,
      lessonId: 3,
      lessonTitle: "Bơi cơ bản - Buổi 4",
      date: "2024-01-20",
      students: [
        { id: 1, name: "Nguyễn Văn A", status: "present" },
        { id: 2, name: "Trần Thị B", status: "present" },
        { id: 3, name: "Lê Văn C", status: "present" },
        { id: 4, name: "Phạm Thị D", status: "absent" },
      ],
      totalPresent: 3,
      totalAbsent: 1,
      totalExcused: 0,
    },
  ];

  const stats = [
    {
      title: "Buổi học hôm nay",
      value: lessons.filter((l) => dayjs(l.date).isSame(dayjs(), "day")).length,
      change: "+1",
      changeType: "positive" as const,
      icon: <MdCalendarToday className="text-lg" />,
    },
    {
      title: "Đã điểm danh",
      value: lessons.filter((l) => l.attendanceStatus === "completed").length,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdCheckCircle className="text-lg" />,
    },
    {
      title: "Chưa điểm danh",
      value: lessons.filter((l) => l.attendanceStatus === "pending").length,
      change: "+1",
      changeType: "negative" as const,
      icon: <MdSchedule className="text-lg" />,
    },
    {
      title: "Tỷ lệ có mặt TB",
      value: "87%",
      change: "+3%",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
  ];

  const todayLessons = lessons.filter((l) =>
    dayjs(l.date).isSame(dayjs(), "day")
  );
  const pendingLessons = lessons.filter(
    (l) => l.attendanceStatus === "pending"
  );
  const completedLessons = lessons.filter(
    (l) => l.attendanceStatus === "completed"
  );

  const lessonColumns = [
    {
      title: "Buổi học",
      key: "lesson",
      render: (record: any) => (
        <div>
          <Text strong className="text-sm">
            {record.title}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            {record.course}
          </Text>
        </div>
      ),
    },
    {
      title: "Thời gian",
      key: "time",
      render: (record: any) => (
        <div>
          <div className="flex items-center text-sm">
            <MdCalendarToday className="mr-1" />
            {dayjs(record.date).format("DD/MM/YYYY")}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MdAccessTime className="mr-1" />
            {record.startTime} - {record.endTime}
          </div>
        </div>
      ),
    },
    {
      title: "Học viên",
      key: "students",
      render: (record: any) => (
        <div>
          <Text strong>
            {record.students}/{record.maxStudents}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            <MdPerson className="mr-1" />
            {record.students} người
          </Text>
        </div>
      ),
    },
    {
      title: "Trạng thái điểm danh",
      dataIndex: "attendanceStatus",
      key: "attendanceStatus",
      render: (status: string) => {
        const statusConfig = {
          pending: {
            color: "processing",
            text: "Chưa điểm danh",
            icon: <MdSchedule />,
          },
          completed: {
            color: "success",
            text: "Đã điểm danh",
            icon: <MdCheckCircle />,
          },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <div className="flex items-center">
            <Badge status={config.color as any} />
            <span className="ml-1">{config.text}</span>
          </div>
        );
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Điểm danh">
            <Button
              type="primary"
              size="small"
              icon={<MdAssignment />}
              onClick={() => {
                setSelectedLesson(record);
                setAttendanceModalVisible(true);
              }}
            >
              Điểm danh
            </Button>
          </Tooltip>
          <Tooltip title="Xem chi tiết">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const studentAttendanceColumns = [
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
      title: "Tỷ lệ có mặt",
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
      title: "Có mặt",
      dataIndex: "presentLessons",
      key: "presentLessons",
      render: (present: number, record: any) => (
        <div className="text-center">
          <Text strong className="text-green-600">
            {present}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            /{record.totalLessons}
          </Text>
        </div>
      ),
    },
    {
      title: "Vắng mặt",
      dataIndex: "absentLessons",
      key: "absentLessons",
      render: (absent: number, record: any) => (
        <div className="text-center">
          <Text strong className="text-red-600">
            {absent}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            /{record.totalLessons}
          </Text>
        </div>
      ),
    },
    {
      title: "Có phép",
      dataIndex: "excusedLessons",
      key: "excusedLessons",
      render: (excused: number, record: any) => (
        <div className="text-center">
          <Text strong className="text-orange-600">
            {excused}
          </Text>
          <br />
          <Text type="secondary" className="text-xs">
            /{record.totalLessons}
          </Text>
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (record: any) => (
        <Space>
          <Tooltip title="Xem lịch sử">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
          <Tooltip title="Gửi thông báo">
            <Button size="small" icon={<MdAssignment />} />
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
              so với hôm qua
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderTodayLessons = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Buổi học hôm nay</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdPrint />}>In</Button>
        </Space>
      </div>

      {todayLessons.length > 0 ? (
        <Table
          columns={lessonColumns}
          dataSource={todayLessons}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có buổi học nào hôm nay"
          className="py-8"
        />
      )}
    </Card>
  );

  const renderPendingAttendance = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Chưa điểm danh</Title>
        <Button type="primary" icon={<MdAssignment />}>
          Điểm danh hàng loạt
        </Button>
      </div>

      {pendingLessons.length > 0 ? (
        <Table
          columns={lessonColumns}
          dataSource={pendingLessons}
          rowKey="id"
          pagination={false}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Tất cả buổi học đã được điểm danh"
          className="py-8"
        />
      )}
    </Card>
  );

  const renderStudentAttendance = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thống kê điểm danh học viên</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdFilterList />}>Bộ lọc</Button>
        </Space>
      </div>

      <Table
        columns={studentAttendanceColumns}
        dataSource={students}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );

  const renderAttendanceHistory = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Lịch sử điểm danh</Title>
        <Space>
          <DatePicker
            value={selectedDate}
            onChange={setSelectedDate}
            placeholder="Chọn ngày"
          />
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
        </Space>
      </div>

      {attendanceRecords.length > 0 ? (
        <List
          dataSource={attendanceRecords}
          renderItem={(record) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="flex items-center justify-between">
                    <Text strong>{record.lessonTitle}</Text>
                    <Text type="secondary">
                      {dayjs(record.date).format("DD/MM/YYYY")}
                    </Text>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <Row gutter={16}>
                      <Col span={8}>
                        <Statistic
                          title="Có mặt"
                          value={record.totalPresent}
                          valueStyle={{ color: "#52c41a" }}
                          prefix={<MdCheckCircle />}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Vắng mặt"
                          value={record.totalAbsent}
                          valueStyle={{ color: "#ff4d4f" }}
                          prefix={<MdCancel />}
                        />
                      </Col>
                      <Col span={8}>
                        <Statistic
                          title="Có phép"
                          value={record.totalExcused}
                          valueStyle={{ color: "#faad14" }}
                          prefix={<MdSchedule />}
                        />
                      </Col>
                    </Row>
                  </div>
                }
              />
              <Button size="small" icon={<MdVisibility />}>
                Chi tiết
              </Button>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có dữ liệu điểm danh"
          className="py-8"
        />
      )}
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
                Điểm danh
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Quản lý điểm danh và theo dõi sự có mặt của học viên
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAssignment />}>
                Điểm danh nhanh
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
                <MdCalendarToday className="mr-2" />
                Hôm nay ({todayLessons.length})
              </span>
            }
            key="today"
          >
            {renderTodayLessons()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdSchedule className="mr-2" />
                Chưa điểm danh ({pendingLessons.length})
              </span>
            }
            key="pending"
          >
            {renderPendingAttendance()}
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
            {renderStudentAttendance()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdTrendingUp className="mr-2" />
                Lịch sử
              </span>
            }
            key="history"
          >
            {renderAttendanceHistory()}
          </TabPane>
        </Tabs>

        {/* Attendance Modal */}
        <Modal
          title={`Điểm danh - ${selectedLesson?.title}`}
          open={attendanceModalVisible}
          onCancel={() => setAttendanceModalVisible(false)}
          footer={null}
          width={800}
        >
          <div className="mb-4">
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Ngày: </Text>
                <Text>{dayjs(selectedLesson?.date).format("DD/MM/YYYY")}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Thời gian: </Text>
                <Text>
                  {selectedLesson?.startTime} - {selectedLesson?.endTime}
                </Text>
              </Col>
            </Row>
          </div>

          <Divider />

          <div className="mb-4">
            <Title level={5}>Danh sách học viên</Title>
          </div>

          <List
            dataSource={students.filter(
              (s) => s.courseId === selectedLesson?.courseId
            )}
            renderItem={(student) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{student.name.charAt(0)}</Avatar>}
                  title={student.name}
                  description={student.email}
                />
                <Radio.Group defaultValue="present">
                  <Space>
                    <Radio value="present">
                      <span className="text-green-600">Có mặt</span>
                    </Radio>
                    <Radio value="absent">
                      <span className="text-red-600">Vắng mặt</span>
                    </Radio>
                    <Radio value="excused">
                      <span className="text-orange-600">Có phép</span>
                    </Radio>
                  </Space>
                </Radio.Group>
              </List.Item>
            )}
          />

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
        </Modal>
      </div>
    </div>
  );
}
