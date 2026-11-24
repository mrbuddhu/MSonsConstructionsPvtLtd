'use client';

import Image from 'next/image';
import { useState } from 'react';

const FALLBACK =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
};

export function ImageWithFallback({
  src,
  alt,
  fill = true,
  className = '',
  sizes,
  loading,
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      loading={loading}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
