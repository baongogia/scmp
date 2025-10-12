"use client";
import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Facility {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

const FacilitiesSection: React.FC = () => {
  const { elementRef: titleRef, fadeInUp } = useScrollAnimation();
  const { elementRef: facilitiesRef, staggerChildren } = useScrollAnimation();

  fadeInUp(0);
  staggerChildren(".facility-card", 0.2);

  const facilities: Facility[] = [
    {
      id: "pool",
      title: "Hồ Bơi Tiêu Chuẩn Olympic",
      description:
        "Hồ bơi 50m x 25m với 8 làn đường, đáp ứng tiêu chuẩn thi đấu quốc tế.",
      features: [
        "Hệ thống lọc nước hiện đại",
        "Nhiệt độ nước ổn định 26-28°C",
        "Chiều sâu 1.2m - 2.0m",
        "Hệ thống chiếu sáng LED",
      ],
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
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
      image: "/api/placeholder/600/400",
    },
    {
      id: "kids-pool",
      title: "Hồ Bơi Trẻ Em",
      description:
        "Khu vực riêng biệt dành cho trẻ em với độ sâu an toàn và thiết kế vui nhộn.",
      features: [
        "Độ sâu 0.6m - 1.0m",
        "Khu vực chơi nước",
        "Hệ thống an toàn 24/7",
        "Thiết kế màu sắc bắt mắt",
      ],
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
      image: "/api/placeholder/600/400",
    },
    {
      id: "equipment",
      title: "Thiết Bị Hiện Đại",
      description: "Đầy đủ thiết bị hỗ trợ học tập và tập luyện chuyên nghiệp.",
      features: [
        "Phao tập bơi chuyên dụng",
        "Ván tập kick board",
        "Kính bơi và mũ bơi",
        "Thiết bị đo thời gian",
      ],
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      image: "/api/placeholder/600/400",
    },
    {
      id: "amenities",
      title: "Tiện Ích Đầy Đủ",
      description:
        "Không gian thư giãn và các tiện ích phục vụ học viên tốt nhất.",
      features: [
        "Phòng thay đồ rộng rãi",
        "Khu vực nghỉ ngơi",
        "Quầy bar nước uống",
        "Bãi đậu xe miễn phí",
      ],
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      image: "/api/placeholder/600/400",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            Cơ Sở Vật Chất
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Hệ thống cơ sở vật chất hiện đại, đầy đủ tiện nghi và đảm bảo an
            toàn tuyệt đối cho mọi hoạt động học tập và tập luyện.
          </p>
        </div>

        {/* Facilities Grid */}
        <div ref={facilitiesRef} className="space-y-16">
          {facilities.map((facility, index) => (
            <div
              key={facility.id}
              className={`facility-card grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Content */}
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-primary-100 rounded-xl text-primary-600">
                    {facility.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-800">
                    {facility.title}
                  </h3>
                </div>

                <p className="text-lg text-primary-600 leading-relaxed">
                  {facility.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {facility.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                      </div>
                      <span className="text-primary-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-primary-700 hover:shadow-lg transform hover:scale-105">
                    Tham Quan Thực Tế
                  </button>
                </div>
              </div>

              {/* Image */}
              <div
                className={`relative ${
                  index % 2 === 1 ? "lg:col-start-1" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <div className="aspect-w-4 aspect-h-3 bg-gradient-to-br from-primary-200 to-ocean-200">
                    <div className="flex items-center justify-center">
                      <div className="text-6xl text-primary-400">
                        {facility.icon}
                      </div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h4 className="text-white font-semibold text-lg mb-2">
                        {facility.title}
                      </h4>
                      <p className="text-white/90 text-sm">
                        {facility.description}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-wave-300 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-ocean-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Virtual Tour CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-ocean-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Tham Quan Ảo 360°
            </h3>
            <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
              Khám phá toàn bộ cơ sở vật chất của chúng tôi thông qua tour tham
              quan ảo 360°. Trải nghiệm không gian thực tế ngay tại nhà.
            </p>
            <button className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-50 hover:scale-105 hover:shadow-xl">
              Bắt Đầu Tour Ảo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
