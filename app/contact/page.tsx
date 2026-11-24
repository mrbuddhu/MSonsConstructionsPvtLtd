import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Contact | M & Sons Construction Group LTD',
  description:
    'Get a free quote for your construction or renovation project. Call, email, or message us. Serving London and surrounding areas.',
};

export default function ContactPage() {
  return (
    <article>
      <PageHero title="Contact Us">
        <p>Request a free quote or speak to our team. We&apos;re here to help with your project.</p>
      </PageHero>
      <ContactSection />
    </article>
  );
}
