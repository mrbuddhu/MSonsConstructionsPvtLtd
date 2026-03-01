import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/services';
import { ImageWithFallback } from '@/components/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Services | M & Sons Construction Group LTD',
  description:
    'Bathroom renovations, kitchen installation, tiling, flooring, painting, roofing, and extensions. Quality building services across London.',
};

export default function ServicesPage() {
  return (
    <article>
      <section className="bg-charcoal-900 py-20 md:py-28">
        <div className="container-narrow text-center">
          <h1 className="heading-display text-white">Our Services</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            From bathrooms and kitchens to extensions and general building—we deliver quality across London and surrounding areas.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="services-list-heading">
        <div className="container-narrow">
          <h2 id="services-list-heading" className="sr-only">Service list</h2>
          <div className="space-y-20">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal-100 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="heading-section">{service.title}</h2>
                  <p className="mt-3 text-charcoal-600">{service.description}</p>
                  <ul className="mt-4 space-y-2 text-charcoal-700" role="list">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal-50">
        <div className="container-narrow text-center">
          <h2 className="heading-section">Get a free quote</h2>
          <p className="mt-3 text-charcoal-600">
            Contact us to discuss your project. We serve London and surrounding areas.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-md bg-gold px-6 py-3 font-semibold text-charcoal-900 hover:bg-gold-light focus:bg-gold-light"
            >
              Contact Us
            </Link>
            <a
              href="tel:+447454704949"
              className="inline-flex rounded-md border-2 border-charcoal-800 px-6 py-3 font-semibold text-charcoal-900 hover:bg-charcoal-100 focus:bg-charcoal-100"
            >
              Call 07454 704949
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
