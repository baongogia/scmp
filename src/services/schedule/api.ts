import api from "@/config/axios";

// Schedule API Functions
export const getSchedule = (params?: {
  startDate?: string;
  endDate?: string;
  courseId?: string;
  status?: string;
}) => {
  return api.get("/v1/instructor/schedule", { params });
};

export const getScheduleById = (id: string) => {
  return api.get(`/v1/instructor/schedule/${id}`);
};

export const createSchedule = (scheduleData: any) => {
  return api.post("/v1/instructor/schedule", scheduleData);
};

export const updateSchedule = (id: string, scheduleData: any) => {
  return api.put(`/v1/instructor/schedule/${id}`, scheduleData);
};

export const deleteSchedule = (id: string) => {
  return api.delete(`/v1/instructor/schedule/${id}`);
};
