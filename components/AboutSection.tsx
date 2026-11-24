import Image from 'next/image';
import { Split } from './motion/Split';
import { Parallax } from './motion/Parallax';

export function AboutSection() {
  return (
    <section id="about" className="section-padding grid-paper relative" aria-labelledby="about-heading">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 lg:pr-6">
            <div className="crop text-ink/50">
              <div
                className="relative aspect-[4/5] overflow-hidden bg-concrete-800 sm:aspect-[4/3] lg:aspect-[4/5]"
                data-reveal="clip"
                data-cursor="view"
              >
                <div className="absolute inset-0">
                  <Parallax amount={14}>
                    <Image
                      src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                      alt="Builders working on a modern house extension"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </Parallax>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:pt-10">
            <Split id="about-heading" text="M & Sons – General Construction" className="heading-section max-w-[12ch]" />
            <p className="mono mt-6 text-ink/60" data-reveal style={{ ['--d' as string]: '200ms' }}>
              Trusted &#8226; Reliable &#8226; Quality
            </p>
            <div className="mt-10 h-px w-full bg-ink/20" data-reveal="rule" />
            <div className="mt-10 grid gap-8 text-ink/75 md:grid-cols-2">
              <p data-reveal>
                Welcome to M &amp; Sons Construction Group LTD, your trusted local specialists in construction,
                renovations, and property improvements. With years of experience in the building industry, we
                provide high-quality workmanship and reliable services for residential and commercial projects.
              </p>
              <p data-reveal style={{ ['--d' as string]: '120ms' }}>
                Our goal is simple — to deliver professional building services that combine quality, durability,
                and attention to detail. Whether you are planning a small home improvement or a complete
                renovation, our skilled team is here to help bring your vision to life.
              </p>
            </div>
            <div className="mt-12 border-l-2 border-gold pl-6 md:pl-8" data-reveal>
              <p className="heading-sub text-2xl text-ink md:text-3xl">Our Mission</p>
              <p className="lede mt-4 text-ink/80">
                At M &amp; Sons Construction Group LTD, we believe every project deserves the highest level of care
                and craftsmanship. Our mission is to provide dependable construction services while building
                long-term relationships with our clients based on trust and quality work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
