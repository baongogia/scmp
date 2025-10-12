"use client";
import React, { useState, useEffect } from "react";

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "hero", label: "Trang Chủ" },
    { id: "story", label: "Về Chúng Tôi" },
    { id: "courses", label: "Khóa Học" },
    { id: "instructors", label: "Huấn Luyện Viên" },
    { id: "facilities", label: "Cơ Sở" },
    { id: "testimonials", label: "Đánh Giá" },
    { id: "contact", label: "Liên Hệ" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-primary-800" : "text-white"
              }`}
            >
              🏊‍♂️ SwimCenter
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:bg-primary-100 ${
                    isScrolled
                      ? "text-primary-700 hover:text-primary-900"
                      : "text-white hover:text-primary-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-primary-600 text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-primary-700 hover:scale-105 hover:shadow-lg"
            >
              Đăng Ký Ngay
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled
                  ? "text-primary-700 hover:text-primary-900 hover:bg-primary-100"
                  : "text-white hover:text-primary-200 hover:bg-white/10"
              }`}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-100 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 mt-4 bg-primary-600 text-white rounded-md font-semibold transition-all duration-300 hover:bg-primary-700"
              >
                Đăng Ký Ngay
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
