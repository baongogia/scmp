"use client";
import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  level: string;
  features: string[];
  color: string;
  icon: React.ReactNode;
}

const CoursesSection: React.FC = () => {
  const { elementRef: titleRef, fadeInUp } = useScrollAnimation();
  const { elementRef: cardsRef, staggerChildren } = useScrollAnimation();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  fadeInUp(0);
  staggerChildren(".course-card", 0.1);

  const courses: Course[] = [
    {
      id: "beginner",
      title: "Khóa Cơ Bản",
      description:
        "Dành cho người mới bắt đầu, học các kỹ thuật bơi cơ bản và làm quen với môi trường nước.",
      duration: "8 buổi",
      price: "2.000.000đ",
      level: "Người mới",
      features: [
        "Làm quen với nước",
        "Kỹ thuật thở",
        "Bơi ếch cơ bản",
        "An toàn dưới nước",
      ],
      color: "primary",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      id: "intermediate",
      title: "Khóa Nâng Cao",
      description:
        "Hoàn thiện kỹ thuật bơi, học thêm các kiểu bơi mới và nâng cao sức bền.",
      duration: "12 buổi",
      price: "3.500.000đ",
      level: "Trung cấp",
      features: ["Bơi tự do", "Bơi ngửa", "Bơi bướm", "Kỹ thuật lặn"],
      color: "ocean",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      id: "professional",
      title: "Khóa Chuyên Nghiệp",
      description:
        "Đào tạo vận động viên thi đấu, hoàn thiện kỹ thuật và chiến thuật thi đấu.",
      duration: "16 buổi",
      price: "5.000.000đ",
      level: "Chuyên nghiệp",
      features: [
        "Kỹ thuật thi đấu",
        "Chiến thuật",
        "Thể lực chuyên môn",
        "Tâm lý thi đấu",
      ],
      color: "wave",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "kids",
      title: "Khóa Trẻ Em",
      description:
        "Chương trình đặc biệt dành cho trẻ em từ 4-12 tuổi với phương pháp vui chơi.",
      duration: "10 buổi",
      price: "2.500.000đ",
      level: "Trẻ em",
      features: [
        "Học qua trò chơi",
        "An toàn tuyệt đối",
        "Phát triển thể chất",
        "Tự tin dưới nước",
      ],
      color: "secondary",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            Khóa Học Của Chúng Tôi
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Chọn khóa học phù hợp với trình độ và mục tiêu của bạn. Mỗi khóa học
            được thiết kế chuyên biệt với đội ngũ huấn luyện viên giàu kinh
            nghiệm.
          </p>
        </div>

        {/* Course Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className={`course-card group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
              onMouseEnter={() => setHoveredCard(course.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Header */}
              <div
                className={`p-6 text-white relative overflow-hidden ${
                  course.color === "primary"
                    ? "bg-gradient-to-br from-primary-500 to-primary-600"
                    : course.color === "ocean"
                    ? "bg-gradient-to-br from-ocean-500 to-ocean-600"
                    : course.color === "wave"
                    ? "bg-gradient-to-br from-wave-500 to-wave-600"
                    : "bg-gradient-to-br from-secondary-500 to-secondary-600"
                }`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-6 -translate-y-6"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg text-white">
                      {course.icon}
                    </div>
                    <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm opacity-90">{course.description}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-primary-600 font-medium">
                    {course.duration}
                  </span>
                  <span className="text-2xl font-bold text-primary-800">
                    {course.price}
                  </span>
                </div>

                <ul className="space-y-2 mb-6">
                  {course.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-primary-600"
                    >
                      <svg
                        className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                    course.color === "primary"
                      ? "bg-primary-600 hover:bg-primary-700"
                      : course.color === "ocean"
                      ? "bg-ocean-600 hover:bg-ocean-700"
                      : course.color === "wave"
                      ? "bg-wave-600 hover:bg-wave-700"
                      : "bg-secondary-600 hover:bg-secondary-700"
                  }`}
                >
                  Đăng Ký Ngay
                </button>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-primary-600 mb-6">
            Không chắc chắn khóa học nào phù hợp với bạn?
          </p>
          <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-xl">
            Tư Vấn Miễn Phí
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
