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
                About M & Sons Construction
              </h2>
              <div className="mt-6 space-y-4 text-charcoal-600">
                <p>
                  M & Sons Construction Group LTD is a trusted construction company based in the UK,
                  providing high-quality building services for residential and commercial projects.
                </p>
                <p>
                  We specialise in bathrooms and kitchens renovation, along with a wide range of
                  general construction services. Our team focuses on delivering reliable workmanship,
                  attention to detail, and professional results on every project.
                </p>
                <p>
                  With years of experience in the construction industry, we work closely with our
                  clients to transform their ideas into reality. Whether it&apos;s a full renovation,
                  extension, or small improvement project, we aim to provide durable, high-quality
                  finishes and complete customer satisfaction.
                </p>
                <p className="font-semibold text-charcoal-900">
                  Our goal is simple: Trusted • Reliable • Quality.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
