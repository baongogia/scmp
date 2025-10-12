"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Iridescence from "@/components/layout/animation/Iridescence";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [waveRef] = useScrollAnimation();

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) return;

    const tl = gsap.timeline();

    // Animate hero content on load
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );

    // Floating animation for wave elements
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <Iridescence
          color={[0.2, 0.6, 1]}
          mouseReact={true}
          amplitude={0.15}
          speed={0.8}
        />
      </div>

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0066cc" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#004080" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#003366" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            href={waveRef}
            d="M0,400 C300,300 600,500 900,400 C1050,350 1200,400 1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-800 mb-6 leading-tight"
          >
            Khám Phá Thế Giới
            <span className="block text-primary-600 mt-2">Dưới Nước</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-primary-700 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Học bơi an toàn, chuyên nghiệp với đội ngũ huấn luyện viên giàu kinh
            nghiệm. Từ người mới bắt đầu đến vận động viên chuyên nghiệp.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="group relative px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-xl">
              <span className="relative z-10">Đăng Ký Ngay</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-ocean-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary-600 hover:text-white hover:scale-105">
              Xem Khóa Học
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-primary-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-wave-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-ocean-300 rounded-full opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary-300 rounded-full opacity-25 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-wave-100 rounded-full opacity-15 animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;
