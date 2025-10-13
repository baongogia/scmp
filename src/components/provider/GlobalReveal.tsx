"use client";
import React, { useEffect } from "react";

const GlobalReveal: React.FC = () => {
  useEffect(() => {
    const root = document.body;
    if (!root) return;

    const candidates = new Set<HTMLElement>();

    // Default: all sections participate
    document.querySelectorAll<HTMLElement>("section").forEach((el) => {
      el.classList.add("reveal-up");
      candidates.add(el);
    });

    // Explicitly marked elements
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    candidates.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
};

export default GlobalReveal;
