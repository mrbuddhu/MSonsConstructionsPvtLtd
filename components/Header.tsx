"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (mobileOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header className="text-paper" role="banner">
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out ${
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"
        } ${solid && !mobileOpen ? "border-b border-paper/10 bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"}`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
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
              className="h-14 w-auto md:h-[4.5rem]"
              priority
            />
            <span className="sr-only">M & Sons Construction Group LTD</span>
          </Link>

          <nav
            className="hidden md:flex md:items-center md:gap-9"
            aria-label="Main navigation"
          >
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-[0.82rem] font-medium transition-colors ${active ? "text-gold" : "text-paper/85 hover:text-paper"}`}
                >
                  <span className="roll">
                    <span>{label}</span>
                    <span aria-hidden>{label}</span>
                  </span>
                  {active ? (
                    <span
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-gold"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              );
            })}
            <Link
              href="tel:+447454704949"
              className="btn-primary !px-5 !py-2.5 text-[0.82rem]"
            >
              Call Now
            </Link>
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
                  mobileOpen ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out ${
                  mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu fixed inset-0 z-40 grid-dark md:hidden ${mobileOpen ? "is-open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="shell flex h-full flex-col justify-between pb-24 pt-28">
          <ul className="space-y-1">
            {navLinks.map(({ href, label }, i) => (
              <li key={href} className="overflow-hidden">
                <Link
                  href={href}
                  tabIndex={mobileOpen ? 0 : -1}
                  className={`mobile-link type-display block py-1 text-[3.6rem] ${pathname === href ? "text-gold" : "text-paper"}`}
                  style={{ ["--i" as string]: i }}
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
            Call 07454 704949{" "}
            <span className="arrow" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
