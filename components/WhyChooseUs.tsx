import { AnimateIn } from './AnimateIn';

const points = [
  'Experienced and skilled construction team',
  'High quality materials and workmanship',
  'Reliable and professional service',
  'Competitive and fair pricing',
  'Fully committed to customer satisfaction',
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-charcoal-900 text-white" aria-labelledby="why-heading">
      <div className="container-narrow">
        <AnimateIn className="text-center">
          <p className="eyebrow">Why homeowners choose us</p>
          <h2 id="why-heading" className="heading-section mt-2 text-white">
            Why Choose Us
          </h2>
        </AnimateIn>
        <AnimateIn delay={60}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-white/80">
            We combine experience with quality to deliver results you can trust.
          </p>
        </AnimateIn>
        <div className="mx-auto mt-12 max-w-2xl space-y-4">
          <ul className="space-y-4" role="list">
            {points.map((point, index) => (
              <AnimateIn key={point} delay={80 + index * 70} variant="left">
                <li className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal-900 transition-transform duration-300 hover:scale-110" aria-hidden>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-lg font-medium">{point}</span>
                </li>
              </AnimateIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
