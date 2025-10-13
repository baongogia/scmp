"use client";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { contactInfo, courseOptions } from "../../../constants/sectionsData";

const ContactSection = () => {
  return (
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
                    <p className="text-white/90 font-medium">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg">Email</h3>
                    <p className="text-white/90 font-medium">
                      {contactInfo.email}
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
                      {contactInfo.address}
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
                  {courseOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="text-gray-800"
                    >
                      {option.label}
                    </option>
                  ))}
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
  );
};

export default ContactSection;
