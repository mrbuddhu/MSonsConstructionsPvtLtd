import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://msonsconstruction.co.uk'),
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://msonsconstruction.co.uk',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal-900 focus:outline-none">
          Skip to main content
        </a>
        <LocalBusinessSchema />
        <Header />
        <main id="main-content" className="flex-1 pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileCtaBar />
      </body>
    </html>
  );
}
