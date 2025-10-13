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

// Global scroll reveal for elements with class `.scroll-reveal`
// Works when scrolling down and reverses when scrolling up.
export const initGlobalScrollReveal = (options?: {
  selector?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: Partial<ScrollTrigger.Vars>;
}) => {
  if (typeof window === "undefined") return;

  const selector = options?.selector ?? ".scroll-reveal";
  const fromVars: gsap.TweenVars = options?.from ?? { opacity: 0, y: 50 };
  const toVars: gsap.TweenVars = options?.to ?? {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  };
  const triggerDefaults: ScrollTrigger.Vars = {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    // markers: true, // uncomment for debugging
  };

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
  elements.forEach((el) => {
    // Prevent duplicate triggers in Fast Refresh/navigation
    ScrollTrigger.getAll()
      .filter((st) => st.trigger === el)
      .forEach((st) => st.kill());

    if (options?.to) {
      // Use tween-based reveal when explicit to-vars provided
      gsap.fromTo(el, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          ...triggerDefaults,
          ...(options?.trigger ?? {}),
        },
      });
    } else {
      // Default: CSS-driven reveal using toggleClass for both directions
      ScrollTrigger.create({
        trigger: el,
        ...triggerDefaults,
        ...(options?.trigger ?? {}),
        toggleClass: { targets: el, className: "revealed" },
      });
    }
  });

  // Refresh after images/fonts load to ensure correct start/end
  ScrollTrigger.refresh();
};

// Utility to re-init on route changes or dynamic content
export const reInitScrollReveal = () => {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((st) => st.kill());
  initGlobalScrollReveal();
};
