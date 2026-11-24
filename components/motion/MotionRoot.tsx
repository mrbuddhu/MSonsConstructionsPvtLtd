'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function canAnimate() {
  return document.documentElement.classList.contains('motion');
}

/**
 * Global motion layer: Lenis smooth scrolling synced to the GSAP ticker,
 * a single IntersectionObserver for every [data-reveal] / .split element,
 * and a hairline scroll-progress rule.
 */
export function MotionRoot() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Smooth scroll, once.
  useEffect(() => {
    if (!canAnimate()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -72 },
    });
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Scroll progress rule.
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reveals, re-scanned on every route.
  useEffect(() => {
    // Page curtain only on client navigations, never on first load (LCP).
    if (pathname !== firstPath.current) document.documentElement.classList.add('nav');
    if (!window.location.hash) {
      window.__lenis?.scrollTo(0, { immediate: true, force: true });
    }

    if (!canAnimate()) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.is-in), .split:not(.is-in)').forEach((el) => io.observe(el));
    };
    scan();
    // Catch anything rendered a tick later (client islands, images).
    const t = window.setTimeout(() => {
      scan();
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <div
      id="scroll-progress"
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left scale-x-0 bg-gold"
    />
  );
}
