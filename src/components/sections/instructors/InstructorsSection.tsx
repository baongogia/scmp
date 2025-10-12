"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaChalkboardTeacher } from "react-icons/fa";
import { instructorsData } from "../../../constants/sectionsData";

const InstructorsSection = () => {
  const [instructorsRef, instructorsVisible] = useScrollAnimation();

  return (
    <section
      ref={instructorsRef}
      className={`py-32 bg-gradient-to-br from-dark-50 to-dark-100 transition-all duration-1000 ${
        instructorsVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            <FaChalkboardTeacher className="text-lg" />
            Huấn Luyện Viên
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-dark-800 mb-6">
            Đội Ngũ Chuyên Gia
          </h2>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium">
            Gặp gỡ các huấn luyện viên giàu kinh nghiệm, đã đào tạo thành công
            hàng nghìn học viên
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructorsData.map((instructor) => {
            const IconComponent = instructor.icon;

            return (
              <div
                key={instructor.id}
                className="group glass rounded-2xl p-8 text-center hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              >
                <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <IconComponent className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-black text-dark-800 mb-2">
                  {instructor.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {instructor.role}
                </p>
                <p className="text-dark-600 mb-6 font-medium">
                  {instructor.experience}
                </p>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 font-semibold">
                  Xem Hồ Sơ
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
