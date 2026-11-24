import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog';
import { Split } from '@/components/motion/Split';
import { Parallax } from '@/components/motion/Parallax';

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const title = `${post.title} | M & Sons Construction Group LTD`;
  const description = post.excerpt;

  const url = `https://msonsconstruction.co.uk/blog/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 630,
          alt: post.heroAlt,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    // Only the first blog works for now; anything else returns 404.
    notFound();
  }

  const published = new Date(post.date);
  const isoDate = published.toISOString();
  const displayDate = published.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.heroImage],
    datePublished: isoDate,
    author: {
      '@type': 'Organization',
      name: 'M & Sons Construction Group LTD',
    },
    publisher: {
      '@type': 'Organization',
      name: 'M & Sons Construction Group LTD',
      logo: {
        '@type': 'ImageObject',
        url: 'https://msonsconstruction.co.uk/opengraph-image',
      },
    },
  };

  return (
    <article>
      <section className="grid-dark pb-16 pt-36 text-paper md:pb-24 md:pt-44">
        <div className="shell">
          <p className="eyebrow text-gold auto-in" data-reveal="fade">Construction advice</p>
          <Split as="h1" text={post.title} delay={200} className="auto-in type-display mt-6 max-w-[18ch] text-[clamp(2.6rem,6.4vw,6.5rem)]" />
          <p className="mono mt-8 text-paper/55 auto-in" data-reveal style={{ ['--d' as string]: '600ms' }}>
            {displayDate} · {post.readingTime}
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-ink from-50% to-paper to-50%">
        <div className="shell">
          <div className="relative aspect-[16/9] overflow-hidden bg-concrete-800" data-reveal="clip">
            <div className="absolute inset-0">
              <Parallax amount={12}>
                <Image src={post.heroImage} alt={post.heroAlt} fill className="object-cover" sizes="100vw" priority />
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-paper">
        <div className="shell max-w-[52rem]">
          <div className="prose-site space-y-6 text-lg leading-relaxed text-ink/80">
            <p>
              Choosing the right construction company is one of the most important decisions you will make
              when planning a renovation, extension or full refurbishment in London. The right builder will
              keep your project on time, on budget and finished to a standard you are proud of.
            </p>
            <p>
              At M &amp; Sons Construction Group LTD we speak to a lot of homeowners who have had poor
              experiences elsewhere. This simple guide is designed to help you avoid common problems and feel
              more confident when comparing quotes.
            </p>

            <h2 className="heading-sub !mt-16 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              1. Check experience with similar projects
            </h2>
            <p className="mt-3">
              Look for a construction company that regularly works on the type of project you are planning –
              for example bathroom renovations, kitchen installations, house extensions or full property
              refurbishments. Ask to see recent photos or case studies of similar work.
            </p>

            <h2 className="heading-sub !mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              2. Make sure everything is clearly itemised
            </h2>
            <p className="mt-3">
              A professional quote should break down labour, materials and any extras in clear language. Be wary of
              vague single-line prices. Itemised quotes help you understand exactly what is included and make it
              easier to compare different builders fairly.
            </p>

            <h2 className="heading-sub !mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              3. Look for good communication
            </h2>
            <p className="mt-3">
              Good builders are also good communicators. Notice how quickly they respond to your messages, how
              clearly they answer questions and whether they take time to explain options. This is a good indication
              of how they will handle your project once work starts.
            </p>

            <h2 className="heading-sub !mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              4. Understand the schedule and payment plan
            </h2>
            <p className="mt-3">
              Before you agree to anything, ask for a simple timeline showing when each stage of work will be
              completed, and how payments are linked to progress. This keeps everyone on the same page and helps
              avoid surprises later on.
            </p>

            <h2 className="heading-sub !mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              5. Choose a team you feel comfortable with
            </h2>
            <p className="mt-3">
              Construction work often means having people in your home for several days or weeks. It is worth
              choosing a company that feels respectful, tidy and easy to deal with – not just the cheapest price on
              paper.
            </p>

            <h2 className="heading-sub !mt-14 text-[clamp(1.7rem,3vw,2.4rem)] text-ink">
              Thinking about a project in London?
            </h2>
            <p className="mt-3">
              M &amp; Sons Construction Group LTD provides bathroom renovations, kitchen installation, roofing,
              tiling, flooring, general building, underfloor heating, plumbing and full property renovations across
              London and surrounding areas.
            </p>
            <p>
              If you would like friendly, no-obligation advice about your project, get in touch and we&apos;ll be
              happy to help.
            </p>
          </div>

          <div className="mt-16 bg-ink p-7 text-paper/75 md:p-10">
            <h2 className="heading-sub text-3xl text-paper">Talk to our team</h2>
            <p className="mt-2">
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
              to discuss your plans and request a free quote.
            </p>
            <p className="mt-2">
              Or you can send us a message through our{' '}
              <Link href="/contact" className="link-line font-semibold text-gold">
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
    </article>
  );
}

