"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return;

  // Enable smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";
};

export const createScrollTrigger = (
  element: HTMLElement,
  animation: gsap.core.Tween,
  options?: ScrollTrigger.Vars
) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    ...options,
    animation,
  });
};

export const animateOnScroll = (
  selector: string,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  scrollTriggerOptions?: ScrollTrigger.Vars
) => {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.fromTo(element, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...scrollTriggerOptions,
      },
    });
  });
};

export const staggerAnimation = (
  selector: string,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerDelay: number = 0.1
) => {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll(selector);

  gsap.fromTo(elements, fromVars, {
    ...toVars,
    stagger: staggerDelay,
    scrollTrigger: {
      trigger: elements[0],
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
};

export const parallaxEffect = (selector: string, speed: number = 0.5) => {
  if (typeof window === "undefined") return;

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

export const waveAnimation = (element: HTMLElement) => {
  if (typeof window === "undefined") return;

  return gsap.to(element, {
    y: -10,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
};

export const floatingAnimation = (
  element: HTMLElement,
  intensity: number = 10
) => {
  if (typeof window === "undefined") return;

  return gsap.to(element, {
    y: intensity,
    duration: 3,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
};
