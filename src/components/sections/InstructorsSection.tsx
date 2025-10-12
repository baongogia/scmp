"use client";
import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Instructor {
  id: string;
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  achievements: string[];
  image: string;
}

const InstructorsSection: React.FC = () => {
  const { elementRef: titleRef, fadeInUp } = useScrollAnimation();
  const { elementRef: cardsRef, staggerChildren } = useScrollAnimation();

  fadeInUp(0);
  staggerChildren(".instructor-card", 0.15);

  const instructors: Instructor[] = [
    {
      id: "nguyen-van-a",
      name: "Nguyễn Văn A",
      title: "Huấn Luyện Viên Trưởng",
      experience: "15 năm",
      specialties: ["Bơi tự do", "Bơi bướm", "Huấn luyện thi đấu"],
      achievements: [
        "HCV SEA Games 2019",
        "Huấn luyện viên xuất sắc 2020",
        "Chứng chỉ quốc tế FINA",
      ],
      image: "/api/placeholder/300/400",
    },
    {
      id: "tran-thi-b",
      name: "Trần Thị B",
      title: "Chuyên Gia Bơi Trẻ Em",
      experience: "12 năm",
      specialties: ["Bơi trẻ em", "Tâm lý học đường", "An toàn dưới nước"],
      achievements: [
        "Thạc sĩ Giáo dục Thể chất",
        "Chứng chỉ cứu hộ quốc tế",
        "1000+ trẻ em đã học",
      ],
      image: "/api/placeholder/300/400",
    },
    {
      id: "le-van-c",
      name: "Lê Văn C",
      title: "Chuyên Gia Kỹ Thuật",
      experience: "10 năm",
      specialties: ["Kỹ thuật bơi", "Phân tích video", "Cải thiện hiệu suất"],
      achievements: [
        "Cựu VĐV đội tuyển quốc gia",
        "Chứng chỉ phân tích kỹ thuật",
        "Chuyên gia tư vấn",
      ],
      image: "/api/placeholder/300/400",
    },
    {
      id: "pham-thi-d",
      name: "Phạm Thị D",
      title: "Huấn Luyện Viên Cấp Cao",
      experience: "8 năm",
      specialties: ["Bơi ngửa", "Bơi ếch", "Phục hồi chức năng"],
      achievements: [
        "Chứng chỉ vật lý trị liệu",
        "Chuyên gia bơi phục hồi",
        "Giải thưởng HLV trẻ",
      ],
      image: "/api/placeholder/300/400",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            Đội Ngũ Huấn Luyện Viên
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Đội ngũ huấn luyện viên giàu kinh nghiệm, được chứng nhận quốc tế và
            có thành tích thi đấu xuất sắc sẽ đồng hành cùng bạn.
          </p>
        </div>

        {/* Instructor Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {instructors.map((instructor, index) => (
            <div
              key={instructor.id}
              className="instructor-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className="aspect-w-3 aspect-h-4 bg-gradient-to-br from-primary-200 to-ocean-200">
                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-primary-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white text-sm space-y-1">
                      {instructor.achievements
                        .slice(0, 2)
                        .map((achievement, i) => (
                          <div key={i} className="flex items-center">
                            <svg
                              className="w-3 h-3 text-yellow-400 mr-1 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-xs">{achievement}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-primary-800 mb-1">
                    {instructor.name}
                  </h3>
                  <p className="text-primary-600 font-medium">
                    {instructor.title}
                  </p>
                  <p className="text-sm text-primary-500">
                    Kinh nghiệm: {instructor.experience}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary-700 mb-2">
                    Chuyên môn:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {instructor.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary-700 mb-2">
                    Thành tích:
                  </h4>
                  <ul className="space-y-1">
                    {instructor.achievements
                      .slice(0, 2)
                      .map((achievement, i) => (
                        <li
                          key={i}
                          className="text-xs text-primary-600 flex items-start"
                        >
                          <svg
                            className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0"
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
                          {achievement}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Contact Button */}
                <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-primary-700 hover:shadow-lg transform hover:scale-105">
                  Liên Hệ
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary-200 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-ocean-300 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-ocean-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Muốn Gặp Trực Tiếp Huấn Luyện Viên?
            </h3>
            <p className="text-primary-600 mb-6 max-w-2xl mx-auto">
              Đặt lịch tư vấn miễn phí để gặp gỡ và trao đổi trực tiếp với đội
              ngũ huấn luyện viên. Chúng tôi sẽ tư vấn khóa học phù hợp nhất cho
              bạn.
            </p>
            <button className="px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-xl">
              Đặt Lịch Tư Vấn
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
