'use client';

import { useEffect, useRef } from 'react';

/**
 * Decorative kinetic band using the company's own strapline. Scroll drives it
 * sideways; it is hidden from assistive tech (the line appears as text above).
 */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !document.documentElement.classList.contains('motion')) return;
    let kill: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const rows = el.querySelectorAll<HTMLElement>('[data-row]');
      const tweens = Array.from(rows).map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -30 : 0 },
          {
            xPercent: i % 2 ? 0 : -30,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }
        )
      );
      kill = () => tweens.forEach((t) => (t.scrollTrigger?.kill(), t.kill()));
    })();
    return () => {
      cancelled = true;
      kill?.();
    };
  }, []);

  const words = ['Trusted', 'Reliable', 'Quality'];
  const row = (outline: boolean) =>
    Array.from({ length: 4 }).flatMap((_, k) =>
      words.map((w, i) => (
        <span key={`${k}-${i}`} className="flex items-center gap-[0.35em] whitespace-nowrap">
          <span className={outline && i === 1 ? 'marquee-outline' : ''}>{w}</span>
          <span className="inline-block h-[0.16em] w-[0.16em] translate-y-[-0.05em] bg-gold" />
        </span>
      ))
    );

  return (
    <div ref={ref} aria-hidden className="overflow-hidden bg-ink py-8 text-paper md:py-12">
      <div data-row className="type-display flex gap-[0.35em] text-[clamp(3.5rem,11vw,11rem)]">
        {row(true)}
      </div>
      <div data-row className="type-display mt-2 flex gap-[0.35em] text-[clamp(3.5rem,11vw,11rem)] text-concrete-600">
        {row(false)}
      </div>
    </div>
  );
}
