'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Desktop: pins the section and converts vertical scroll into a horizontal
 * pass across every service card. Mobile / reduced motion: a plain stack.
 */
export function ServicesRail({ children, count }: { children: ReactNode; count: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    if (!document.documentElement.classList.contains('motion')) return;
    const mq = window.matchMedia('(min-width: 768px)');

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setup = async () => {
      cleanup?.();
      cleanup = undefined;
      wrap.style.height = '';
      track.style.transform = '';
      if (!mq.matches) {
        wrap.dataset.rail = 'off';
        return;
      }
      wrap.dataset.rail = 'on';
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const measure = () => Math.max(0, track.scrollWidth - window.innerWidth);
      let distance = measure();
      wrap.style.height = `${distance + window.innerHeight}px`;
      const imgs = Array.from(track.querySelectorAll<HTMLElement>('.rail-img'));

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onRefreshInit() {
          distance = measure();
          wrap.style.height = `${distance + window.innerHeight}px`;
        },
        onUpdate(self) {
          const x = -self.progress * distance;
          track.style.transform = `translate3d(${x}px,0,0)`;
          if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          if (numRef.current) {
            const n = Math.min(count, Math.max(1, Math.round(self.progress * (count - 1)) + 1));
            numRef.current.textContent = String(n).padStart(2, '0');
          }
          // Each image drifts against the track for depth.
          const vw = window.innerWidth;
          for (const img of imgs) {
            const r = img.parentElement!.getBoundingClientRect();
            const c = (r.left + r.width / 2 - vw / 2) / vw;
            img.style.transform = `translate3d(${c * -6}%,0,0)`;
          }
        },
      });
      ScrollTrigger.refresh();
      cleanup = () => st.kill();
    };

    setup();
    const onChange = () => setup();
    mq.addEventListener('change', onChange);
    return () => {
      cancelled = true;
      mq.removeEventListener('change', onChange);
      cleanup?.();
    };
  }, [count]);

  return (
    <div ref={wrapRef} className="rail relative mt-16 md:mt-24" data-rail="off">
      <div className="rail-stage">
        <div ref={trackRef} className="rail-track">
          {children}
        </div>
        <div className="rail-hud shell hidden items-center gap-6 md:flex" aria-hidden>
          <span className="mono text-paper/60">
            <span ref={numRef} className="text-gold">01</span> / {String(count).padStart(2, '0')}
          </span>
          <div className="relative h-px flex-1 bg-paper/15">
            <div ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
