import api from "@/config/axios";

// Course API Functions
export const getCourses = (params?: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  return api.get("/v1/instructor/courses", { params });
};

export const getCourseById = (id: string) => {
  return api.get(`/v1/courses/${id}`);
};

export const createCourse = (courseData: any) => {
  return api.post("/v1/instructor/courses", courseData);
};

export const updateCourse = (id: string, courseData: any) => {
  return api.put(`/v1/instructor/courses/${id}`, courseData);
};

export const deleteCourse = (id: string) => {
  return api.delete(`/v1/instructor/courses/${id}`);
};

export const getInstructorCourses = (params?: {
  page?: number;
  limit?: number;
}) => {
  return api.get("/v1/instructor/courses", { params });
};
