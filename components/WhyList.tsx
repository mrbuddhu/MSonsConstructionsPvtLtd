'use client';

import { useEffect, useRef } from 'react';

/** Rows light up as they cross the middle of the viewport, like a level line. */
export function WhyList({ points }: { points: string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || !document.documentElement.classList.contains('motion')) return;
    list.dataset.focus = 'on';
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).dataset.active = e.isIntersecting ? 'true' : 'false';
      },
      { rootMargin: '-42% 0px -42% 0px' }
    );
    list.querySelectorAll('li').forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="why-list border-t border-ink" role="list">
      {points.map((point, i) => (
        <li key={point} className="why-row group relative border-b border-ink" data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
          <div className="flex items-baseline gap-5 py-7 md:gap-10 md:py-10">
            <span className="mono shrink-0 text-ink/60" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="heading-sub why-text text-[clamp(1.7rem,4.2vw,3.9rem)]">{point}</span>
            <svg
              className="why-check ml-auto hidden h-8 w-8 shrink-0 self-center md:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path d="M4 12.5l5 5L20 6.5" pathLength={1} />
            </svg>
          </div>
        </li>
      ))}
    </ul>
  );
}
