import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { Split } from '@/components/motion/Split';

export const metadata: Metadata = {
  title: 'About Us | M & Sons Construction Group LTD',
  description:
    'M & Sons Construction Group LTD is a trusted construction company in the UK, specialising in bathroom and kitchen renovations and general building services across London.',
};

const points = [
  'Experienced and skilled builders',
  'High-quality materials and workmanship',
  'Professional and reliable service',
  'Competitive pricing',
  'Customer satisfaction guaranteed',
];

export default function AboutPage() {
  return (
    <article>
      <PageHero
        title="About Us"
        image={{
          src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80',
          alt: 'Builders working on a modern house extension',
        }}
      >
        <p>Trusted builders serving London and surrounding areas</p>
      </PageHero>

      <section className="section-padding grid-paper">
        <div className="shell">
          <h2 className="sr-only">Our story and values</h2>
          <div className="grid gap-12 lg:grid-cols-12">
            <p className="heading-sub text-[clamp(1.8rem,3.6vw,3.2rem)] text-ink lg:col-span-7" data-reveal>
              M & Sons Construction Group LTD is a trusted construction company based in the UK,
              providing high-quality building services for residential and commercial projects.
            </p>
            <div className="space-y-6 text-lg text-ink/75 lg:col-span-4 lg:col-start-9 lg:pt-3">
              <p data-reveal>
                We specialise in bathrooms and kitchens renovation, along with a wide range of general
                construction services. Our team focuses on delivering reliable workmanship, attention
                to detail, and professional results on every project.
              </p>
              <p data-reveal style={{ ['--d' as string]: '120ms' }}>
                With years of experience in the construction industry, we work closely with our
                clients to transform their ideas into reality. Whether it&apos;s a full renovation,
                extension, or small improvement project, we aim to provide durable, high-quality
                finishes and complete customer satisfaction.
              </p>
            </div>
          </div>
          <div className="mt-20 border-t border-ink pt-10" data-reveal>
            <p className="type-display text-[clamp(2.4rem,7vw,6.5rem)] text-ink">
              Our goal is simple: Trusted • Reliable • Quality.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gold text-ink">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <Split text="Why work with us" className="heading-section lg:col-span-4" />
          <ul className="border-t border-ink lg:col-span-8" role="list">
            {points.map((point, i) => (
              <li
                key={point}
                className="flex items-baseline gap-6 border-b border-ink py-6 md:py-8"
                data-reveal
                style={{ ['--d' as string]: `${i * 80}ms` }}
              >
                <span className="mono text-ink/60" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="heading-sub text-[clamp(1.5rem,3.4vw,3rem)]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
