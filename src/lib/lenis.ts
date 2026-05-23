import Lenis from "lenis";
import { frame, cancelFrame } from "motion/react";

let lenisInstance: Lenis | null = null;

export function createLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function update(data: { timestamp: number }) {
    lenis.raf(data.timestamp);
  }

  frame.update(update, true);
  lenisInstance = lenis;

  return {
    lenis,
    destroy: () => {
      cancelFrame(update);
      lenis.destroy();
      lenisInstance = null;
    },
  };
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(id: string) {
  const lenis = getLenis();
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: -80,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
