import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | M & Sons Construction Group LTD',
  description:
    'M & Sons Construction Group LTD is a trusted construction company in the UK, specialising in bathroom and kitchen renovations and general building services across London.',
};

export default function AboutPage() {
  return (
    <article>
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-charcoal-900">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-charcoal-900/75" aria-hidden />
        </div>
        <div className="container-narrow relative z-10 text-center">
          <h1 className="heading-display text-white">About Us</h1>
          <p className="mt-4 text-lg text-white/90">
            Trusted builders serving London and surrounding areas
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <h2 className="sr-only">Our story and values</h2>
          <div className="space-y-5 text-lg text-charcoal-600">
            <p>
              M & Sons Construction Group LTD is a trusted construction company based in the UK,
              providing high-quality building services for residential and commercial projects.
            </p>
            <p>
              We specialise in bathrooms and kitchens renovation, along with a wide range of general
              construction services. Our team focuses on delivering reliable workmanship, attention
              to detail, and professional results on every project.
            </p>
            <p>
              With years of experience in the construction industry, we work closely with our
              clients to transform their ideas into reality. Whether it&apos;s a full renovation,
              extension, or small improvement project, we aim to provide durable, high-quality
              finishes and complete customer satisfaction.
            </p>
            <p className="text-xl font-semibold text-charcoal-900">
              Our goal is simple: Trusted • Reliable • Quality.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-charcoal-50">
        <div className="container-narrow">
          <h2 className="heading-section text-center">Why work with us</h2>
          <ul className="mx-auto mt-10 max-w-2xl space-y-4" role="list">
            {[
              'Experienced and skilled builders',
              'High-quality materials and workmanship',
              'Professional and reliable service',
              'Competitive pricing',
              'Customer satisfaction guaranteed',
            ].map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal-900" aria-hidden>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-charcoal-800">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
