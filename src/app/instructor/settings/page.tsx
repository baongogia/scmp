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
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Switch,
  Divider,
  Tabs,
  Upload,
  InputNumber,
  Radio,
  Checkbox,
} from "antd";
import {
  MdSettings,
  MdPerson,
  MdSecurity,
  MdNotifications,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccountBalance,
  MdLanguage,
  MdDarkMode,
  MdSave,
  MdEdit,
  MdCameraAlt,
  MdDelete,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { useState, useEffect, Suspense } from "react";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

function SettingsContent({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [preferencesForm] = Form.useForm();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock data
  const profileData = {
    username: user?.username || "Nguyễn Văn A",
    email: user?.email || "nguyenvana@email.com",
    phone: "0123456789",
    fullName: "Nguyễn Văn A",
    dateOfBirth: null, // Let DatePicker handle the date format
    address: "123 Đường ABC, Quận 1, TP.HCM",
    bio: "Huấn luyện viên bơi lội với 5 năm kinh nghiệm, chuyên về bơi tự do và bơi bướm.",
    specialties: ["freestyle", "butterfly", "backstroke"],
    experience: 5,
    certifications: [
      "Chứng chỉ huấn luyện viên bơi lội",
      "Chứng chỉ sơ cấp cứu",
    ],
    languages: ["vi", "en"],
  };

  const notificationSettings = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    lessonReminders: true,
    paymentReminders: true,
    systemUpdates: false,
    marketingEmails: false,
    reminderTime: "30", // minutes before lesson
  };

  const preferences = {
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
    theme: "light",
    autoSave: true,
    showTutorials: true,
    compactMode: false,
  };

  const renderProfileTab = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card title="Ảnh đại diện" className="text-center">
            <div className="mb-4">
              <Avatar
                size={120}
                src={user?.featured_image?.path}
                className="border-4 border-blue-500"
              >
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </div>
            <Space direction="vertical" className="w-full">
              <Button icon={<MdCameraAlt />} className="w-full">
                Thay đổi ảnh
              </Button>
              <Button danger icon={<MdDelete />} className="w-full">
                Xóa ảnh
              </Button>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Thông tin cá nhân">
            <Form
              form={profileForm}
              layout="vertical"
              initialValues={profileData}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên" },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập tên đăng nhập" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Ngày sinh" name="dateOfBirth">
                <DatePicker className="w-full" format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item label="Địa chỉ" name="address">
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>

              <Form.Item label="Giới thiệu bản thân" name="bio">
                <Input.TextArea
                  rows={4}
                  placeholder="Nhập giới thiệu về bản thân"
                />
              </Form.Item>

              <Form.Item label="Kinh nghiệm (năm)" name="experience">
                <InputNumber min={0} max={50} className="w-full" />
              </Form.Item>

              <Form.Item label="Chuyên môn" name="specialties">
                <Select mode="multiple" placeholder="Chọn chuyên môn">
                  <Select.Option value="freestyle">Bơi tự do</Select.Option>
                  <Select.Option value="backstroke">Bơi ngửa</Select.Option>
                  <Select.Option value="butterfly">Bơi bướm</Select.Option>
                  <Select.Option value="breaststroke">Bơi ếch</Select.Option>
                  <Select.Option value="medley">Bơi hỗn hợp</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Ngôn ngữ" name="languages">
                <Select mode="multiple" placeholder="Chọn ngôn ngữ">
                  <Select.Option value="vi">Tiếng Việt</Select.Option>
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="zh">中文</Select.Option>
                  <Select.Option value="ja">日本語</Select.Option>
                </Select>
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" icon={<MdSave />}>
                  Lưu thay đổi
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderSecurityTab = () => (
    <div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card title="Thay đổi mật khẩu">
            <Form form={securityForm} layout="vertical">
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu hiện tại",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu hiện tại"
                  suffix={
                    <Button
                      type="text"
                      icon={
                        showCurrentPassword ? (
                          <MdVisibilityOff />
                        ) : (
                          <MdVisibility />
                        )
                      }
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu mới"
                  suffix={
                    <Button
                      type="text"
                      icon={
                        showNewPassword ? <MdVisibilityOff /> : <MdVisibility />
                      }
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ]}
              >
                <Input.Password
                  placeholder="Nhập lại mật khẩu mới"
                  suffix={
                    <Button
                      type="text"
                      icon={
                        showConfirmPassword ? (
                          <MdVisibilityOff />
                        ) : (
                          <MdVisibility />
                        )
                      }
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  }
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button type="primary" icon={<MdSave />}>
                  Cập nhật mật khẩu
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Bảo mật tài khoản">
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Xác thực 2 yếu tố</Text>
                  <br />
                  <Text type="secondary">
                    Bảo vệ tài khoản bằng mã xác thực
                  </Text>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Đăng nhập từ thiết bị mới</Text>
                  <br />
                  <Text type="secondary">
                    Nhận thông báo khi có đăng nhập mới
                  </Text>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Phiên đăng nhập</Text>
                  <br />
                  <Text type="secondary">Tự động đăng xuất sau 30 ngày</Text>
                </div>
                <Switch />
              </div>

              <Divider />

              <div>
                <Text strong>Thiết bị đã đăng nhập</Text>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <Text strong>Chrome - Windows</Text>
                      <br />
                      <Text type="secondary">
                        192.168.1.100 - Hôm nay 14:30
                      </Text>
                    </div>
                    <Button size="small" danger>
                      Đăng xuất
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <Text strong>Safari - iPhone</Text>
                      <br />
                      <Text type="secondary">
                        192.168.1.101 - Hôm qua 09:15
                      </Text>
                    </div>
                    <Button size="small" danger>
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderNotificationTab = () => (
    <Card title="Cài đặt thông báo">
      <Form
        form={notificationForm}
        layout="vertical"
        initialValues={notificationSettings}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={5}>Thông báo qua Email</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Thông báo email</Text>
                  <br />
                  <Text type="secondary">Nhận thông báo qua email</Text>
                </div>
                <Form.Item
                  name="emailNotifications"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Nhắc nhở buổi học</Text>
                  <br />
                  <Text type="secondary">Nhắc nhở trước buổi học</Text>
                </div>
                <Form.Item
                  name="lessonReminders"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Nhắc thanh toán</Text>
                  <br />
                  <Text type="secondary">Nhắc nhở thanh toán học phí</Text>
                </div>
                <Form.Item
                  name="paymentReminders"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Cập nhật hệ thống</Text>
                  <br />
                  <Text type="secondary">Thông báo cập nhật và bảo trì</Text>
                </div>
                <Form.Item
                  name="systemUpdates"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Title level={5}>Thông báo khác</Title>
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Thông báo SMS</Text>
                  <br />
                  <Text type="secondary">Nhận thông báo qua tin nhắn</Text>
                </div>
                <Form.Item
                  name="smsNotifications"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Push notification</Text>
                  <br />
                  <Text type="secondary">Thông báo trên thiết bị</Text>
                </div>
                <Form.Item
                  name="pushNotifications"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Email marketing</Text>
                  <br />
                  <Text type="secondary">
                    Nhận email quảng cáo và khuyến mãi
                  </Text>
                </div>
                <Form.Item
                  name="marketingEmails"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <Form.Item label="Thời gian nhắc nhở (phút)" name="reminderTime">
                <Select>
                  <Select.Option value="15">15 phút</Select.Option>
                  <Select.Option value="30">30 phút</Select.Option>
                  <Select.Option value="60">1 giờ</Select.Option>
                  <Select.Option value="120">2 giờ</Select.Option>
                </Select>
              </Form.Item>
            </Space>
          </Col>
        </Row>

        <Divider />

        <div className="flex justify-end">
          <Button type="primary" icon={<MdSave />}>
            Lưu cài đặt
          </Button>
        </div>
      </Form>
    </Card>
  );

  const renderPreferencesTab = () => (
    <Card title="Tùy chỉnh giao diện">
      <Form
        form={preferencesForm}
        layout="vertical"
        initialValues={preferences}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={5}>Ngôn ngữ & Thời gian</Title>
            <Space direction="vertical" size="large" className="w-full">
              <Form.Item label="Ngôn ngữ" name="language">
                <Select>
                  <Select.Option value="vi">Tiếng Việt</Select.Option>
                  <Select.Option value="en">English</Select.Option>
                  <Select.Option value="zh">中文</Select.Option>
                  <Select.Option value="ja">日本語</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Múi giờ" name="timezone">
                <Select>
                  <Select.Option value="Asia/Ho_Chi_Minh">
                    Asia/Ho_Chi_Minh (GMT+7)
                  </Select.Option>
                  <Select.Option value="UTC">UTC (GMT+0)</Select.Option>
                  <Select.Option value="America/New_York">
                    America/New_York (GMT-5)
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Định dạng ngày" name="dateFormat">
                <Radio.Group>
                  <Radio value="DD/MM/YYYY">DD/MM/YYYY</Radio>
                  <Radio value="MM/DD/YYYY">MM/DD/YYYY</Radio>
                  <Radio value="YYYY-MM-DD">YYYY-MM-DD</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Định dạng giờ" name="timeFormat">
                <Radio.Group>
                  <Radio value="12h">12 giờ (AM/PM)</Radio>
                  <Radio value="24h">24 giờ</Radio>
                </Radio.Group>
              </Form.Item>
            </Space>
          </Col>

          <Col xs={24} md={12}>
            <Title level={5}>Giao diện</Title>
            <Space direction="vertical" size="large" className="w-full">
              <Form.Item label="Chủ đề" name="theme">
                <Radio.Group>
                  <Radio value="light">Sáng</Radio>
                  <Radio value="dark">Tối</Radio>
                  <Radio value="auto">Tự động</Radio>
                </Radio.Group>
              </Form.Item>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Tự động lưu</Text>
                  <br />
                  <Text type="secondary">
                    Tự động lưu dữ liệu khi chỉnh sửa
                  </Text>
                </div>
                <Form.Item
                  name="autoSave"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Hiển thị hướng dẫn</Text>
                  <br />
                  <Text type="secondary">Hiển thị tooltip và hướng dẫn</Text>
                </div>
                <Form.Item
                  name="showTutorials"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <Text strong>Chế độ compact</Text>
                  <br />
                  <Text type="secondary">
                    Hiển thị nhiều thông tin hơn trên màn hình
                  </Text>
                </div>
                <Form.Item
                  name="compactMode"
                  valuePropName="checked"
                  className="mb-0"
                >
                  <Switch />
                </Form.Item>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider />

        <div className="flex justify-end">
          <Button type="primary" icon={<MdSave />}>
            Lưu tùy chỉnh
          </Button>
        </div>
      </Form>
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
                Cài đặt
              </Title>
              <Paragraph className="text-gray-600 mb-0">
                Quản lý thông tin cá nhân và cài đặt tài khoản
              </Paragraph>
            </div>
            <Space>
              <Button icon={<MdEdit />}>Chỉnh sửa</Button>
              <Button type="primary" icon={<MdSave />}>
                Lưu tất cả
              </Button>
            </Space>
          </div>
        </div>

        {/* Main Content */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
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

          <TabPane
            tab={
              <span>
                <MdSecurity className="mr-2" />
                Bảo mật
              </span>
            }
            key="security"
          >
            {renderSecurityTab()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdNotifications className="mr-2" />
                Thông báo
              </span>
            }
            key="notifications"
          >
            {renderNotificationTab()}
          </TabPane>

          <TabPane
            tab={
              <span>
                <MdSettings className="mr-2" />
                Tùy chỉnh
              </span>
            }
            key="preferences"
          >
            {renderPreferencesTab()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <Suspense
      fallback={
        <div className="p-4 pt-16 lg:pt-8 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="text-lg text-gray-600">Đang tải...</div>
            </div>
          </div>
        </div>
      }
    >
      <SettingsContent user={user} />
    </Suspense>
  );
}
