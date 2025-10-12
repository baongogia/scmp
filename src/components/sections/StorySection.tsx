"use client";
import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const StorySection: React.FC = () => {
  const { elementRef: titleRef, fadeInUp } = useScrollAnimation();
  const { elementRef: contentRef, fadeInLeft } = useScrollAnimation();
  const { elementRef: imageRef, fadeInRight } = useScrollAnimation();
  const { elementRef: statsRef, staggerChildren } = useScrollAnimation();

  fadeInUp(0);
  fadeInLeft(0.2);
  fadeInRight(0.4);
  staggerChildren(".stat-item", 0.1);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Với hơn 15 năm kinh nghiệm, chúng tôi đã đào tạo hàng nghìn học viên
            từ trẻ em đến người lớn, từ người mới bắt đầu đến vận động viên
            chuyên nghiệp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary-600"
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
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    An Toàn Tuyệt Đối
                  </h3>
                  <p className="text-primary-600">
                    Hệ thống an toàn 5 sao với đội ngũ cứu hộ chuyên nghiệp,
                    thiết bị hiện đại và quy trình nghiêm ngặt.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-ocean-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-ocean-600"
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
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    Phương Pháp Khoa Học
                  </h3>
                  <p className="text-primary-600">
                    Áp dụng phương pháp giảng dạy tiên tiến từ các trường bơi
                    hàng đầu thế giới, phù hợp với từng độ tuổi và trình độ.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-wave-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-wave-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary-800 mb-2">
                    Đội Ngũ Chuyên Nghiệp
                  </h3>
                  <p className="text-primary-600">
                    Huấn luyện viên được chứng nhận quốc tế, có kinh nghiệm thi
                    đấu và giảng dạy tại các câu lạc bộ hàng đầu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-primary-200 to-ocean-200">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-32 h-32 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-wave-300 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-ocean-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="stat-item text-center p-6 bg-primary-50 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              15+
            </div>
            <div className="text-primary-800 font-medium">Năm Kinh Nghiệm</div>
          </div>
          <div className="stat-item text-center p-6 bg-ocean-50 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-ocean-600 mb-2">
              5000+
            </div>
            <div className="text-primary-800 font-medium">Học Viên</div>
          </div>
          <div className="stat-item text-center p-6 bg-wave-50 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-wave-600 mb-2">
              20+
            </div>
            <div className="text-primary-800 font-medium">Huấn Luyện Viên</div>
          </div>
          <div className="stat-item text-center p-6 bg-primary-50 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              98%
            </div>
            <div className="text-primary-800 font-medium">Hài Lòng</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
