import Link from 'next/link';
import Image from 'next/image';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800/20 bg-charcoal-900 text-white" role="contentinfo">
      <div className="container-narrow section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="space-y-3 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="M & Sons Construction Group LTD logo"
                width={260}
                height={90}
                className="h-28 md:h-32 w-auto"
              />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-gold">M & Sons Construction Group LTD</h3>
            <p className="mt-2 text-sm text-white/80">Trusted builders in London & surrounding areas.</p>
          </div>
          <div className="space-y-3 lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact</h4>
            <address className="mt-3 not-italic text-sm text-white/80">
              <p>99A Woodstock Gardens</p>
              <p>Hayes, UB4 8BA</p>
              <p className="mt-2">
                <a href="tel:+447454704949" className="hover:text-gold focus:text-gold">
                  07454 704949
                </a>
              </p>
              <p>
                <a href="mailto:manaf.alfrouh@yahoo.com" className="hover:text-gold focus:text-gold">
                  manaf.alfrouh@yahoo.com
                </a>
              </p>
            </address>
          </div>
          <div className="space-y-3 lg:col-span-4 lg:border-l lg:border-charcoal-800/50 lg:pl-8">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Services</h4>
            <div className="mt-3 text-sm text-white/80">
              <ul className="space-y-1">
                <li><Link href="/services#roofing" className="whitespace-nowrap hover:text-gold focus:text-gold">Roofing</Link></li>
                <li><Link href="/services#extensions" className="whitespace-nowrap hover:text-gold focus:text-gold">Extensions</Link></li>
                <li><Link href="/services#tiling" className="whitespace-nowrap hover:text-gold focus:text-gold">Tiling</Link></li>
                <li><Link href="/services#bathroom-installation" className="whitespace-nowrap hover:text-gold focus:text-gold">Bathroom Installation</Link></li>
                <li><Link href="/services#kitchen" className="whitespace-nowrap hover:text-gold focus:text-gold">Kitchen Installation</Link></li>
                <li><Link href="/services#painting" className="whitespace-nowrap hover:text-gold focus:text-gold">Painting &amp; Decorating</Link></li>
                <li><Link href="/services#flooring" className="whitespace-nowrap hover:text-gold focus:text-gold">Flooring</Link></li>
                <li><Link href="/services#bathroom-renovation" className="whitespace-nowrap hover:text-gold focus:text-gold">Bathroom Renovation</Link></li>
                <li><Link href="/services#underfloor-heating" className="whitespace-nowrap hover:text-gold focus:text-gold">Underfloor Heating</Link></li>
                <li><Link href="/services#plumbing" className="whitespace-nowrap hover:text-gold focus:text-gold">Plumbing</Link></li>
              </ul>
            </div>
          </div>
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Quick Links</h4>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li><Link href="/" className="hover:text-gold focus:text-gold">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold focus:text-gold">About</Link></li>
              <li><Link href="/services" className="hover:text-gold focus:text-gold">Services</Link></li>
              <li><Link href="/contact" className="hover:text-gold focus:text-gold">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-charcoal-700 pt-8 text-center text-sm text-white/60">
          <p>&copy; {currentYear} M & Sons Construction Group LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
