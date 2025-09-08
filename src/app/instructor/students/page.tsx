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
  Tag,
  Progress,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
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

  const stats: StatItem[] = [
    {
      title: "Tổng học viên",
      value: students.length,
      change: "+2",
      changeType: "positive",
      icon: <MdGroup className="text-lg" />,
    },
    {
      title: "Đang học",
      value: students.filter((s) => s.status === "active").length,
      change: "+1",
      changeType: "positive",
      icon: <MdPerson className="text-lg" />,
    },
    {
      title: "Hoàn thành",
      value: students.filter((s) => s.progress === 100).length,
      change: "+3",
      changeType: "positive",
      icon: <MdTrendingUp className="text-lg" />,
    },
    {
      title: "Điểm danh TB",
      value: "87%",
      change: "+5%",
      changeType: "positive",
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

  const studentColumns: ColDef[] = [
    {
      headerName: "Học viên",
      field: "student",
      cellRenderer: CellRenderers.AvatarWithInfo,
      valueGetter: (params) => ({
        name: params.data.name,
        email: params.data.email,
        avatar: params.data.avatar,
      }),
      width: 200,
    },
    {
      headerName: "Khóa học",
      field: "course",
      cellRenderer: (params: any) => <Tag color="blue">{params.value}</Tag>,
      width: 120,
    },
    {
      headerName: "Tiến độ",
      field: "progress",
      cellRenderer: CellRenderers.ProgressBar,
      valueGetter: (params) => ({
        value: params.data.completedLessons,
        total: params.data.totalLessons,
        showPercentage: true,
      }),
      width: 150,
    },
    {
      headerName: "Điểm danh",
      field: "attendance",
      cellRenderer: (params: any) => (
        <span
          className={params.value >= 80 ? "text-green-600" : "text-red-600"}
        >
          {params.value}%
        </span>
      ),
      width: 100,
    },
    {
      headerName: "Đánh giá",
      field: "rating",
      cellRenderer: CellRenderers.Rating,
      width: 100,
    },
    {
      headerName: "Trạng thái",
      field: "status",
      cellRenderer: CellRenderers.StatusBadge,
      valueGetter: (params) => ({
        status: params.data.status,
        statusMap: {
          active: { color: "success", text: "Đang học" },
          inactive: { color: "default", text: "Tạm dừng" },
        },
      }),
      width: 120,
    },
    {
      headerName: "Thao tác",
      field: "actions",
      cellRenderer: (params: any) => {
        const actions: ActionButton[] = [
          {
            key: "view",
            icon: <MdVisibility />,
            tooltip: "Xem chi tiết",
            onClick: () => console.log("View", params.data),
          },
          {
            key: "edit",
            icon: <MdEdit />,
            tooltip: "Chỉnh sửa",
            onClick: () => {
              setSelectedStudent(params.data);
              setEditStudentModalVisible(true);
            },
          },
          {
            key: "attendance",
            icon: <MdAssignment />,
            tooltip: "Điểm danh",
            onClick: () => {
              setSelectedStudent(params.data);
              setAttendanceModalVisible(true);
            },
          },
          {
            key: "feedback",
            icon: <MdFeedback />,
            tooltip: "Phản hồi",
            onClick: () => console.log("Feedback", params.data),
          },
        ];
        return <ActionButtons actions={actions} />;
      },
      width: 200,
      sortable: false,
      filter: false,
    },
  ];

  const filterOptions: FilterOption[] = courses.map((course) => ({
    value: course.id.toString(),
    label: course.name,
  }));

  const renderStudentList = () => (
    <Card>
      <SearchAndFilter
        searchPlaceholder="Tìm kiếm học viên..."
        searchValue={searchText}
        onSearchChange={setSearchText}
        filterOptions={filterOptions}
        filterValue={filterCourse}
        onFilterChange={setFilterCourse}
        filterPlaceholder="Lọc theo khóa học"
        actions={
          <Button
            type="primary"
            icon={<MdAdd />}
            onClick={() => setAddStudentModalVisible(true)}
          >
            Thêm học viên
          </Button>
        }
      />

      <DataTable
        rowData={filteredStudents}
        columnDefs={studentColumns}
        height={500}
        pagination={true}
        paginationPageSize={10}
        getRowId={(params) => params.data.id.toString()}
      />
    </Card>
  );

  return (
    <div className="p-4 pt-16 lg:pt-8 md:p-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Quản lý học viên"
          description="Theo dõi tiến độ và thông tin học viên của bạn"
          actions={
            <>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAssignment />}>
                Điểm danh hàng loạt
              </Button>
            </>
          }
        />

        <StatsCards stats={stats} />

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
