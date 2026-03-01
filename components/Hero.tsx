import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section
      className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-charcoal-900 px-4 py-24 text-center md:min-h-[90vh]"
      aria-labelledby="hero-heading"
    >
      <Image
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
        alt="Professional construction and building work"
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-charcoal-900/70" aria-hidden />
      <div className="container-narrow relative z-10 max-w-4xl">
        <p className="eyebrow animate-fade-in">London & surrounding areas</p>
        <h1 id="hero-heading" className="heading-display mt-2 text-white animate-fade-in-delay-1 md:text-5xl lg:text-6xl">
          Trusted Construction & Renovation Experts in London
        </h1>
        <p className="mt-6 text-lg text-white/90 animate-fade-in-delay-2 md:text-xl">
          High-quality building services for residential and commercial projects.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-delay-4">
          <Link
            href="/#contact"
            className="btn-primary text-base"
          >
            Get Free Quote
          </Link>
          <a
            href="tel:+447454704949"
            className="btn-outline-light text-base"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
