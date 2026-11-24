import Link from 'next/link';
import { services } from '@/lib/services';
import { ServicesRail } from './ServicesRail';
import { ServiceCard } from './ServiceCard';
import { Split } from './motion/Split';

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-ink pt-[clamp(5rem,12vw,10rem)] text-paper" aria-labelledby="services-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold" data-reveal>
              What we do
            </p>
            <Split id="services-heading" text="Our Services" className="heading-section mt-6" />
          </div>
          <div className="space-y-5 text-paper/70 lg:col-span-6 lg:col-start-7 lg:pt-4">
            <p className="lede text-paper/85" data-reveal>
              At M &amp; Sons Construction Group LTD, we provide complete building and renovation services for
              homes and commercial properties across London and surrounding areas.
            </p>
            <p data-reveal style={{ ['--d' as string]: '100ms' }}>
              Our team handles everything from small improvements to full property refurbishments with the same
              focus on quality and reliability.
            </p>
            <p className="text-sm text-paper/55" data-reveal style={{ ['--d' as string]: '200ms' }}>
              From general building, house extensions and roofing, to bathrooms, kitchens, flooring, underfloor heating,
              plumbing, electrics and full property renovations — our team covers every aspect of your project.
            </p>
          </div>
        </div>
      </div>

      <ServicesRail count={services.length}>
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} total={services.length} />
        ))}
      </ServicesRail>

      <div className="shell pb-[clamp(5rem,10vw,8rem)]">
        <div className="flex justify-start border-t border-paper/15 pt-10 md:justify-end" data-cta-zone data-reveal>
          <Link href="/services" className="btn-primary">
            View All Services <span className="arrow" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
