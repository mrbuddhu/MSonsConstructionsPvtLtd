import type { Metadata } from 'next';
import { ContactSection } from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact | M & Sons Construction Group LTD',
  description:
    'Get a free quote for your construction or renovation project. Call, email, or message us. Serving London and surrounding areas.',
};

export default function ContactPage() {
  return (
    <article>
      <section className="bg-charcoal-900 py-20 md:py-28">
        <div className="container-narrow text-center">
          <h1 className="heading-display text-white">Contact Us</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-white/90">
            Request a free quote or speak to our team. We&apos;re here to help with your project.
          </p>
        </div>
      </section>
      <ContactSection />
    </article>
  );
}
