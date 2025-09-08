"use client";

import { useNotificationApi } from "@/hooks/useNotifications";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { contextHolder } = useNotificationApi();

  return (
    <ConfigProvider
      locale={viVN}
      theme={{
        token: {
          colorPrimary: "#06b6d4",
          borderRadius: 8,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        },
        components: {
          Notification: {
            zIndexPopup: 9999,
          },
        },
      }}
    >
      {children}
      {contextHolder}
    </ConfigProvider>
  );
}
