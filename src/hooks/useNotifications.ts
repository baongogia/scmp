import { notification } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

let notificationApi: NotificationInstance;

export const useNotificationApi = () => {
  const [api, contextHolder] = notification.useNotification();

  // Set the global notification API instance
  notificationApi = api;

  return { api, contextHolder };
};
const safeString = (value: unknown): string =>
  typeof value === "string" ? value : "";
export const getNotificationApi = (): NotificationInstance => {
  if (!notificationApi) {
    throw new Error(
      "Notification API not initialized. Make sure to call useNotificationApi() in your app layout."
    );
  }
  return notificationApi;
};

// Convenience methods for common notification types
export const showSuccess = (
  description: unknown,
  message: string = "Thành công",
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "topRight",
  duration: number = 3
) => {
  getNotificationApi().success({
    message,
    description: safeString(description),
    placement,
    duration,
    className: "custom-notification",
  });
};

export const showError = (
  description: unknown,
  message: string = "Lỗi",
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "topRight",
  duration: number = 3
) => {
  getNotificationApi().error({
    message,
    description: safeString(description),
    placement,
    duration,
    className: "custom-notification",
  });
};

export const showWarning = (
  description: unknown,
  message: string = "Cảnh báo",
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "topRight",
  duration: number = 3
) => {
  getNotificationApi().warning({
    message,
    description: safeString(description),
    placement,
    duration,
    className: "custom-notification",
  });
};

export const showInfo = (
  description: unknown,
  message: string = "Thông tin",
  placement: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" = "topRight",
  duration: number = 3
) => {
  getNotificationApi().info({
    message,
    description: safeString(description),
    placement,
    duration,
    className: "custom-notification",
  });
};
