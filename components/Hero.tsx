'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Split } from './motion/Split';
import { Magnetic } from './motion/Magnetic';

const FLOORS_DESKTOP = 7;
const FLOORS_MOBILE = 5;

/**
 * Scroll-scrubbed hero. While pinned, a steel frame assembles floor by floor
 * over its own blueprint (three.js), then the finished-house photograph opens
 * out of the frame to full bleed. Without motion (or WebGL) the section is a
 * single still screen with the photograph.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const [floors, setFloors] = useState(FLOORS_DESKTOP);
  const [gl, setGl] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    if (!document.documentElement.classList.contains('motion')) return;

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const nFloors = mobile ? FLOORS_MOBILE : FLOORS_DESKTOP;
    setFloors(nFloors);

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ createBuildScene, hasWebGL }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('@/lib/buildScene'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const webgl = hasWebGL();
      const scene = webgl ? createBuildScene(canvas, { mobile }) : null;
      setGl(!!scene);
      if (!scene) {
        // No WebGL: fall back to the still hero, no pinning.
        section.dataset.nogl = 'true';
        return;
      }

      // Intro: the first storey goes up on its own so the page never opens empty.
      const intro = { v: 0 };
      let scrollBuild = 0;
      const push = () => scene?.setBuild(Math.max(intro.v, scrollBuild));
      const introTween = gsap.to(intro, { v: 1 / nFloors, duration: 2.2, delay: 0.6, ease: 'power2.out', onUpdate: push });

      let lastLevel = -1;
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate(self) {
          const p = self.progress;
          scrollBuild = Math.min(1, p / 0.62);
          const reveal = Math.min(1, Math.max(0, (p - 0.6) / 0.32));
          section.style.setProperty('--r', reveal.toFixed(4));
          section.style.setProperty('--b', scrollBuild.toFixed(4));
          section.style.setProperty('--p', p.toFixed(4));
          push();
          const level = Math.max(1, Math.min(nFloors, Math.ceil(Math.max(intro.v, scrollBuild) * nFloors)));
          if (level !== lastLevel && counterRef.current) {
            lastLevel = level;
            counterRef.current.textContent = String(level).padStart(2, '0');
            rulerRef.current?.querySelectorAll('[data-tick]').forEach((el, i) => {
              (el as HTMLElement).dataset.on = i < level ? 'true' : 'false';
            });
          }
        },
      });

      const io = new IntersectionObserver(([e]) => {
        if (!scene) return;
        if (e.isIntersecting) scene.start();
        else scene.stop();
      });
      io.observe(section);

      const onResize = () => scene?.resize();
      const onPointer = (e: PointerEvent) => {
        scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener('resize', onResize);
      window.addEventListener('pointermove', onPointer, { passive: true });

      cleanup = () => {
        introTween.kill();
        st.kill();
        io.disconnect();
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onPointer);
        scene?.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative bg-ink text-paper"
      aria-labelledby="hero-heading"
      data-gl={gl ? 'true' : undefined}
    >
      <div className="hero-stage sticky top-0 h-[100svh] overflow-hidden grid-dark">
        {/* 3D frame */}
        <canvas
          ref={canvasRef}
          aria-hidden
          className="hero-canvas absolute inset-0 h-full w-full"
        />

        {/* The finished building: opens out of the frame */}
        <div className="hero-photo absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80"
            alt="Modern house exterior with new roofing"
            fill
            priority
            sizes="100vw"
            className="hero-photo-img object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" aria-hidden />
        </div>

        {/* Floor ruler */}
        <div
          ref={rulerRef}
          aria-hidden
          className="hero-hud pointer-events-none absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col-reverse items-end gap-3 md:flex"
        >
          {Array.from({ length: floors }).map((_, i) => (
            <span key={i} data-tick data-on={i === 0 ? 'true' : 'false'} className="hero-tick" />
          ))}
          <span className="mono mb-3 text-paper/60">
            <span ref={counterRef} className="text-gold">01</span> / {String(floors).padStart(2, '0')}
          </span>
        </div>

        {/* Copy */}
        <div className="shell relative z-10 flex h-full flex-col justify-end pb-[calc(3.75rem+max(1.75rem,4vh))] pt-24 md:pb-[max(4.5rem,9vh)] md:pt-28">
          <p className="eyebrow text-gold auto-in" data-reveal="fade" style={{ ['--d' as string]: '500ms' }}>
            London &amp; surrounding areas
          </p>
          <Split
            as="h1"
            id="hero-heading"
            text="Trusted Construction & Renovation Experts in London"
            delay={650}
            accent="&"
            className="auto-in type-display mt-5 max-w-[13ch] text-[clamp(3.1rem,8.2vw,9rem)] text-paper md:max-w-[15ch]"
          />
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p
              className="lede max-w-md text-paper/80 auto-in"
              data-reveal
              style={{ ['--d' as string]: '1200ms' }}
            >
              High-quality building services for residential and commercial projects.
            </p>
            <div className="flex flex-wrap gap-3 auto-in" data-cta-zone data-reveal style={{ ['--d' as string]: '1350ms' }}>
              <Magnetic>
                <Link href="/#contact" className="btn-primary">
                  Get Free Quote <span className="arrow" aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a href="tel:+447454704949" className="btn-outline-light">
                  Call Now
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Drawing-sheet frame: drafted border, grid references, and a tape
            measure along the bottom whose brass marker tracks the build. */}
        <div aria-hidden className="sheet pointer-events-none absolute inset-2.5 z-[5] md:inset-5">
          <span className="sheet-line sheet-top" />
          <span className="sheet-line sheet-right" />
          <span className="sheet-line sheet-bottom" />
          <span className="sheet-line sheet-left" />
          <span className="sheet-corner sheet-tl" />
          <span className="sheet-corner sheet-tr" />
          <span className="sheet-corner sheet-bl" />
          <span className="sheet-corner sheet-br" />
          <div className="sheet-tape hidden md:block">
            <div className="sheet-tape-ticks" />
            <div className="sheet-refs-x">
              {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
            <span className="sheet-marker" />
          </div>
        </div>
      </div>
    </section>
  );
}
