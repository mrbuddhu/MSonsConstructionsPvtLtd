import Image from 'next/image';
import { AnimateIn } from './AnimateIn';

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white" aria-labelledby="about-heading">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <AnimateIn variant="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-charcoal-100">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Builders working on a modern house extension"
                fill
                className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
          <AnimateIn delay={80} variant="left">
            <div>
              <h2 id="about-heading" className="heading-section">
                M &amp; Sons – General Construction
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal-500">
                Trusted &#8226; Reliable &#8226; Quality
              </p>
              <div className="mt-6 space-y-4 text-charcoal-600">
                <p>
                  Welcome to M &amp; Sons Construction Group LTD, your trusted local specialists in construction,
                  renovations, and property improvements. With years of experience in the building industry, we
                  provide high-quality workmanship and reliable services for residential and commercial projects.
                </p>
                <p>
                  Our goal is simple — to deliver professional building services that combine quality, durability,
                  and attention to detail. Whether you are planning a small home improvement or a complete
                  renovation, our skilled team is here to help bring your vision to life.
                </p>
                <p className="font-display text-xl font-semibold text-charcoal-900">
                  Our Mission
                </p>
                <p>
                  At M &amp; Sons Construction Group LTD, we believe every project deserves the highest level of care
                  and craftsmanship. Our mission is to provide dependable construction services while building
                  long-term relationships with our clients based on trust and quality work.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
