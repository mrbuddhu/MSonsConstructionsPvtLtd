'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-charcoal-800/20 bg-charcoal-900/95 backdrop-blur-sm"
      role="banner"
    >
      <div className="container-narrow flex h-16 items-center justify-between md:h-18">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="M & Sons Construction Group LTD - Home"
        >
          <Image
            src="/logo.png"
            alt="M & Sons Construction Group LTD logo"
            width={220}
            height={70}
            className="h-14 md:h-16 w-auto"
            priority
          />
          <span className="sr-only">M & Sons Construction Group LTD</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link-animate text-sm font-medium transition-colors hover:text-gold ${
                pathname === href ? 'text-gold' : 'text-white/90'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="tel:+447454704949"
            className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-charcoal-900 transition-colors hover:bg-gold-light"
          >
            Call Now
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="sr-only">Menu</span>
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`border-t border-charcoal-800/30 bg-charcoal-900 md:hidden ${mobileOpen ? 'block' : 'hidden'}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="container-narrow flex flex-col gap-1 py-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-md px-4 py-3 text-sm font-medium ${
                pathname === href ? 'bg-charcoal-700 text-gold' : 'text-white/90 hover:bg-charcoal-800'
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="tel:+447454704949"
            className="mt-2 rounded-md bg-gold px-4 py-3 text-center text-sm font-semibold text-charcoal-900"
            onClick={() => setMobileOpen(false)}
          >
            Call 07454 704949
          </a>
        </div>
      </div>
    </header>
  );
}
