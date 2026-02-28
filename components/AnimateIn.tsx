'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Variant = 'up' | 'left' | 'right' | 'scale';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: Variant;
};

const variantClasses: Record<Variant, { off: string; on: string }> = {
  up: { off: 'translate-y-8 opacity-0', on: 'translate-y-0 opacity-100' },
  left: { off: 'translate-x-8 opacity-0', on: 'translate-x-0 opacity-100' },
  right: { off: '-translate-x-8 opacity-0', on: 'translate-x-0 opacity-100' },
  scale: { off: 'scale-[0.97] opacity-0', on: 'scale-100 opacity-100' },
};

export function AnimateIn({ children, delay = 0, className = '', variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { off, on } = variantClasses[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setVisible(true), delay);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-animate-in will-change-transform ${
        visible ? on : off
      } ${className}`}
      >
      {children}
    </div>
  );
}
