import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/services';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { PageHero } from '@/components/PageHero';
import { Parallax } from '@/components/motion/Parallax';
import { Split } from '@/components/motion/Split';

export const metadata: Metadata = {
  title: 'Services | M & Sons Construction Group LTD',
  description:
    'Bathroom renovations, kitchen installation, tiling, flooring, painting, roofing, and extensions. Quality building services across London.',
};

export default function ServicesPage() {
  return (
    <article>
      <PageHero title="Our Services">
        <p>
          From bathrooms and kitchens to extensions and general building—we deliver quality across London and surrounding areas.
        </p>
      </PageHero>

      <section className="grid-paper" aria-labelledby="services-list-heading">
        <h2 id="services-list-heading" className="sr-only">
          Service list
        </h2>
        <div className="shell">
          {services.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-24 gap-10 border-b border-ink/15 py-[clamp(4rem,9vw,8rem)] lg:grid-cols-12 lg:items-center lg:gap-12"
            >
              <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2 lg:col-start-6' : ''}`}>
                <div className="crop text-ink/40">
                  <div className="relative aspect-[4/3] overflow-hidden bg-concrete-800" data-reveal="clip" data-cursor="view">
                    <div className="absolute inset-0">
                      <Parallax amount={12}>
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                        />
                      </Parallax>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1 lg:col-start-1' : ''}`}>
                <span className="mono text-ink/50" aria-hidden>
                  {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
                </span>
                <Split text={service.title} className="heading-section mt-4 text-[clamp(2.4rem,4.6vw,4.6rem)]" />
                <p className="mt-6 text-ink/75" data-reveal>
                  {service.description}
                </p>
                <ul className="mt-8 border-t border-ink/15 text-ink/85" role="list">
                  {service.bullets.map((bullet, i) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-4 border-b border-ink/15 py-3"
                      data-reveal
                      style={{ ['--d' as string]: `${i * 70}ms` }}
                    >
                      <span className="h-px w-4 shrink-0 bg-ink" aria-hidden />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-padding bg-ink text-paper">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Split text="Get a free quote" className="heading-display" />
            <p className="lede mt-8 text-paper/75" data-reveal>
              Contact us to discuss your project. We serve London and surrounding areas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <Link href="/contact" className="btn-primary">
              Contact Us <span className="arrow" aria-hidden>→</span>
            </Link>
            <a href="tel:+447454704949" className="btn-outline-light">
              Call 07454 704949
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
