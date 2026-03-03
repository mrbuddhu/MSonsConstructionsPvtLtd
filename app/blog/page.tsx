import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Construction Tips & Advice | M & Sons Blog',
  description:
    'Practical guides and advice on choosing builders, planning renovations and looking after your home from M & Sons Construction Group LTD in London.',
};

export default function BlogIndexPage() {
  const [firstPost] = blogPosts;

  return (
    <article>
      <section className="bg-charcoal-900 py-20 md:py-28">
        <div className="container-narrow text-center">
          <p className="eyebrow">Construction tips &amp; advice</p>
          <h1 className="heading-display mt-2 text-white">M &amp; Sons Blog</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            Simple, down-to-earth advice to help you plan your building and renovation projects with confidence.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
            <article className="card-premium overflow-hidden">
              <div className="relative aspect-[16/9] bg-charcoal-100">
                <Image
                  src={firstPost.heroImage}
                  alt={firstPost.heroAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Featured guide
                </p>
                <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-charcoal-900">
                  {firstPost.title}
                </h2>
                <p className="mt-2 text-xs text-charcoal-500">
                  {new Date(firstPost.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  · {firstPost.readingTime}
                </p>
                <p className="mt-4 text-sm md:text-base text-charcoal-700">
                  {firstPost.excerpt}
                </p>
                <Link
                  href={`/blog/${firstPost.slug}`}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-gold hover:text-gold-dark"
                >
                  Read the full guide →
                </Link>
              </div>
            </article>

            <aside className="space-y-4 rounded-xl border border-charcoal-200 bg-charcoal-50 p-6 text-sm text-charcoal-700">
              <h2 className="text-base font-semibold text-charcoal-900">
                Need help with your project?
              </h2>
              <p>
                If you&apos;re planning a renovation, extension or full refurbishment, M &amp; Sons Construction
                Group LTD can help you from first ideas through to completion.
              </p>
              <p>
                Call us on{' '}
                <a href="tel:+447454704949" className="font-semibold text-gold hover:underline">
                  07454 704949
                </a>{' '}
                or email{' '}
                <a
                  href="mailto:info@construction-group.co.uk"
                  className="font-semibold text-gold hover:underline"
                >
                  info@construction-group.co.uk
                </a>{' '}
                for a free quote and friendly advice.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-charcoal-900 px-4 py-2 text-sm font-semibold text-white hover:bg-charcoal-800"
              >
                Go to Contact page
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}

