import Link from 'next/link';
import { services } from '@/lib/services';
import { ServiceImage } from './ServiceImage';
import { AnimateIn } from './AnimateIn';

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-charcoal-50" aria-labelledby="services-heading">
      <div className="container-narrow">
        <AnimateIn className="text-center">
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading" className="heading-section mt-2">
            Our Services
          </h2>
        </AnimateIn>
        <AnimateIn delay={60}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-charcoal-600">
            From bathroom and kitchen renovations to extensions and general building—we deliver quality across London and surrounding areas.
          </p>
        </AnimateIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimateIn key={service.id} delay={80 + index * 60} variant="scale">
              <article
                id={service.id}
                className="card-premium group flex flex-col"
              >
                <ServiceImage
                  src={service.image}
                  alt={service.title}
                  title={service.title}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-charcoal-600">{service.description}</p>
                  <ul className="mt-3 flex-1 space-y-1.5 text-sm text-charcoal-700" role="list">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/services"
                    className="mt-4 text-sm font-semibold text-gold hover:text-gold-dark focus:text-gold-dark"
                  >
                    View all services →
                  </Link>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
        <AnimateIn delay={160}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="btn-dark"
            >
              View All Services
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
