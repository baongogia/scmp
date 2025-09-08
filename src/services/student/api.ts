import api from "@/config/axios";

// Student API Functions
export const getStudents = (params?: {
  page?: number;
  limit?: number;
  courseId?: string;
}) => {
  return api.get("/v1/instructor/students", { params });
};

export const getStudentById = (id: string) => {
  return api.get(`/v1/students/${id}`);
};

export const createStudent = (studentData: any) => {
  return api.post("/v1/students", studentData);
};

export const updateStudent = (id: string, studentData: any) => {
  return api.put(`/v1/students/${id}`, studentData);
};

export const deleteStudent = (id: string) => {
  return api.delete(`/v1/students/${id}`);
};

export const getInstructorStudents = (params?: {
  page?: number;
  limit?: number;
}) => {
  return api.get("/v1/instructor/students", { params });
};
