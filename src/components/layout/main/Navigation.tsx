"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaHome,
  FaCalendarAlt,
  FaGraduationCap,
  FaPhone,
} from "react-icons/fa";
import Lenis from "lenis";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const lenisRef = useRef<Lenis | null>(null);

  const navigationItems = [
    {
      id: "home",
      label: "Trang chủ",
      icon: FaHome,
      target: "hero",
    },
    {
      id: "events",
      label: "Sự kiện",
      icon: FaCalendarAlt,
      target: "events",
    },
    {
      id: "courses",
      label: "Khóa học",
      icon: FaGraduationCap,
      target: "courses",
    },
    {
      id: "contact",
      label: "Liên hệ",
      icon: FaPhone,
      target: "contact",
    },
  ];

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
        infinite: false,
        wheelMultiplier: 1,
        lerp: 0.1,
        syncTouch: true,
        syncTouchLerp: 0.075,
      });

      const raf = (time: number) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      return () => {
        lenisRef.current?.destroy();
      };
    }
  }, []);

  // Smooth scroll to section using Lenis
  const scrollToSection = (targetId: string, tabId: string) => {
    // Set active tab immediately
    setActiveTab(tabId);

    const element = document.getElementById(targetId);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: -80,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  // Handle scroll to update active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.target),
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveTab(section.id);
          break;
        }
      }
    };

    // Listen to Lenis scroll events with proper timing
    if (lenisRef.current) {
      lenisRef.current.on("scroll", handleScroll);
    }

    // Fallback to window scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed transform top-6 w-screen z-50"
    >
      <div className="relative">
        {/* Glass background */}
        <div
          className="absolute left-1/2 w-1/4 -translate-x-1/2
         inset-0 bg-black/20 backdrop-blur-xl rounded-2xl border-black/20 shadow-2xl"
        />

        {/* Navigation content */}
        <div className="relative px-6 py-4">
          <div className="flex items-center justify-center space-x-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.target, item.id);
                  }}
                  className="relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {/* Active background */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.15,
                          ease: "easeOut",
                          layout: { duration: 0.15, ease: "easeOut" },
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all duration-100 ${
                        isActive
                          ? "text-gray-800"
                          : "text-white/90 group-hover:text-white"
                      }`}
                    />
                  </motion.div>

                  {/* Text Label */}
                  <motion.span
                    className={`relative z-10 text-sm font-medium transition-all duration-100 ${
                      isActive
                        ? "text-gray-800"
                        : "text-white/90 group-hover:text-white"
                    }`}
                    animate={{
                      fontWeight: isActive ? 600 : 500,
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                  >
                    {item.label}
                  </motion.span>

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    whileTap={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
