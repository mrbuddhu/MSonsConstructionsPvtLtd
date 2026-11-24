import Link from 'next/link';
import Image from 'next/image';

const currentYear = new Date().getFullYear();

const serviceLinks = [
  ['general-building', 'General Building & Renovations'],
  ['roofing', 'Roofing'],
  ['extensions', 'Extensions'],
  ['tiling', 'Tiling'],
  ['bathroom-installation', 'Bathroom Installation'],
  ['kitchen', 'Kitchen Installation'],
  ['painting', 'Painting & Decorating'],
  ['flooring', 'Flooring'],
  ['bathroom-renovation', 'Bathroom Renovation'],
  ['underfloor-heating', 'Underfloor Heating'],
  ['plumbing', 'Plumbing'],
] as const;

const quickLinks = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/blog', 'Blog'],
  ['/contact', 'Contact'],
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper" role="contentinfo">
      <div className="shell pt-[clamp(4rem,9vw,7rem)]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Image
              src="/logo.png"
              alt="M & Sons Construction Group LTD logo"
              width={260}
              height={260}
              className="-ml-4 h-36 w-auto md:h-40"
            />
            <p className="mt-2 max-w-xs text-sm text-paper/65">Trusted builders in London & surrounding areas.</p>
          </div>
          <div className="lg:col-span-3">
            <h4 className="mono text-paper/45">Contact</h4>
            <address className="mt-5 space-y-1 not-italic text-paper/85">
              <p>99A Woodstock Gardens</p>
              <p>Hayes, UB4 8BA</p>
              <p className="pt-4">
                <a href="tel:+447454704949" className="link-line hover:text-gold focus:text-gold">
                  07454 704949
                </a>
              </p>
              <p>
                <a href="mailto:info@construction-group.co.uk" className="link-line break-all hover:text-gold focus:text-gold">
                  info@construction-group.co.uk
                </a>
              </p>
            </address>
          </div>
          <div className="lg:col-span-4">
            <h4 className="mono text-paper/45">Services</h4>
            <ul className="mt-5 grid gap-x-6 gap-y-1.5 text-sm text-paper/80 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {serviceLinks.map(([id, label]) => (
                <li key={id}>
                  <Link href={`/services#${id}`} className="link-line hover:text-gold focus:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="mono text-paper/45">Quick Links</h4>
            <ul className="mt-5 space-y-1.5 text-sm text-paper/80">
              {quickLinks.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="link-line hover:text-gold focus:text-gold">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="shell mt-20" data-reveal>
        <h3 className="footer-word type-display select-none text-paper">M & Sons Construction Group LTD</h3>
      </div>

      <div className="shell">
        <div className="flex flex-col gap-2 border-t border-paper/10 py-7 text-xs text-paper/50 md:flex-row md:items-center md:justify-between md:pr-24">
          <p>&copy; {currentYear} M &amp; Sons Construction Group LTD. All rights reserved.</p>
          <p>
            Crafted with ❤️ at{' '}
            <a href="https://sanganak.com" target="_blank" rel="noopener noreferrer" className="link-line hover:text-gold">
              SanganakHQ
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
