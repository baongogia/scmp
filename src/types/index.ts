// Define types locally instead of importing from Prisma
export interface User {
  id: string;
  _id?: string;
  email: string;
  username: string;
  phone?: string;
  role: string[];
  role_front: string[];
  role_system: string;
  featured_image?: FeaturedImage;
}

export interface FeaturedImage {
  _id: string;
  filename: string;
  disk: string;
  alt: string;
  created_at: string;
  created_by: string;
  is_draft: boolean;
  mime: string;
  path: string;
  size: number;
  tenant_id: string;
  title: string;
  updated_at: string;
  __v: number;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: User;
    featured_image?: FeaturedImage;
    _id?: string;
    id?: string;
    phone?: string;
    role?: string[];
    role_front?: string[];
    role_system?: string;
    username?: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: SkillLevel;
  maxStudents: number;
  price: number;
  startDate: Date;
  endDate: Date;
  instructorId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  courseId: string;
  instructorId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  status: EnrollmentStatus;
  enrolledAt: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  enrollmentId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  lessonId: string;
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "ADMIN" | "INSTRUCTOR" | "STUDENT";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
export type EnrollmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentMethod =
  | "CASH"
  | "BANK_TRANSFER"
  | "CREDIT_CARD"
  | "MOBILE_PAYMENT";

export interface UserWithProfile extends User {
  instructorProfile?: {
    id: string;
    bio?: string;
    experience?: number;
    specialties: string[];
    certifications: string[];
    hourlyRate?: number;
    isAvailable: boolean;
    rating: number;
    totalReviews: number;
  };
  studentProfile?: {
    id: string;
    skillLevel: SkillLevel;
    medicalInfo?: string;
    emergencyContact?: string;
    notes?: string;
  };
}

export interface CourseWithDetails extends Course {
  instructor: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    bio?: string;
    experience?: number;
    specialties: string[];
    rating: number;
    totalReviews: number;
  };
  enrollments: Array<{
    id: string;
    status: EnrollmentStatus;
    student: {
      id: string;
      user: {
        id: string;
        name: string;
        email: string;
      };
    };
  }>;
  lessons: Array<{
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    isCompleted: boolean;
  }>;
}

export interface LessonWithDetails extends Lesson {
  course: {
    id: string;
    title: string;
    level: SkillLevel;
  };
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  attendances: Array<{
    id: string;
    status: AttendanceStatus;
    student: {
      id: string;
      name: string;
      email: string;
    };
  }>;
}

export interface EnrollmentWithDetails extends Enrollment {
  student: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    skillLevel: SkillLevel;
  };
  course: {
    id: string;
    title: string;
    level: SkillLevel;
    instructor: {
      user: {
        name: string;
      };
    };
  };
  payments: Payment[];
}

export interface DashboardStats {
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  activeEnrollments: number;
  monthlyRevenue: number;
  upcomingLessons: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface SearchFilters {
  query?: string;
  level?: SkillLevel;
  instructor?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  priceMin?: number;
  priceMax?: number;
}

export interface CourseFilters extends SearchFilters {
  isActive?: boolean;
  maxStudents?: number;
}

export interface UserFilters {
  query?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface LessonFilters {
  courseId?: string;
  instructorId?: string;
  startDate?: Date;
  endDate?: Date;
  isCompleted?: boolean;
}

export interface AttendanceFilters {
  lessonId?: string;
  studentId?: string;
  status?: AttendanceStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface PaymentFilters {
  enrollmentId?: string;
  studentId?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  startDate?: Date;
  endDate?: Date;
}
