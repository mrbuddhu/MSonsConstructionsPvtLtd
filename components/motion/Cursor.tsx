'use client';

import { useEffect, useRef } from 'react';

/**
 * Surveyor's crosshair. Fine pointers only, never with reduced motion.
 * Grows into a ring over links/buttons and a framed square over media.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const motion = document.documentElement.classList.contains('motion');
    if (!fine || !motion) return;

    document.documentElement.classList.add('has-cursor');
    el.style.display = 'block';

    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;
    let visible = false;

    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        cx = x;
        cy = y;
        visible = true;
        el.dataset.visible = 'true';
      }
      const target = e.target as Element | null;
      const media = target?.closest('[data-cursor="view"]');
      const link = target?.closest('a, button, [role="button"], input, textarea, label');
      el.dataset.state = media ? 'view' : link ? 'link' : 'idle';
    };
    const onLeave = () => {
      visible = false;
      el.dataset.visible = 'false';
    };
    const onDown = () => (el.dataset.down = 'true');
    const onUp = () => (el.dataset.down = 'false');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden style={{ display: 'none' }}>
      <span className="cursor-h" />
      <span className="cursor-v" />
      <span className="cursor-ring" />
    </div>
  );
}
