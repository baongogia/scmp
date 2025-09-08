import api from "@/config/axios";

// Attendance API Functions
export const getAttendance = (params?: {
  courseId?: string;
  date?: string;
  studentId?: string;
}) => {
  return api.get("/v1/instructor/attendance", { params });
};

export const getAttendanceById = (id: string) => {
  return api.get(`/v1/instructor/attendance/${id}`);
};

export const updateAttendance = (id: string, attendanceData: any) => {
  return api.put(`/v1/instructor/attendance/${id}`, attendanceData);
};

export const bulkUpdateAttendance = (attendanceData: {
  date: string;
  courseId: string;
  attendances: Array<{
    studentId: string;
    status: "present" | "absent" | "late";
    notes?: string;
  }>;
}) => {
  return api.post("/v1/instructor/attendance/bulk-update", attendanceData);
};

export const createAttendance = (attendanceData: any) => {
  return api.post("/v1/instructor/attendance", attendanceData);
};
