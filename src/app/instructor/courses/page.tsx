"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Tag,
  Progress,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  message,
  Empty,
  Statistic,
  Divider,
  Tabs,
  Upload,
  Rate,
  Tooltip,
} from "antd";
import {
  MdBook,
  MdEdit,
  MdAdd,
  MdSearch,
  MdFilterList,
  MdGroup,
  MdCalendarToday,
  MdTrendingUp,
  MdSchedule,
  MdDelete,
  MdVisibility,
  MdStar,
  MdAttachMoney,
  MdLocationOn,
  MdAccessTime,
  MdPerson,
} from "react-icons/md";
import { useState, useEffect } from "react";
import {
  PageHeader,
  StatsCards,
  SearchAndFilter,
  ActionButtons,
  DataTable,
  CellRenderers,
  type StatItem,
  type FilterOption,
  type ActionButton,
} from "@/components/common";
import { ColDef } from "ag-grid-community";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function CoursesPage() {
  const { user } = useAuth();
  return <CoursesContent user={user} />;
}

function CoursesContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("all");
  const [addCourseModalVisible, setAddCourseModalVisible] = useState(false);
  const [editCourseModalVisible, setEditCourseModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [form] = Form.useForm();

  // Mock data
  const courses = [
    {
      id: 1,
      name: "Bơi cơ bản cho người mới",
      description: "Khóa học dành cho người chưa biết bơi, học từ cơ bản nhất",
      level: "Cơ bản",
      levelId: 1,
      students: 12,
      maxStudents: 15,
      progress: 60,
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      price: 2500000,
      duration: 8,
      lessons: 20,
      completedLessons: 12,
      rating: 4.8,
      instructor: "Nguyễn Văn A",
      location: "Bể bơi ABC",
      schedule: "Thứ 2, 4, 6 - 18:00-19:00",
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      name: "Bơi nâng cao",
      description: "Nâng cao kỹ thuật bơi cho người đã biết bơi cơ bản",
      level: "Nâng cao",
      levelId: 2,
      students: 8,
      maxStudents: 10,
      progress: 40,
      status: "active",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      price: 3000000,
      duration: 8,
      lessons: 16,
      completedLessons: 6,
      rating: 4.9,
      instructor: "Trần Thị B",
      location: "Bể bơi XYZ",
      schedule: "Thứ 3, 5, 7 - 19:00-20:30",
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      name: "Bơi tự do chuyên nghiệp",
      description: "Khóa học chuyên sâu về kỹ thuật bơi tự do",
      level: "Chuyên nghiệp",
      levelId: 3,
      students: 6,
      maxStudents: 8,
      progress: 80,
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-02-28",
      price: 4000000,
      duration: 8,
      lessons: 12,
      completedLessons: 10,
      rating: 5.0,
      instructor: "Lê Văn C",
      location: "Bể bơi Olympic",
      schedule: "Thứ 2, 4, 6 - 20:00-21:30",
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      name: "Bơi ếch cơ bản",
      description: "Học kỹ thuật bơi ếch từ cơ bản",
      level: "Cơ bản",
      levelId: 1,
      students: 10,
      maxStudents: 12,
      progress: 25,
      status: "upcoming",
      startDate: "2024-03-01",
      endDate: "2024-05-01",
      price: 2200000,
      duration: 8,
      lessons: 16,
      completedLessons: 4,
      rating: 0,
      instructor: "Phạm Thị D",
      location: "Bể bơi DEF",
      schedule: "Thứ 3, 5 - 18:30-19:30",
      image: "/api/placeholder/300/200",
    },
  ];

  const levels = [
    { id: 1, name: "Cơ bản", color: "green" },
    { id: 2, name: "Nâng cao", color: "blue" },
    { id: 3, name: "Chuyên nghiệp", color: "purple" },
  ];

  const stats = [
    {
      title: "Tổng khóa học",
      value: courses.length,
      change: "+1",
      changeType: "positive" as const,
      icon: <MdBook className="text-lg" />,
    },
    {
      title: "Đang diễn ra",
      value: courses.filter((c) => c.status === "active").length,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Tổng học viên",
      value: courses.reduce((sum, c) => sum + c.students, 0),
      change: "+8",
      changeType: "positive" as const,
      icon: <MdGroup className="text-lg" />,
    },
    {
      title: "Đánh giá TB",
      value: "4.7/5",
      change: "+0.2",
      changeType: "positive" as const,
      icon: <MdStar className="text-lg" />,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      course.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesLevel =
      !filterLevel || course.levelId.toString() === filterLevel;
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "active" && course.status === "active") ||
      (activeTab === "upcoming" && course.status === "upcoming") ||
      (activeTab === "completed" && course.status === "completed");

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const courseColumns: ColDef<any>[] = [
    {
      headerName: "Khóa học",
      field: "course",
      cellRenderer: (params: any) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <MdBook className="text-white text-lg" />
          </div>
          <div>
            <Text strong className="text-sm">
              {params.data.name}
            </Text>
            <br />
            <Text type="secondary" className="text-xs">
              {params.data.description}
            </Text>
          </div>
        </div>
      ),
      width: 300,
    },
    {
      headerName: "Cấp độ",
      field: "level",
      cellRenderer: (params: any) => {
        const levelData = levels.find((l) => l.name === params.value);
        return <Tag color={levelData?.color}>{params.value}</Tag>;
      },
      width: 120,
    },
    {
      headerName: "Học viên",
      field: "students",
      cellRenderer: (params: any) => (
        <div>
          <Text strong>
            {params.data.students}/{params.data.maxStudents}
          </Text>
          <br />
          <Progress
            percent={Math.round(
              (params.data.students / params.data.maxStudents) * 100
            )}
            size="small"
            showInfo={false}
          />
        </div>
      ),
      width: 150,
    },
    {
      headerName: "Tiến độ",
      field: "progress",
      cellRenderer: (params: any) => (
        <div>
          <Progress percent={params.value} size="small" />
          <Text className="text-xs text-gray-500">
            {params.data.completedLessons}/{params.data.lessons} buổi
          </Text>
        </div>
      ),
      width: 160,
    },
    {
      headerName: "Đánh giá",
      field: "rating",
      cellRenderer: (params: any) => (
        <div className="flex items-center">
          <Rate disabled value={params.value} className="text-xs" />
          <Text className="ml-1 text-xs">{params.value}</Text>
        </div>
      ),
      width: 140,
    },
    {
      headerName: "Giá",
      field: "price",
      cellRenderer: (params: any) => (
        <Text strong className="text-green-600">
          {params.value.toLocaleString()} VND
        </Text>
      ),
      width: 140,
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellRenderer: (params: any) => {
        const statusConfig = {
          active: { color: "success", text: "Đang diễn ra" },
          upcoming: { color: "processing", text: "Sắp bắt đầu" },
          completed: { color: "default", text: "Đã hoàn thành" },
        } as const;
        const config = statusConfig[params.value as keyof typeof statusConfig];
        return <Badge status={config.color as any} text={config.text} />;
      },
      width: 140,
    },
    {
      headerName: "Thao tác",
      field: "actions",
      cellRenderer: (params: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button size="small" icon={<MdVisibility />} />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              size="small"
              icon={<MdEdit />}
              onClick={() => {
                setSelectedCourse(params.data);
                setEditCourseModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Lịch học">
            <Button size="small" icon={<MdSchedule />} />
          </Tooltip>
          <Tooltip title="Học viên">
            <Button size="small" icon={<MdGroup />} />
          </Tooltip>
        </Space>
      ),
      sortable: false,
      filter: false,
      width: 200,
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

  const renderCourseList = () => (
    <Card>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            placeholder="Tìm kiếm khóa học..."
            prefix={<MdSearch />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full sm:w-64"
          />
          <Select
            placeholder="Lọc theo cấp độ"
            value={filterLevel}
            onChange={setFilterLevel}
            allowClear
            className="w-full sm:w-48"
          >
            {levels.map((level) => (
              <Select.Option key={level.id} value={level.id.toString()}>
                {level.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <Button
          type="primary"
          icon={<MdAdd />}
          onClick={() => setAddCourseModalVisible(true)}
        >
          Tạo khóa học
        </Button>
      </div>

      <DataTable
        columnDefs={courseColumns as ColDef<any>[]}
        rowData={filteredCourses}
        pagination={true}
        paginationPageSize={10}
        getRowId={(params) => params.data.id.toString()}
      />
    </Card>
  );

  const renderCourseGrid = () => (
    <Row gutter={[24, 24]}>
      {filteredCourses.map((course) => (
        <Col xs={24} md={12} lg={8} key={course.id}>
          <Card
            className="h-full course-card"
            cover={
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <MdBook className="text-white text-6xl" />
              </div>
            }
            actions={[
              <Button key="view" type="text" icon={<MdVisibility />}>
                Xem
              </Button>,
              <Button key="edit" type="text" icon={<MdEdit />}>
                Sửa
              </Button>,
              <Button key="schedule" type="text" icon={<MdSchedule />}>
                Lịch
              </Button>,
            ]}
          >
            <div className="mb-4">
              <Title level={4} className="mb-2">
                {course.name}
              </Title>
              <Tag color={levels.find((l) => l.name === course.level)?.color}>
                {course.level}
              </Tag>
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

              <div className="flex justify-between">
                <Text>Đánh giá:</Text>
                <div className="flex items-center">
                  <Rate disabled value={course.rating} className="text-xs" />
                  <Text className="ml-1 text-xs">{course.rating}</Text>
                </div>
              </div>

              <div className="flex justify-between">
                <Text>Giá:</Text>
                <Text strong className="text-green-600">
                  {course.price.toLocaleString()} VND
                </Text>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <span>{course.startDate}</span>
                <span>{course.endDate}</span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <MdLocationOn className="mr-1" />
                  {course.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MdAccessTime className="mr-1" />
                  {course.schedule}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
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
                Quản lý khóa học
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Tạo và quản lý các khóa học bơi của bạn
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAdd />}>
                Tạo khóa học
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
                <MdBook className="mr-2" />
                Tất cả ({courses.length})
              </span>
            }
            key="all"
          >
            <Tabs defaultActiveKey="list" size="small">
              <TabPane tab="Danh sách" key="list">
                {renderCourseList()}
              </TabPane>
              <TabPane tab="Lưới" key="grid">
                {renderCourseGrid()}
              </TabPane>
            </Tabs>
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdTrendingUp className="mr-2" />
                Đang diễn ra (
                {courses.filter((c) => c.status === "active").length})
              </span>
            }
            key="active"
          >
            {renderCourseList()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdCalendarToday className="mr-2" />
                Sắp bắt đầu (
                {courses.filter((c) => c.status === "upcoming").length})
              </span>
            }
            key="upcoming"
          >
            {renderCourseList()}
          </TabPane>
        </Tabs>

        {/* Add Course Modal */}
        <Modal
          title="Tạo khóa học mới"
          open={addCourseModalVisible}
          onCancel={() => setAddCourseModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên khóa học"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên khóa học" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Cấp độ"
                  name="levelId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn cấp độ">
                    {levels.map((level) => (
                      <Select.Option key={level.id} value={level.id}>
                        {level.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} placeholder="Nhập mô tả khóa học" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Số học viên tối đa"
                  name="maxStudents"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={50} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số buổi học"
                  name="lessons"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={100} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian (tuần)"
                  name="duration"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={52} className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày bắt đầu"
                  name="startDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày kết thúc"
                  name="endDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giá khóa học (VND)"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập địa điểm" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Lịch học"
              name="schedule"
              rules={[{ required: true }]}
            >
              <Input placeholder="VD: Thứ 2, 4, 6 - 18:00-19:00" />
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setAddCourseModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Tạo khóa học thành công!");
                  setAddCourseModalVisible(false);
                }}
              >
                Tạo khóa học
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Edit Course Modal */}
        <Modal
          title="Chỉnh sửa khóa học"
          open={editCourseModalVisible}
          onCancel={() => setEditCourseModalVisible(false)}
          footer={null}
          width={800}
        >
          <Form form={form} layout="vertical" initialValues={selectedCourse}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Tên khóa học"
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập tên khóa học" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Cấp độ"
                  name="levelId"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Chọn cấp độ">
                    {levels.map((level) => (
                      <Select.Option key={level.id} value={level.id}>
                        {level.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true }]}
            >
              <TextArea rows={3} placeholder="Nhập mô tả khóa học" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="Số học viên tối đa"
                  name="maxStudents"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={50} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số buổi học"
                  name="lessons"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={100} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thời gian (tuần)"
                  name="duration"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={1} max={52} className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ngày bắt đầu"
                  name="startDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Ngày kết thúc"
                  name="endDate"
                  rules={[{ required: true }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Giá khóa học (VND)"
                  name="price"
                  rules={[{ required: true }]}
                >
                  <InputNumber min={0} className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Nhập địa điểm" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Lịch học"
              name="schedule"
              rules={[{ required: true }]}
            >
              <Input placeholder="VD: Thứ 2, 4, 6 - 18:00-19:00" />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Select>
                <Select.Option value="active">Đang diễn ra</Select.Option>
                <Select.Option value="upcoming">Sắp bắt đầu</Select.Option>
                <Select.Option value="completed">Đã hoàn thành</Select.Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setEditCourseModalVisible(false)}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Cập nhật khóa học thành công!");
                  setEditCourseModalVisible(false);
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
