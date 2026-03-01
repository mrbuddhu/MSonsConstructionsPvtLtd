import { ImageResponse } from 'next/og';

export const alt = 'M & Sons Construction Group LTD — Trusted Builders in London';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const base =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL ?? 'https://msonsconstruction.co.uk';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
        }}
      >
        <img
          src={`${base}/logo.png`}
          alt="M & Sons Construction Group LTD"
          width={700}
          height={240}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
