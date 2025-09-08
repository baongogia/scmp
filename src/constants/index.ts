// App Constants
export const APP_CONFIG = {
  NAME: process.env.NEXT_PUBLIC_APP_NAME || "Swim Course Instructors",
  URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
} as const;

// API Constants
export const API_CONSTANTS = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  THEME: "theme",
  LANGUAGE: "language",
} as const;

// Course Levels
export const COURSE_LEVELS = [
  { value: "Cơ bản", label: "Cơ bản" },
  { value: "Trung bình", label: "Trung bình" },
  { value: "Nâng cao", label: "Nâng cao" },
] as const;

// Course Status
export const COURSE_STATUS = [
  { value: "active", label: "Đang hoạt động" },
  { value: "inactive", label: "Tạm dừng" },
  { value: "completed", label: "Hoàn thành" },
] as const;

// Attendance Status
export const ATTENDANCE_STATUS = [
  { value: "present", label: "Có mặt" },
  { value: "absent", label: "Vắng mặt" },
  { value: "late", label: "Đi muộn" },
] as const;

// User Roles
export const USER_ROLES = {
  INSTRUCTOR: "INSTRUCTOR",
  ADMIN: "ADMIN",
  STUDENT: "STUDENT",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "DD/MM/YYYY",
  API: "YYYY-MM-DD",
  DATETIME: "DD/MM/YYYY HH:mm",
  TIME: "HH:mm",
} as const;
