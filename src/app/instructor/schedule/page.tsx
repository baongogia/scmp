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
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  message,
  Tooltip,
  Empty,
  Statistic,
  Divider,
  Tabs,
  Calendar,
  List,
  Popover,
} from "antd";
import {
  MdCalendarToday,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdGroup,
  MdAccessTime,
  MdLocationOn,
  MdTrendingUp,
  MdSchedule,
  MdDelete,
  MdVisibility,
  MdPerson,
  MdBook,
  MdEvent,
  MdToday,
  MdDateRange,
} from "react-icons/md";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

export default function SchedulePage() {
  const { user } = useAuth();
  return <ScheduleContent user={user} />;
}

function ScheduleContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("calendar");
  const [addLessonModalVisible, setAddLessonModalVisible] = useState(false);
  const [editLessonModalVisible, setEditLessonModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
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
      instructor: "Nguyễn Văn A",
      description: "Học kỹ thuật thở và nổi",
      type: "regular",
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
      instructor: "Trần Thị B",
      description: "Kỹ thuật bơi bướm cơ bản",
      type: "regular",
    },
    {
      id: 3,
      title: "Bơi cơ bản - Buổi 6",
      course: "Bơi cơ bản",
      courseId: 1,
      date: "2024-01-24",
      startTime: "18:00",
      endTime: "19:00",
      students: 8,
      maxStudents: 15,
      location: "Bể bơi ABC",
      status: "scheduled",
      instructor: "Nguyễn Văn A",
      description: "Học kỹ thuật đạp chân",
      type: "regular",
    },
    {
      id: 4,
      title: "Bơi tự do - Buổi 8",
      course: "Bơi tự do",
      courseId: 3,
      date: "2024-01-24",
      startTime: "20:00",
      endTime: "21:30",
      students: 6,
      maxStudents: 8,
      location: "Bể bơi Olympic",
      status: "completed",
      instructor: "Lê Văn C",
      description: "Kỹ thuật bơi tự do nâng cao",
      type: "regular",
    },
    {
      id: 5,
      title: "Kiểm tra giữa khóa",
      course: "Bơi cơ bản",
      courseId: 1,
      date: "2024-01-26",
      startTime: "18:00",
      endTime: "19:30",
      students: 12,
      maxStudents: 15,
      location: "Bể bơi ABC",
      status: "scheduled",
      instructor: "Nguyễn Văn A",
      description: "Kiểm tra tiến độ học viên",
      type: "exam",
    },
  ];

  const courses = [
    { id: 1, name: "Bơi cơ bản", color: "blue" },
    { id: 2, name: "Bơi nâng cao", color: "green" },
    { id: 3, name: "Bơi tự do", color: "purple" },
  ];

  const stats = [
    {
      title: "Buổi học tuần này",
      value: lessons.filter((l) => {
        const lessonDate = dayjs(l.date);
        const startOfWeek = dayjs().startOf("week");
        const endOfWeek = dayjs().endOf("week");
        return (
          lessonDate.isSame(startOfWeek, "day") ||
          lessonDate.isSame(endOfWeek, "day")
        );
      }).length,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdToday className="text-lg" />,
    },
    {
      title: "Đã hoàn thành",
      value: lessons.filter((l) => l.status === "completed").length,
      change: "+1",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Sắp diễn ra",
      value: lessons.filter((l) => l.status === "scheduled").length,
      change: "+3",
      changeType: "positive" as const,
      icon: <MdSchedule className="text-lg" />,
    },
    {
      title: "Tổng học viên",
      value: lessons.reduce((sum, l) => sum + l.students, 0),
      change: "+8",
      changeType: "positive" as const,
      icon: <MdGroup className="text-lg" />,
    },
  ];

  const weeklySchedule = [
    {
      day: "Thứ 2",
      date: "2024-01-22",
      lessons: [
        {
          time: "18:00 - 19:00",
          course: "Bơi cơ bản",
          students: 8,
          location: "Bể bơi ABC",
        },
        {
          time: "19:30 - 20:30",
          course: "Bơi nâng cao",
          students: 6,
          location: "Bể bơi XYZ",
        },
      ],
    },
    {
      day: "Thứ 3",
      date: "2024-01-23",
      lessons: [
        {
          time: "18:30 - 19:30",
          course: "Bơi ếch",
          students: 10,
          location: "Bể bơi DEF",
        },
      ],
    },
    {
      day: "Thứ 4",
      date: "2024-01-24",
      lessons: [
        {
          time: "18:00 - 19:00",
          course: "Bơi cơ bản",
          students: 8,
          location: "Bể bơi ABC",
        },
        {
          time: "20:00 - 21:30",
          course: "Bơi tự do",
          students: 6,
          location: "Bể bơi Olympic",
        },
      ],
    },
    {
      day: "Thứ 5",
      date: "2024-01-25",
      lessons: [
        {
          time: "19:00 - 20:30",
          course: "Bơi nâng cao",
          students: 6,
          location: "Bể bơi XYZ",
        },
      ],
    },
    {
      day: "Thứ 6",
      date: "2024-01-26",
      lessons: [
        {
          time: "18:00 - 19:30",
          course: "Kiểm tra giữa khóa",
          students: 12,
          location: "Bể bơi ABC",
        },
      ],
    },
    {
      day: "Thứ 7",
      date: "2024-01-27",
      lessons: [],
    },
    {
      day: "Chủ nhật",
      date: "2024-01-28",
      lessons: [
        {
          time: "09:00 - 10:30",
          course: "Bơi cơ bản",
          students: 10,
          location: "Bể bơi ABC",
        },
        {
          time: "15:00 - 16:30",
          course: "Bơi tự do",
          students: 6,
          location: "Bể bơi Olympic",
        },
      ],
    },
  ];

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
            {record.description}
          </Text>
        </div>
      ),
    },
    {
      title: "Khóa học",
      dataIndex: "course",
      key: "course",
      render: (course: string, record: any) => {
        const courseData = courses.find((c) => c.name === course);
        return <Tag color={courseData?.color}>{course}</Tag>;
      },
    },
    {
      title: "Ngày & Giờ",
      key: "datetime",
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
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      render: (location: string) => (
        <div className="flex items-center text-sm">
          <MdLocationOn className="mr-1" />
          {location}
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "regular" ? "blue" : "orange"}>
          {type === "regular" ? "Thường" : "Kiểm tra"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig = {
          scheduled: { color: "processing", text: "Sắp diễn ra" },
          completed: { color: "success", text: "Đã hoàn thành" },
          cancelled: { color: "error", text: "Đã hủy" },
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
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<MdEdit />}
              onClick={() => {
                setSelectedLesson(record);
                setEditLessonModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Điểm danh">
            <Button size="small" icon={<MdGroup />} />
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
              so với tuần trước
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );

  const renderCalendarView = () => (
    <Card>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Lịch giảng dạy</Title>
          <Button
            type="primary"
            icon={<MdAdd />}
            onClick={() => setAddLessonModalVisible(true)}
          >
            Thêm buổi học
          </Button>
        </div>
      </div>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        dateCellRender={(date) => {
          const dayLessons = lessons.filter((lesson) =>
            dayjs(lesson.date).isSame(date, "day")
          );

          if (dayLessons.length === 0) return null;

          return (
            <Popover
              content={
                <div>
                  {dayLessons.map((lesson) => (
                    <div key={lesson.id} className="mb-2">
                      <Text strong className="text-xs">
                        {lesson.title}
                      </Text>
                      <br />
                      <Text className="text-xs text-gray-500">
                        {lesson.startTime} - {lesson.endTime}
                      </Text>
                    </div>
                  ))}
                </div>
              }
              title={`${dayLessons.length} buổi học`}
            >
              <div className="w-full h-full">
                {dayLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="text-xs p-1 mb-1 rounded"
                    style={{
                      backgroundColor:
                        courses.find((c) => c.name === lesson.course)?.color ===
                        "blue"
                          ? "#e6f7ff"
                          : courses.find((c) => c.name === lesson.course)
                              ?.color === "green"
                          ? "#f6ffed"
                          : "#f9f0ff",
                      color:
                        courses.find((c) => c.name === lesson.course)?.color ===
                        "blue"
                          ? "#1890ff"
                          : courses.find((c) => c.name === lesson.course)
                              ?.color === "green"
                          ? "#52c41a"
                          : "#722ed1",
                    }}
                  >
                    {lesson.startTime} {lesson.course}
                  </div>
                ))}
              </div>
            </Popover>
          );
        }}
      />
    </Card>
  );

  const renderWeeklyView = () => (
    <Card>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Lịch tuần</Title>
          <Button
            type="primary"
            icon={<MdAdd />}
            onClick={() => setAddLessonModalVisible(true)}
          >
            Thêm buổi học
          </Button>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {weeklySchedule.map((day, index) => (
          <Col xs={24} md={12} lg={8} xl={6} key={index}>
            <Card
              title={
                <div className="text-center">
                  <Text strong>{day.day}</Text>
                  <br />
                  <Text type="secondary" className="text-xs">
                    {dayjs(day.date).format("DD/MM")}
                  </Text>
                </div>
              }
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
                          <div className="flex items-center">
                            <MdAccessTime className="mr-1" />
                            {lesson.time}
                          </div>
                          <div className="flex items-center">
                            <MdPerson className="mr-1" />
                            {lesson.students} học viên
                          </div>
                          <div className="flex items-center">
                            <MdLocationOn className="mr-1" />
                            {lesson.location}
                          </div>
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
    </Card>
  );

  const renderListView = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Danh sách buổi học</Title>
        <Button
          type="primary"
          icon={<MdAdd />}
          onClick={() => setAddLessonModalVisible(true)}
        >
          Thêm buổi học
        </Button>
      </div>

      <Table
        columns={lessonColumns}
        dataSource={lessons}
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
                Lịch giảng dạy
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Quản lý lịch dạy và buổi học của bạn
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAdd />}>
                Thêm buổi học
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
                Lịch
              </span>
            }
            key="calendar"
          >
            {renderCalendarView()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdDateRange className="mr-2" />
                Tuần
              </span>
            }
            key="weekly"
          >
            {renderWeeklyView()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdEvent className="mr-2" />
                Danh sách
              </span>
            }
            key="list"
          >
            {renderListView()}
          </TabPane>
        </Tabs>

        {/* Add Lesson Modal */}
        <Modal
          title="Thêm buổi học mới"
          open={addLessonModalVisible}
          onCancel={() => setAddLessonModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên buổi học"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên buổi học" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Khóa học"
                  name="courseId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn khóa học">
                    {courses.map((course) => (
                      <Select.Option key={course.id} value={course.id}>
                        {course.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} placeholder="Nhập mô tả buổi học" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày học"
                  name="date"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Giờ bắt đầu"
                  name="startTime"
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Giờ kết thúc"
                  name="endTime"
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập địa điểm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Loại buổi học"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn loại buổi học">
                    <Select.Option value="regular">Thường</Select.Option>
                    <Select.Option value="exam">Kiểm tra</Select.Option>
                    <Select.Option value="makeup">Bù</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setAddLessonModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Thêm buổi học thành công!");
                  setAddLessonModalVisible(false);
                }}
              >
                Thêm buổi học
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Edit Lesson Modal */}
        <Modal
          title="Chỉnh sửa buổi học"
          open={editLessonModalVisible}
          onCancel={() => setEditLessonModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" initialValues={selectedLesson}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên buổi học"
                  name="title"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên buổi học" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Khóa học"
                  name="courseId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn khóa học">
                    {courses.map((course) => (
                      <Select.Option key={course.id} value={course.id}>
                        {course.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} placeholder="Nhập mô tả buổi học" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày học"
                  name="date"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Giờ bắt đầu"
                  name="startTime"
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Giờ kết thúc"
                  name="endTime"
                  rules={[{ required: true }]}
                >
                  <TimePicker format="HH:mm" className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập địa điểm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Trạng thái" name="status">
                  <Select>
                    <Select.Option value="scheduled">Sắp diễn ra</Select.Option>
                    <Select.Option value="completed">
                      Đã hoàn thành
                    </Select.Option>
                    <Select.Option value="cancelled">Đã hủy</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setEditLessonModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Cập nhật buổi học thành công!");
                  setEditLessonModalVisible(false);
                }}
              >
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
