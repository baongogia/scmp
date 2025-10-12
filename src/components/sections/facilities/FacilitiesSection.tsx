"use client";
import React from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import { FaSwimmer } from "react-icons/fa";
import { facilitiesData } from "../../../constants/sectionsData";

const FacilitiesSection = () => {
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation();

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary-300";
      case "ocean":
        return "text-ocean-300";
      case "wave":
        return "text-wave-300";
      case "accent":
        return "text-accent-300";
      default:
        return "text-primary-300";
    }
  };

  return (
    <section
      ref={facilitiesRef}
      className={`py-32 gradient-ocean transition-all duration-1000 ${
        facilitiesVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white text-sm font-semibold mb-4">
            <FaSwimmer className="text-lg" />
            Cơ Sở Vật Chất
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Hồ Bơi Hiện Đại
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
            Hệ thống hồ bơi được trang bị đầy đủ tiện nghi, đảm bảo an toàn và
            thoải mái cho học viên
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {facilitiesData.map((facility) => {
                const IconComponent = facility.icon;
                const iconColor = getColorClasses(facility.color);

                return (
                  <div
                    key={facility.id}
                    className="glass-dark p-6 rounded-xl shadow-2xl hover-glow transition-all duration-300"
                  >
                    <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className={`text-xl ${iconColor}`} />
                    </div>
                    <h3 className="font-black text-lg mb-2 text-white">
                      {facility.title}
                    </h3>
                    <p className="text-white/80 text-sm font-medium">
                      {facility.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="gradient-water rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-black mb-6">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-black">An toàn tuyệt đối</h4>
                    <p className="text-white/90 text-sm font-medium">
                      Hệ thống cứu hộ 24/7, camera giám sát
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-black">Phương pháp hiện đại</h4>
                    <p className="text-white/90 text-sm font-medium">
                      Áp dụng công nghệ tiên tiến nhất
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-black">Linh hoạt thời gian</h4>
                    <p className="text-white/90 text-sm font-medium">
                      Học viên có thể chọn giờ học phù hợp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
