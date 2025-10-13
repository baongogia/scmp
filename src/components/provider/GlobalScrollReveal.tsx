"use client";
import React, { useEffect } from "react";

const GlobalScrollReveal: React.FC = () => {
  useEffect(() => {
    const candidates = new Set<HTMLElement>();

    document.querySelectorAll<HTMLElement>("section").forEach((el) => {
      el.classList.add("reveal-up");
      candidates.add(el);
    });

    document
      .querySelectorAll<HTMLElement>(
        "[data-reveal], .reveal-left, .reveal-right, .reveal-up"
      )
      .forEach((el) => candidates.add(el));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.classList.add("revealed");
          } else {
            el.classList.remove("revealed");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    candidates.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
};

export default GlobalScrollReveal;
