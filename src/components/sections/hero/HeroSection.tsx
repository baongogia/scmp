"use client";
import React, { useEffect, useState } from "react";
import { useScrollPosition } from "../../../hooks/useScrollAnimation";
import { FaSwimmer } from "react-icons/fa";

const HeroSection = () => {
  const scrollY = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center particle-bg">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-deep">
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 80%, rgba(14,165,233,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6,182,212,0.2) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(20,184,166,0.15) 0%, transparent 50%)",
            }}
          ></div>
        </div>
        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ocean-600/20 to-transparent animate-wave"></div>
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-ocean-500/15 to-transparent animate-wave"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Floating Elements with Parallax */}
      <div
        className="absolute top-20 left-10 animate-float"
        style={{
          animationDelay: "0s",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="w-16 h-16 glass rounded-full hover-glow"></div>
      </div>
      <div
        className="absolute top-40 right-20 animate-float"
        style={{
          animationDelay: "2s",
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      >
        <div className="w-12 h-12 glass rounded-full hover-glow"></div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-float"
        style={{
          animationDelay: "4s",
          transform: `translateY(${scrollY * 0.08}px)`,
        }}
      >
        <div className="w-20 h-20 glass rounded-full hover-glow"></div>
      </div>
      <div
        className="absolute top-60 right-40 animate-float"
        style={{
          animationDelay: "1s",
          transform: `translateY(${scrollY * -0.03}px)`,
        }}
      >
        <div className="w-8 h-8 glass rounded-full hover-glow"></div>
      </div>
      <div
        className="absolute top-32 left-1/2 animate-float"
        style={{
          animationDelay: "3s",
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      >
        <div className="w-6 h-6 glass rounded-full hover-glow"></div>
      </div>

      {/* Hero Content */}
      <div
        className={`relative z-10 text-center max-w-6xl mx-auto px-4 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white text-sm font-semibold mb-6 animate-pulse-glow">
            <FaSwimmer className="text-lg" />
            Trung Tâm Bơi Lội Hàng Đầu Việt Nam
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
          <span
            className="block animate-fade-in drop-shadow-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            Khám Phá
          </span>
          <span
            className="block text-ocean-300 animate-fade-in drop-shadow-2xl"
            style={{ animationDelay: "0.4s" }}
          >
            Thế Giới
          </span>
          <span
            className="block text-wave-300 animate-fade-in drop-shadow-2xl"
            style={{ animationDelay: "0.6s" }}
          >
            Dưới Nước
          </span>
        </h1>

        <p
          className="text-xl sm:text-2xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in font-medium"
          style={{ animationDelay: "0.8s" }}
        >
          Học bơi an toàn, chuyên nghiệp với đội ngũ huấn luyện viên giàu kinh
          nghiệm. Từ người mới bắt đầu đến vận động viên chuyên nghiệp - chúng
          tôi có khóa học phù hợp cho mọi lứa tuổi.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <button className="group px-12 py-5 bg-white text-primary-600 rounded-full font-bold text-lg transition-all duration-500 hover:bg-ocean-50 hover:scale-110 hover:shadow-2xl animate-pulse-glow">
            <span className="flex items-center gap-3">
              Đăng Ký Ngay
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>

          <button className="px-12 py-5 border-2 border-white/80 text-white rounded-full font-bold text-lg transition-all duration-500 hover:bg-white/10 hover:border-white hover:scale-110 glass hover:shadow-2xl">
            Xem Khóa Học
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center glass">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
