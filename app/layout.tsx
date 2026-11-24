import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { MotionRoot } from '@/components/motion/MotionRoot';

const sans = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = 'https://www.construction-group.co.uk';
const IS_CONCEPT_PREVIEW = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? '').includes('msons-concept');

export const viewport: Viewport = {
  themeColor: '#121211',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'M & Sons Construction Group LTD | Trusted Builders in London',
  description:
    'Professional construction company in London specialising in bathroom renovations, kitchen installations, roofing, tiling, flooring and general building services.',
  keywords: [
    'construction London',
    'bathroom renovation London',
    'kitchen installation',
    'building services Hayes',
    'roofing',
    'tiling',
    'flooring',
    'extensions London',
  ],
  openGraph: {
    title: 'M & Sons Construction Group LTD | Trusted Builders in London',
    description:
      'Professional construction company in London specialising in bathroom renovations, kitchen installations, roofing, tiling, flooring and general building services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M & Sons Construction Group LTD | Trusted Builders in London',
    description:
      'Professional construction company in London specialising in bathroom renovations, kitchen installations, roofing, tiling, flooring and general building services.',
  },
  // The concept preview project stays out of search; the live site is indexed.
  robots: IS_CONCEPT_PREVIEW ? { index: false, follow: false } : { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
};

// Runs before first paint: only opt into hidden-until-revealed states when
// motion is allowed, so reduced-motion and no-JS visitors always see content.
const motionScript = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
        >
          Skip to main content
        </a>
        <LocalBusinessSchema />
        <MotionRoot />
        <Header />
        <main id="main-content" className="flex-1 pb-[3.75rem] md:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileCtaBar />
      </body>
    </html>
  );
}
