import api from "@/config/axios";

// Earnings API Functions
export const getEarnings = (params?: {
  startDate?: string;
  endDate?: string;
  period?: "daily" | "weekly" | "monthly" | "yearly";
}) => {
  return api.get("/v1/instructor/earnings", { params });
};

export const getEarningsByPeriod = (
  period: "daily" | "weekly" | "monthly" | "yearly"
) => {
  return api.get("/v1/instructor/earnings", { params: { period } });
};

export const getEarningsByDateRange = (startDate: string, endDate: string) => {
  return api.get("/v1/instructor/earnings", { params: { startDate, endDate } });
};
