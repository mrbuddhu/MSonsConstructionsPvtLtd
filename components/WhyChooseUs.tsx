import { Split } from './motion/Split';
import { WhyList } from './WhyList';

const points = [
  'Experienced and skilled construction team',
  'High quality materials and workmanship',
  'Reliable and professional service',
  'Competitive and fair pricing',
  'Fully committed to customer satisfaction',
];

export function WhyChooseUs() {
  return (
    <section className="section-padding relative overflow-hidden bg-gold text-ink" aria-labelledby="why-heading">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow" data-reveal>
                Why homeowners choose us
              </p>
              <Split id="why-heading" text="Why Choose Us" className="heading-section mt-6" />
              <p className="lede mt-8 max-w-sm text-ink/75" data-reveal>
                We combine experience with quality to deliver results you can trust.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <WhyList points={points} />
          </div>
        </div>
      </div>
    </section>
  );
}
