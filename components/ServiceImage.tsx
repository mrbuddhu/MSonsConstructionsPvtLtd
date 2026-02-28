'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  title: string;
};

const FALLBACK =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

export function ServiceImage({ src, alt, title }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative aspect-[16/10] bg-charcoal-100">
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => setImgSrc(FALLBACK)}
      />
      <div className="absolute inset-0 bg-charcoal-900/30" aria-hidden />
      <h3 className="absolute bottom-0 left-0 right-0 p-4 font-display text-lg font-semibold text-white">
        {title}
      </h3>
    </div>
  );
}
