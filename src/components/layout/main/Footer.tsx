"use client";
import React from "react";
import {
  FaSwimmer,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { contactInfo, socialLinks } from "../../../constants/sectionsData";

const Footer = () => {
  return (
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
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <div
                    key={index}
                    className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <IconComponent className="text-white" />
                  </div>
                );
              })}
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
                {contactInfo.phone}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <FaEnvelope className="text-sm" />
                {contactInfo.email}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <FaMapMarkerAlt className="text-sm" />
                {contactInfo.address}
              </li>
              <li className="flex items-center gap-2 font-medium">
                <FaClock className="text-sm" />
                {contactInfo.workingHours}
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
  );
};

export default Footer;
