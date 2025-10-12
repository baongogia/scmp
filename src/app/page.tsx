"use client";
import React, { useEffect, useState } from "react";
import {
  useScrollAnimation,
  useScrollPosition,
} from "../hooks/useScrollAnimation";
import {
  FaSwimmer,
  FaUserGraduate,
  FaTrophy,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaMedal,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaStar,
  FaWater,
  FaThermometerHalf,
  FaTools,
  FaShower,
} from "react-icons/fa";

const HomePage = () => {
  const scrollY = useScrollPosition();
  const [isVisible, setIsVisible] = useState(false);
  const [storyRef, storyVisible] = useScrollAnimation();
  const [coursesRef, coursesVisible] = useScrollAnimation();
  const [instructorsRef, instructorsVisible] = useScrollAnimation();
  const [facilitiesRef, facilitiesVisible] = useScrollAnimation();
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen gradient-ocean">
      {/* Hero Section */}
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

      {/* Story Section */}
      <section
        ref={storyRef}
        className={`py-32 bg-gradient-to-br from-dark-50 to-dark-100 relative overflow-hidden transition-all duration-1000 ${
          storyVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
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
                      <h3 className="font-black text-lg">
                        Phương Pháp Hiện Đại
                      </h3>
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

      {/* Courses Section */}
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
              Từ cơ bản đến nâng cao, chúng tôi có đầy đủ các khóa học phù hợp
              với mọi độ tuổi và trình độ
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course 1 */}
            <div className="group glass-dark rounded-2xl p-8 shadow-2xl hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaSwimmer className="text-2xl text-primary-300" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Bơi Cơ Bản
              </h3>
              <p className="text-white/80 mb-6 font-medium">
                Dành cho người mới bắt đầu, học các kỹ thuật bơi cơ bản và an
                toàn dưới nước.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Học bơi ếch, bơi sải
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Kỹ thuật thở dưới nước
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    An toàn dưới nước
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary-300">
                  2.500.000đ
                </span>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 font-semibold">
                  Đăng Ký
                </button>
              </div>
            </div>

            {/* Course 2 */}
            <div className="group glass-dark rounded-2xl p-8 shadow-2xl hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaWater className="text-2xl text-ocean-300" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Bơi Nâng Cao
              </h3>
              <p className="text-white/80 mb-6 font-medium">
                Nâng cao kỹ thuật bơi, học thêm các kiểu bơi phức tạp và tăng
                cường thể lực.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-ocean-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Bơi bướm, bơi ngửa
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-ocean-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Kỹ thuật xuất phát
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-ocean-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Tăng cường thể lực
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-ocean-300">
                  3.500.000đ
                </span>
                <button className="px-6 py-3 bg-ocean-600 text-white rounded-full hover:bg-ocean-700 transition-all duration-300 hover:scale-105 font-semibold">
                  Đăng Ký
                </button>
              </div>
            </div>

            {/* Course 3 */}
            <div className="group glass-dark rounded-2xl p-8 shadow-2xl hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105">
              <div className="w-16 h-16 glass rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaTrophy className="text-2xl text-wave-300" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">
                Bơi Thi Đấu
              </h3>
              <p className="text-white/80 mb-6 font-medium">
                Đào tạo chuyên sâu cho các vận động viên thi đấu, chuẩn bị cho
                các giải đấu.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-wave-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Kỹ thuật thi đấu
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-wave-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Tâm lý thi đấu
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-wave-400 rounded-full"></span>
                  <span className="text-white/90 font-medium">
                    Chế độ dinh dưỡng
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-wave-300">
                  5.000.000đ
                </span>
                <button className="px-6 py-3 bg-wave-600 text-white rounded-full hover:bg-wave-700 transition-all duration-300 hover:scale-105 font-semibold">
                  Đăng Ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
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
            {[
              {
                name: "Nguyễn Văn An",
                role: "Huấn luyện viên trưởng",
                exp: "15 năm kinh nghiệm",
                icon: FaChalkboardTeacher,
              },
              {
                name: "Trần Thị Bình",
                role: "Chuyên gia bơi bướm",
                exp: "12 năm kinh nghiệm",
                icon: FaUserGraduate,
              },
              {
                name: "Lê Minh Cường",
                role: "Huấn luyện viên thi đấu",
                exp: "10 năm kinh nghiệm",
                icon: FaTrophy,
              },
            ].map((instructor, index) => (
              <div
                key={index}
                className="group glass rounded-2xl p-8 text-center hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              >
                <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <instructor.icon className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-2xl font-black text-dark-800 mb-2">
                  {instructor.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {instructor.role}
                </p>
                <p className="text-dark-600 mb-6 font-medium">
                  {instructor.exp}
                </p>
                <button className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all duration-300 hover:scale-105 font-semibold">
                  Xem Hồ Sơ
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
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
                <div className="glass-dark p-6 rounded-xl shadow-2xl hover-glow transition-all duration-300">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
                    <FaSwimmer className="text-xl text-primary-300" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-white">
                    Hồ Bơi Olympic
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    50m x 25m, đạt tiêu chuẩn quốc tế
                  </p>
                </div>
                <div className="glass-dark p-6 rounded-xl shadow-2xl hover-glow transition-all duration-300">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
                    <FaThermometerHalf className="text-xl text-ocean-300" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-white">
                    Hệ Thống Sưởi
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    Nhiệt độ nước luôn ổn định
                  </p>
                </div>
                <div className="glass-dark p-6 rounded-xl shadow-2xl hover-glow transition-all duration-300">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
                    <FaTools className="text-xl text-wave-300" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-white">
                    Lọc Nước Hiện Đại
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    Hệ thống lọc 24/7
                  </p>
                </div>
                <div className="glass-dark p-6 rounded-xl shadow-2xl hover-glow transition-all duration-300">
                  <div className="w-12 h-12 glass rounded-lg flex items-center justify-center mb-4">
                    <FaShower className="text-xl text-accent-300" />
                  </div>
                  <h3 className="font-black text-lg mb-2 text-white">
                    Phòng Thay Đồ
                  </h3>
                  <p className="text-white/80 text-sm font-medium">
                    Rộng rãi, sạch sẽ
                  </p>
                </div>
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

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className={`py-32 bg-gradient-to-br from-dark-50 to-dark-100 transition-all duration-1000 ${
          testimonialsVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              <FaStar className="text-lg" />
              Cảm Nhận
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-dark-800 mb-6">
              Học Viên Nói Gì Về Chúng Tôi
            </h2>
            <p className="text-xl text-dark-600 max-w-3xl mx-auto font-medium">
              Những chia sẻ chân thực từ các học viên đã thành công với chúng
              tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Thị Mai",
                age: "25 tuổi",
                content:
                  "Tôi đã học bơi ở đây và rất hài lòng. Huấn luyện viên rất tận tình, phương pháp dạy dễ hiểu.",
                rating: 5,
              },
              {
                name: "Trần Văn Nam",
                age: "30 tuổi",
                content:
                  "Con tôi 6 tuổi đã biết bơi sau 3 tháng học. Cảm ơn các thầy cô rất nhiều!",
                rating: 5,
              },
              {
                name: "Lê Thị Hoa",
                age: "35 tuổi",
                content:
                  "Môi trường học tập rất tốt, an toàn và chuyên nghiệp. Tôi sẽ giới thiệu cho bạn bè.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 hover-glow transition-all duration-500 hover:-translate-y-3 hover:scale-105"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <p className="text-dark-700 mb-6 italic font-medium">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-black text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-black text-dark-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-dark-600 text-sm font-medium">
                      {testimonial.age}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 gradient-deep">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Bắt Đầu Hành Trình Bơi Lội
            </h2>
            <p className="text-xl text-white/95 max-w-3xl mx-auto font-medium">
              Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt và bắt đầu hành trình
              học bơi của bạn
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaPhone className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg">Hotline</h3>
                      <p className="text-white/90 font-medium">0901 234 567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaEnvelope className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg">Email</h3>
                      <p className="text-white/90 font-medium">
                        info@swimcenter.vn
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-xl text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-lg">Địa Chỉ</h3>
                      <p className="text-white/90 font-medium">
                        123 Đường ABC, Quận 1, TP.HCM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <select className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                    <option value="" className="text-gray-800">
                      Chọn khóa học
                    </option>
                    <option value="basic" className="text-gray-800">
                      Bơi Cơ Bản
                    </option>
                    <option value="advanced" className="text-gray-800">
                      Bơi Nâng Cao
                    </option>
                    <option value="competition" className="text-gray-800">
                      Bơi Thi Đấu
                    </option>
                  </select>
                  <button className="w-full px-6 py-3 bg-white text-primary-600 rounded-lg font-black text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105">
                    Đăng Ký Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
                <FaSwimmer className="text-2xl text-primary-400" />
                SwimCenter
              </h3>
              <p className="text-gray-300 mb-4 font-medium">
                Trung tâm đào tạo bơi lội hàng đầu Việt Nam với 15 năm kinh
                nghiệm.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <FaFacebook className="text-white" />
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <FaInstagram className="text-white" />
                </div>
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all duration-300 hover:scale-110 cursor-pointer">
                  <FaTwitter className="text-white" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Khóa Học</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Bơi Cơ Bản
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Bơi Nâng Cao
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Bơi Thi Đấu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Bơi Trẻ Em
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Dịch Vụ</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Huấn Luyện Cá Nhân
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Huấn Luyện Nhóm
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Thi Đấu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors font-medium"
                  >
                    Sự Kiện
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-lg mb-4">Liên Hệ</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2 font-medium">
                  <FaPhone className="text-sm" />
                  0901 234 567
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <FaEnvelope className="text-sm" />
                  info@swimcenter.vn
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <FaMapMarkerAlt className="text-sm" />
                  123 Đường ABC, Quận 1, TP.HCM
                </li>
                <li className="flex items-center gap-2 font-medium">
                  <FaClock className="text-sm" />
                  6:00 - 22:00 (Hàng ngày)
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p className="font-medium">
              &copy; 2024 SwimCenter. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
