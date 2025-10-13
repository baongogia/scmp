"use client";
import React, { useEffect, useState } from "react";
import { useScrollPosition } from "../../../hooks/useScrollAnimation";
import {
  FaSwimmer,
  FaTrophy,
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaPercentage,
  FaStar,
  FaArrowDown,
  FaPlay,
} from "react-icons/fa";
import { Waves, Droplets, Sparkles, ChevronDown } from "lucide-react";
import CircularText from "@/components/layout/animation/text/CircularText";

const HeroSection = () => {
  const scrollY = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* gradient-water */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558617320-e695f0d420de?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2940')",
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute top-0 right-0 transform scale-75">
          <CircularText
            text="SCMP*SWIMMING*COURSE*"
            onHover="speedUp"
            spinDuration={20}
          />
        </div>
        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/40"></div>
        {/* Floating particles */}
        <div className="absolute inset-0 particle-bg">
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-float-up"></div>
          <div
            className="absolute top-40 right-20 w-6 h-6 bg-cyan-300/30 rounded-full animate-float-up"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-blue-200/40 rounded-full animate-float-up"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-5 h-5 bg-white/25 rounded-full animate-float-up"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-4 h-4 bg-cyan-200/35 rounded-full animate-float-up"
            style={{ animationDelay: "1.5s" }}
          ></div>

          {/* Floating Icons */}
          <div className="absolute top-32 left-1/3 text-white/20 animate-float-gentle">
            <Droplets size={24} />
          </div>
          <div
            className="absolute top-1/3 right-1/4 text-cyan-200/30 animate-float-gentle"
            style={{ animationDelay: "1s" }}
          >
            <Waves size={28} />
          </div>
          <div
            className="absolute bottom-1/3 left-1/5 text-white/25 animate-float-gentle"
            style={{ animationDelay: "2s" }}
          >
            <Sparkles size={20} />
          </div>
        </div>

        {/* Wave overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            <span className="block">Học Bơi</span>
            <span className="block bg-gradient-to-r from-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Chuyên Nghiệp
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Khám phá niềm vui bơi lội với các khóa học chất lượng cao, hướng dẫn
            bởi huấn luyện viên chuyên nghiệp
          </p>

          {/* Glass Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="glass-hero rounded-2xl p-6 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <FaSwimmer className="text-3xl text-white " />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Khóa Cơ Bản
              </h3>
              <p className="text-white/80 text-sm">
                Học từ những động tác cơ bản nhất
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-hero rounded-2xl p-6 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 group-hover:from-yellow-400/30 group-hover:to-orange-500/30 transition-all duration-300">
                  <FaTrophy
                    className="text-3xl text-white "
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Khóa Nâng Cao
              </h3>
              <p className="text-white/80 text-sm">
                Nâng cao kỹ thuật và tốc độ
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-hero rounded-2xl p-6 hover:scale-105 group">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 group-hover:from-green-400/30 group-hover:to-emerald-500/30 transition-all duration-300">
                  <FaUsers
                    className="text-3xl text-white "
                    style={{ animationDelay: "1s" }}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Khóa Gia Đình
              </h3>
              <p className="text-white/80 text-sm">Bơi lội cùng cả gia đình</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2">
              <FaUserGraduate className="group-hover:scale-110 transition-transform duration-300" />
              Đăng Ký Ngay
            </button>

            <button className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2">
              <FaPlay className="group-hover:scale-110 transition-transform duration-300" />
              Xem Khóa Học
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaUserGraduate className="text-2xl text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                500+
              </div>
              <div className="text-white/70 text-sm">Học Viên</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaChalkboardTeacher className="text-2xl text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                15+
              </div>
              <div className="text-white/70 text-sm">Huấn Luyện Viên</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaPercentage className="text-2xl text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                98%
              </div>
              <div className="text-white/70 text-sm">Tỷ Lệ Thành Công</div>
            </div>
            <div className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaStar className="text-2xl text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                5★
              </div>
              <div className="text-white/70 text-sm">Đánh Giá</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer">
          <span className="text-xs mb-2 font-medium">Scroll</span>
          <ChevronDown size={24} className="animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
