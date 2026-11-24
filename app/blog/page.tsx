import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Construction Tips & Advice | M & Sons Blog',
  description:
    'Practical guides and advice on choosing builders, planning renovations and looking after your home from M & Sons Construction Group LTD in London.',
};

export default function BlogIndexPage() {
  const [firstPost] = blogPosts;

  return (
    <article>
      <PageHero title="M & Sons Blog" eyebrow={<>Construction tips &amp; advice</>}>
        <p>Simple, down-to-earth advice to help you plan your building and renovation projects with confidence.</p>
      </PageHero>

      <section className="section-padding grid-paper">
        <div className="shell">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
            <article className="group overflow-hidden border border-ink/15 bg-paper-50" data-reveal>
              <div className="relative aspect-[16/9] overflow-hidden bg-concrete-800" data-cursor="view">
                <Image
                  src={firstPost.heroImage}
                  alt={firstPost.heroAlt}
                  fill
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="mono text-ink/55">
                  Featured guide
                </p>
                <h2 className="heading-sub mt-4 text-[clamp(1.8rem,3.4vw,3rem)] text-ink">
                  {firstPost.title}
                </h2>
                <p className="mono mt-4 text-ink/50">
                  {new Date(firstPost.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  · {firstPost.readingTime}
                </p>
                <p className="mt-5 text-ink/75 md:text-lg">
                  {firstPost.excerpt}
                </p>
                <Link
                  href={`/blog/${firstPost.slug}`}
                  className="btn-dark mt-8"
                >
                  Read the full guide <span className="arrow" aria-hidden>→</span>
                </Link>
              </div>
            </article>

            <aside className="space-y-4 bg-ink p-7 text-sm text-paper/75 md:sticky md:top-28" data-reveal style={{ ['--d' as string]: '150ms' }}>
              <h2 className="heading-sub text-2xl text-paper">
                Need help with your project?
              </h2>
              <p>
                If you&apos;re planning a renovation, extension or full refurbishment, M &amp; Sons Construction
                Group LTD can help you from first ideas through to completion.
              </p>
              <p>
                Call us on{' '}
                <a href="tel:+447454704949" className="link-line font-semibold text-gold">
                  07454 704949
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:info@construction-group.co.uk"
                  className="link-line font-semibold text-gold"
                >
                  info@construction-group.co.uk
                </a>{' '}
                for a free quote and friendly advice.
              </p>
              <Link
                href="/contact"
                className="btn-primary mt-2 w-full justify-between"
              >
                Go to Contact page <span className="arrow" aria-hidden>→</span>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}

