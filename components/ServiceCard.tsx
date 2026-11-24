import Link from 'next/link';
import { ImageWithFallback } from './ImageWithFallback';
import type { services } from '@/lib/services';

type Service = (typeof services)[number];

export function ServiceCard({ service, index, total }: { service: Service; index: number; total: number }) {
  return (
    <article id={service.id} className="rail-card group flex shrink-0 flex-col" data-card>
      <div className="relative aspect-[4/3] overflow-hidden bg-concrete-800" data-cursor="view">
        <div className="rail-img absolute inset-[-6%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
          <ImageWithFallback
            src={service.image}
            alt={service.title}
            className="object-cover"
            sizes="(max-width: 768px) 92vw, 34vw"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" aria-hidden />
        <span className="mono absolute left-4 top-4 bg-ink/70 px-2 py-1 text-paper/80 backdrop-blur-sm" aria-hidden>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <h3 className="heading-sub absolute inset-x-0 bottom-0 p-5 text-[clamp(1.6rem,2.4vw,2.4rem)] text-paper">
          {service.title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col border-x border-b border-paper/10 p-5 md:p-6">
        <p className="text-sm leading-relaxed text-paper/70">{service.description}</p>
        <ul className="mt-5 flex-1 divide-y divide-paper/10 border-y border-paper/10 text-sm text-paper/85" role="list">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3 py-2.5">
              <span className="h-px w-3 shrink-0 bg-gold" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>
        <Link href="/services" className="mt-5 inline-flex w-fit text-sm font-semibold text-gold">
          <span className="link-line">View all services</span>&nbsp;<span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
