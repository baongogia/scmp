"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaUserGraduate } from "react-icons/fa";
import { coursesData } from "../../../constants/sectionsData";

const CoursesSection = () => {
  const [coursesRef, coursesVisible] = useScrollAnimation();

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          icon: "text-primary-300",
          price: "text-primary-300",
          button: "bg-primary-600 hover:bg-primary-700",
          dot: "bg-primary-400",
        };
      case "ocean":
        return {
          icon: "text-ocean-300",
          price: "text-ocean-300",
          button: "bg-ocean-600 hover:bg-ocean-700",
          dot: "bg-ocean-400",
        };
      case "wave":
        return {
          icon: "text-wave-300",
          price: "text-wave-300",
          button: "bg-wave-600 hover:bg-wave-700",
          dot: "bg-wave-400",
        };
      default:
        return {
          icon: "text-primary-300",
          price: "text-primary-300",
          button: "bg-primary-600 hover:bg-primary-700",
          dot: "bg-primary-400",
        };
    }
  };

  return (
    <section
      ref={coursesRef}
      className={`py-32 gradient-ocean transition-all duration-1000 ${
        coursesVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white text-sm font-semibold mb-4">
            <FaUserGraduate className="text-lg" />
            Khóa Học
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Chọn Khóa Học Phù Hợp
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Từ cơ bản đến nâng cao, chúng tôi có đầy đủ các khóa học phù hợp với
            mọi độ tuổi và trình độ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesData.map((course) => {
            const colors = getColorClasses(course.color);
            const IconComponent = course.icon;

            return (
              <div
                key={course.id}
                className="group glass-dark rounded-2xl p-8 shadow-2xl hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              >
                <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className={`text-2xl ${colors.icon}`} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">
                  {course.title}
                </h3>
                <p className="text-white/80 mb-6 font-medium">
                  {course.description}
                </p>
                <div className="space-y-3 mb-6">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 ${colors.dot} rounded-full`}
                      ></span>
                      <span className="text-white/90 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-black ${colors.price}`}>
                    {course.price}
                  </span>
                  <button
                    className={`px-6 py-3 ${colors.button} text-white rounded-full transition-all duration-300 hover:scale-105 font-semibold`}
                  >
                    Đăng Ký
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
