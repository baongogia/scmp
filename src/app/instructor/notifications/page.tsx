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
  message,
  Tooltip,
  Empty,
  Statistic,
  Divider,
  Tabs,
  List,
  Switch,
  Radio,
} from "antd";
import {
  MdNotifications,
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
  MdDelete,
  MdBook,
  MdAccessTime,
  MdGroup,
  MdAttachMoney,
  MdEmail,
  MdSms,
  MdPushPin,
  MdMarkEmailRead,
  MdMarkEmailUnread,
  MdDownload,
} from "react-icons/md";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function NotificationsPage() {
  const { user } = useAuth();
  return <NotificationsContent user={user} />;
}

function NotificationsContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("all");
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [form] = Form.useForm();

  // Mock data
  const notifications = [
    {
      id: 1,
      title: "Buổi học bơi cơ bản sắp bắt đầu",
      content:
        "Buổi học bơi cơ bản sẽ bắt đầu lúc 18:00 hôm nay tại bể bơi ABC. Vui lòng có mặt đúng giờ.",
      type: "lesson_reminder",
      priority: "high",
      status: "unread",
      createdDate: "2024-01-22T10:00:00",
      scheduledDate: "2024-01-22T18:00:00",
      recipients: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"],
      recipientCount: 3,
      sentBy: "Hệ thống",
    },
    {
      id: 2,
      title: "Thông báo nghỉ học ngày mai",
      content:
        "Do thời tiết xấu, buổi học ngày mai sẽ được hoãn. Lịch học mới sẽ được thông báo sau.",
      type: "lesson_cancellation",
      priority: "high",
      status: "read",
      createdDate: "2024-01-21T15:30:00",
      scheduledDate: "2024-01-23T18:00:00",
      recipients: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
      recipientCount: 4,
      sentBy: "Nguyễn Văn A",
    },
    {
      id: 3,
      title: "Nhắc nhở thanh toán học phí",
      content:
        "Học phí tháng 1/2024 đã đến hạn thanh toán. Vui lòng thanh toán trước ngày 25/01/2024.",
      type: "payment_reminder",
      priority: "medium",
      status: "read",
      createdDate: "2024-01-20T09:00:00",
      scheduledDate: "2024-01-25T00:00:00",
      recipients: ["Trần Thị B", "Lê Văn C"],
      recipientCount: 2,
      sentBy: "Hệ thống",
    },
    {
      id: 4,
      title: "Thông báo kiểm tra giữa khóa",
      content:
        "Buổi kiểm tra giữa khóa sẽ diễn ra vào thứ 6 tuần này. Học viên cần chuẩn bị kỹ lưỡng.",
      type: "exam_notification",
      priority: "medium",
      status: "unread",
      createdDate: "2024-01-19T14:00:00",
      scheduledDate: "2024-01-26T18:00:00",
      recipients: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D"],
      recipientCount: 4,
      sentBy: "Nguyễn Văn A",
    },
    {
      id: 5,
      title: "Chúc mừng hoàn thành khóa học",
      content:
        "Xin chúc mừng bạn đã hoàn thành khóa học bơi cơ bản. Chứng chỉ sẽ được gửi qua email trong 3 ngày tới.",
      type: "course_completion",
      priority: "low",
      status: "read",
      createdDate: "2024-01-18T16:00:00",
      scheduledDate: "2024-01-18T16:00:00",
      recipients: ["Lê Văn C"],
      recipientCount: 1,
      sentBy: "Hệ thống",
    },
  ];

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0987654321",
    },
    { id: 3, name: "Lê Văn C", email: "levanc@email.com", phone: "0456789123" },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0567891234",
    },
  ];

  const stats = [
    {
      title: "Tổng thông báo",
      value: notifications.length,
      change: "+3",
      changeType: "positive" as const,
      icon: <MdNotifications className="text-lg" />,
    },
    {
      title: "Chưa đọc",
      value: notifications.filter((n) => n.status === "unread").length,
      change: "+1",
      changeType: "negative" as const,
      icon: <MdMarkEmailUnread className="text-lg" />,
    },
    {
      title: "Đã gửi hôm nay",
      value: notifications.filter((n) =>
        dayjs(n.createdDate).isSame(dayjs(), "day")
      ).length,
      change: "+2",
      changeType: "positive" as const,
      icon: <MdEmail className="text-lg" />,
    },
    {
      title: "Tỷ lệ đọc",
      value: "78%",
      change: "+5%",
      changeType: "positive" as const,
      icon: <MdTrendingUp className="text-lg" />,
    },
  ];

  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(
    (n) => n.status === "unread"
  );
  const sentNotifications = notifications.filter((n) => n.status === "read");

  const notificationColumns = [
    {
      title: "Thông báo",
      key: "notification",
      render: (record: any) => (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {record.status === "unread" ? (
              <div className="w-2 h-2 bg-blue-600 rounded-full" />
            ) : (
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Text strong className="text-sm">
                {record.title}
              </Text>
              {record.priority === "high" && (
                <MdPushPin className="text-red-500 text-sm" />
              )}
            </div>
            <Text type="secondary" className="text-xs line-clamp-2">
              {record.content}
            </Text>
            <div className="flex items-center space-x-4 mt-1">
              <Text type="secondary" className="text-xs">
                {dayjs(record.createdDate).format("DD/MM/YYYY HH:mm")}
              </Text>
              <Text type="secondary" className="text-xs">
                {record.recipientCount} người nhận
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type: string) => {
        const typeConfig = {
          lesson_reminder: { color: "blue", text: "Nhắc nhở học" },
          lesson_cancellation: { color: "red", text: "Hủy buổi học" },
          payment_reminder: { color: "orange", text: "Nhắc thanh toán" },
          exam_notification: { color: "purple", text: "Thông báo thi" },
          course_completion: { color: "green", text: "Hoàn thành khóa" },
        };
        const config = typeConfig[type as keyof typeof typeConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Ưu tiên",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const priorityConfig = {
          high: { color: "red", text: "Cao" },
          medium: { color: "orange", text: "Trung bình" },
          low: { color: "green", text: "Thấp" },
        };
        const config = priorityConfig[priority as keyof typeof priorityConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const statusConfig = {
          read: { color: "success", text: "Đã đọc", icon: <MdMarkEmailRead /> },
          unread: {
            color: "processing",
            text: "Chưa đọc",
            icon: <MdMarkEmailUnread />,
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
          <Tooltip title="Xem chi tiết">
            <Button
              size="small"
              icon={<MdVisibility />}
              onClick={() => setSelectedNotification(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button size="small" icon={<MdEdit />} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button size="small" icon={<MdDelete />} danger />
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

  const renderNotificationList = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Danh sách thông báo</Title>
        <Space>
          <Button
            type="primary"
            icon={<MdAdd />}
            onClick={() => setSendModalVisible(true)}
          >
            Gửi thông báo
          </Button>
        </Space>
      </div>

      <Table
        columns={notificationColumns}
        dataSource={allNotifications}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 800 }}
      />
    </Card>
  );

  const renderUnreadNotifications = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thông báo chưa đọc</Title>
        <Button type="primary" icon={<MdMarkEmailRead />}>
          Đánh dấu tất cả đã đọc
        </Button>
      </div>

      {unreadNotifications.length > 0 ? (
        <Table
          columns={notificationColumns}
          dataSource={unreadNotifications}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Không có thông báo chưa đọc"
          className="py-8"
        />
      )}
    </Card>
  );

  const renderSentNotifications = () => (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Thông báo đã gửi</Title>
        <Space>
          <Button icon={<MdDownload />}>Xuất báo cáo</Button>
          <Button icon={<MdFilterList />}>Bộ lọc</Button>
        </Space>
      </div>

      <Table
        columns={notificationColumns}
        dataSource={sentNotifications}
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
                Thông báo
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Quản lý và gửi thông báo đến học viên
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdFilterList />}>Bộ lọc</Button>
              <Button type="primary" icon={<MdAdd />}>
                Gửi thông báo
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
                <MdNotifications className="mr-2" />
                Tất cả ({allNotifications.length})
              </span>
            }
            key="all"
          >
            {renderNotificationList()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdMarkEmailUnread className="mr-2" />
                Chưa đọc ({unreadNotifications.length})
              </span>
            }
            key="unread"
          >
            {renderUnreadNotifications()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdMarkEmailRead className="mr-2" />
                Đã gửi ({sentNotifications.length})
              </span>
            }
            key="sent"
          >
            {renderSentNotifications()}
          </TabPane>
        </Tabs>

        {/* Send Notification Modal */}
        <Modal
          title="Gửi thông báo mới"
          open={sendModalVisible}
          onCancel={() => setSendModalVisible(false)}
          footer={null}
          width={700}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Loại thông báo"
              name="type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn loại thông báo">
                <Select.Option value="lesson_reminder">
                  Nhắc nhở buổi học
                </Select.Option>
                <Select.Option value="lesson_cancellation">
                  Hủy buổi học
                </Select.Option>
                <Select.Option value="payment_reminder">
                  Nhắc thanh toán
                </Select.Option>
                <Select.Option value="exam_notification">
                  Thông báo thi
                </Select.Option>
                <Select.Option value="course_completion">
                  Hoàn thành khóa học
                </Select.Option>
                <Select.Option value="general">Thông báo chung</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập tiêu đề thông báo" />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="Nhập nội dung thông báo" />
            </Form.Item>

            <Form.Item
              label="Người nhận"
              name="recipients"
              rules={[{ required: true }]}
            >
              <Select mode="multiple" placeholder="Chọn học viên">
                {students.map((student) => (
                  <Select.Option key={student.id} value={student.id}>
                    {student.name} - {student.email}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Ưu tiên" name="priority">
                  <Radio.Group>
                    <Radio value="high">Cao</Radio>
                    <Radio value="medium">Trung bình</Radio>
                    <Radio value="low">Thấp</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Thời gian gửi" name="scheduledDate">
                  <DatePicker
                    showTime
                    className="w-full"
                    placeholder="Chọn thời gian gửi"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Phương thức gửi" name="methods">
              <Select mode="multiple" placeholder="Chọn phương thức">
                <Select.Option value="email">Email</Select.Option>
                <Select.Option value="sms">SMS</Select.Option>
                <Select.Option value="push">Push notification</Select.Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end space-x-2">
              <Button onClick={() => setSendModalVisible(false)}>Hủy</Button>
              <Button
                type="primary"
                onClick={() => {
                  message.success("Gửi thông báo thành công!");
                  setSendModalVisible(false);
                }}
              >
                Gửi thông báo
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Notification Detail Modal */}
        <Modal
          title="Chi tiết thông báo"
          open={!!selectedNotification}
          onCancel={() => setSelectedNotification(null)}
          footer={null}
          width={600}
        >
          {selectedNotification && (
            <div>
              <div className="mb-4">
                <Title level={4}>{selectedNotification.title}</Title>
                <div className="flex items-center space-x-4 mb-2">
                  <Tag color="blue">Nhắc nhở buổi học</Tag>
                  <Tag color="red">Cao</Tag>
                  <Badge status="processing" text="Chưa đọc" />
                </div>
              </div>

              <Divider />

              <div className="mb-4">
                <Text strong>Nội dung:</Text>
                <div className="mt-2 p-3 bg-gray-50 rounded">
                  {selectedNotification.content}
                </div>
              </div>

              <div className="mb-4">
                <Text strong>
                  Người nhận ({selectedNotification.recipientCount}):
                </Text>
                <div className="mt-2">
                  {selectedNotification.recipients.map(
                    (recipient: string, index: number) => (
                      <Tag key={index} className="mb-1">
                        {recipient}
                      </Tag>
                    )
                  )}
                </div>
              </div>

              <Row gutter={16} className="mb-4">
                <Col span={12}>
                  <Text strong>Ngày tạo:</Text>
                  <div>
                    {dayjs(selectedNotification.createdDate).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <Text strong>Người gửi:</Text>
                  <div>{selectedNotification.sentBy}</div>
                </Col>
              </Row>

              <div className="flex justify-end space-x-2">
                <Button onClick={() => setSelectedNotification(null)}>
                  Đóng
                </Button>
                <Button type="primary" icon={<MdEdit />}>
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
