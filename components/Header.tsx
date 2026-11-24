'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Magnetic } from './motion/Magnetic';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const PhoneIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 500 && y > last + 2);
      if (y < last - 2 || y < 500) setHidden(false);
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (mobileOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  // Brass marker that glides to whichever link is hovered, resting on the active one.
  const moveTo = useCallback((el: Element | null) => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;
    if (!el) {
      pill.style.opacity = '0';
      return;
    }
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // Rule spans the label, inset by the link's horizontal padding (16px).
    pill.style.opacity = '1';
    pill.style.setProperty('--x', `${r.left - l.left + 16}px`);
    pill.style.setProperty('--s', `${Math.max(0, r.width - 32) / 100}`);
  }, []);

  const rest = useCallback(() => {
    moveTo(listRef.current?.querySelector('[aria-current="page"]') ?? null);
  }, [moveTo]);

  useEffect(() => {
    // Wait a frame for fonts/layout, then park on the active link.
    const t = window.setTimeout(rest, 60);
    const onResize = () => rest();
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(rest).catch(() => {});
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname, rest, solid]);

  return (
    <header className="text-paper" role="banner">
      <div
        className={`nav-wrap fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
        data-solid={solid && !mobileOpen ? 'true' : 'false'}
      >
        <div className="nav-surface" aria-hidden>
          <span className="nav-tick nav-tick-tl" />
          <span className="nav-tick nav-tick-tr" />
          <span className="nav-tick nav-tick-bl" />
          <span className="nav-tick nav-tick-br" />
        </div>
        <div className="nav-bar">

          <Link
            href="/"
            className="relative z-10 flex items-center"
            aria-label="M & Sons Construction Group LTD - Home"
          >
            <Image
              src="/logo.png"
              alt="M & Sons Construction Group LTD logo"
              width={220}
              height={220}
              className="nav-logo w-auto"
              priority
            />
            <span className="sr-only">M & Sons Construction Group LTD</span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-6" aria-label="Main navigation">
            <ul ref={listRef} className="relative flex items-center" onMouseLeave={rest}>
              <li ref={pillRef} className="nav-pill" aria-hidden />
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? 'page' : undefined}
                      onMouseEnter={(e) => moveTo(e.currentTarget)}
                      onFocus={(e) => moveTo(e.currentTarget)}
                      onBlur={rest}
                      className={`relative flex px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                        active ? 'text-paper' : 'text-paper/65 hover:text-paper'
                      }`}
                    >
                      <span className="roll">
                        <span>{label}</span>
                        <span aria-hidden>{label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span className="h-5 w-px bg-paper/15" aria-hidden />
            <Magnetic strength={0.2}>
              <Link href="tel:+447454704949" className="btn-outline-light nav-call !h-10 !px-4 !py-0 text-sm">
                <PhoneIcon className="nav-call-icon h-4 w-4 text-gold" />
                Call Now
              </Link>
            </Magnetic>
          </nav>

          <button
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3 w-7" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-out ${
                  mobileOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out ${
                  mobileOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 z-40 grid-dark md:hidden ${mobileOpen ? 'is-open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="shell flex h-full flex-col justify-between pb-24 pt-28">
          <ul className="space-y-1">
            {navLinks.map(({ href, label }, i) => (
              <li key={href} className="overflow-hidden border-b border-paper/10">
                <Link
                  href={href}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={`mobile-link type-display block py-2 text-[3.4rem] ${pathname === href ? 'text-gold' : 'text-paper'}`}
                  style={{ ['--i' as string]: i }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="tel:+447454704949"
            tabIndex={mobileOpen ? 0 : -1}
            className="btn-primary mobile-cta w-full justify-between"
            onClick={() => setMobileOpen(false)}
          >
            Call 07454 704949{' '}
            <span className="arrow" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
