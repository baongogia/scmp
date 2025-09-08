"use client";

import { Card, Avatar, Typography, Tag, Space, Button } from "antd";
import { User } from "@/types";
import { MdEmail, MdPhone, MdEdit, MdLogout } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

const { Title, Text } = Typography;

interface UserProfileProps {
  user: User | null;
  showActions?: boolean;
  size?: "small" | "default" | "large";
}

export function UserProfile({
  user,
  showActions = false,
  size = "default",
}: UserProfileProps) {
  const { logout } = useAuth();

  if (!user) {
    return (
      <Card className="text-center">
        <Text type="secondary">Không có thông tin người dùng</Text>
      </Card>
    );
  }

  const avatarSize = size === "small" ? 32 : size === "large" ? 80 : 48;

  return (
    <Card className="w-full">
      <div className="flex items-center space-x-4">
        <Avatar
          size={avatarSize}
          src={user.featured_image?.path}
          className="border-2 border-cyan-500 flex-shrink-0"
        >
          {user.username?.charAt(0).toUpperCase() || "U"}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <Title level={size === "small" ? 5 : 4} className="mb-0 truncate">
              {user.username}
            </Title>
            <Tag color="blue" className="text-xs">
              {user.role_system}
            </Tag>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <MdEmail className="text-cyan-500 flex-shrink-0" />
              <Text className="text-sm truncate">{user.email}</Text>
            </div>

            {user.phone && (
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MdPhone className="text-cyan-500 flex-shrink-0" />
                <Text className="text-sm">{user.phone}</Text>
              </div>
            )}
          </div>

          {user.role_front && user.role_front.length > 0 && (
            <div className="mt-2">
              <Space size="small" wrap>
                {user.role_front.map((role, index) => (
                  <Tag key={index} color="cyan" className="text-xs">
                    {role}
                  </Tag>
                ))}
              </Space>
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex flex-col space-y-2">
            <Button
              type="text"
              icon={<MdEdit />}
              size="small"
              className="text-cyan-600 hover:text-cyan-700"
            >
              Chỉnh sửa
            </Button>
            <Button
              type="text"
              icon={<MdLogout />}
              size="small"
              danger
              onClick={logout}
            >
              Đăng xuất
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

export default UserProfile;
