import Image from 'next/image';
import type { ReactNode } from 'react';
import { Split } from './motion/Split';
import { Parallax } from './motion/Parallax';

type Props = {
  title: string;
  eyebrow?: ReactNode;
  children?: ReactNode;
  image?: { src: string; alt: string };
};

/** Shared inner-page header: drafting grid, masked headline, optional photo. */
export function PageHero({ title, eyebrow, children, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {image ? (
        <div className="absolute inset-0 auto-in" data-reveal="fade">
          <Parallax amount={16}>
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover opacity-45" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" aria-hidden />
        </div>
      ) : (
        <div className="absolute inset-0 grid-dark" aria-hidden />
      )}
      <div className="shell relative flex min-h-[68svh] flex-col justify-end pb-14 pt-36 md:min-h-[72svh] md:pb-20">
        {eyebrow ? (
          <p className="eyebrow mb-6 text-gold auto-in" data-reveal="fade" style={{ ['--d' as string]: '400ms' }}>
            {eyebrow}
          </p>
        ) : null}
        <Split as="h1" text={title} delay={450} className="auto-in heading-display max-w-[14ch]" />
        <div className="mt-10 h-px bg-paper/20 auto-in" data-reveal="rule" style={{ ['--d' as string]: '700ms' }} />
        {children ? (
          <div className="lede mt-8 max-w-2xl text-paper/80 auto-in" data-reveal style={{ ['--d' as string]: '850ms' }}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
