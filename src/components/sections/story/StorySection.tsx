"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaShieldAlt, FaChalkboardTeacher, FaMedal } from "react-icons/fa";

const StorySection = () => {
  const [storyRef, storyVisible] = useScrollAnimation();

  return (
    <section
      ref={storyRef}
      className={`py-32 bg-gradient-to-br from-dark-50 to-dark-100 relative overflow-hidden transition-all duration-1000 ${
        storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                Câu Chuyện Của Chúng Tôi
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-dark-800 leading-tight">
                Hành Trình 15 Năm
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-ocean-600">
                  Đào Tạo Bơi Lội
                </span>
              </h2>
            </div>

            <p className="text-lg text-dark-600 leading-relaxed font-medium">
              Từ một nhóm nhỏ các huấn luyện viên đam mê bơi lội, chúng tôi đã
              phát triển thành trung tâm đào tạo bơi lội hàng đầu với hơn 20
              huấn luyện viên chuyên nghiệp và đã đào tạo thành công hơn 5,000
              học viên.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 glass rounded-xl hover-glow transition-all duration-300">
                <div className="text-3xl font-black text-primary-600 mb-2">
                  15+
                </div>
                <div className="text-dark-700 font-semibold">
                  Năm Kinh Nghiệm
                </div>
              </div>
              <div className="text-center p-6 glass rounded-xl hover-glow transition-all duration-300">
                <div className="text-3xl font-black text-ocean-600 mb-2">
                  5000+
                </div>
                <div className="text-dark-700 font-semibold">Học Viên</div>
              </div>
              <div className="text-center p-6 glass rounded-xl hover-glow transition-all duration-300">
                <div className="text-3xl font-black text-wave-600 mb-2">
                  20+
                </div>
                <div className="text-dark-700 font-semibold">
                  Huấn Luyện Viên
                </div>
              </div>
              <div className="text-center p-6 glass rounded-xl hover-glow transition-all duration-300">
                <div className="text-3xl font-black text-accent-600 mb-2">
                  98%
                </div>
                <div className="text-dark-700 font-semibold">Hài Lòng</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 gradient-water rounded-2xl p-8 text-white shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">An Toàn Tuyệt Đối</h3>
                    <p className="text-white/90 font-medium">
                      Hệ thống an toàn 24/7
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <FaChalkboardTeacher className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">
                      Huấn Luyện Viên Chuyên Nghiệp
                    </h3>
                    <p className="text-white/90 font-medium">
                      Kinh nghiệm từ 5-15 năm
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center">
                    <FaMedal className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Phương Pháp Hiện Đại</h3>
                    <p className="text-white/90 font-medium">
                      Công nghệ tiên tiến nhất
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full gradient-deep rounded-2xl -z-10 shadow-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
