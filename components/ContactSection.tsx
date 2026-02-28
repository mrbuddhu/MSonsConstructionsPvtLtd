'use client';

import { useRef, FormEvent } from 'react';
import { AnimateIn } from './AnimateIn';

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const subject = encodeURIComponent(`Enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:manaf.alfrouh@yahoo.com?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-padding bg-white" aria-labelledby="contact-heading">
      <div className="container-narrow">
        <AnimateIn>
          <div className="text-center">
            <p className="eyebrow">Free quote</p>
            <h2 id="contact-heading" className="heading-section mt-2">
              Get in Touch
            </h2>
          </div>
        </AnimateIn>
        <AnimateIn delay={50}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-charcoal-600">
            Request a free quote or speak to our team. We serve London and surrounding areas.
          </p>
        </AnimateIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <AnimateIn delay={100} variant="right">
          <div>
            <div className="rounded-lg border border-charcoal-200 bg-charcoal-50 p-6">
              <h3 className="font-display text-lg font-semibold text-charcoal-900">
                M & Sons Construction Group LTD
              </h3>
              <address className="mt-4 not-italic text-charcoal-600">
                <p>99A Woodstock Gardens</p>
                <p>Hayes, UB4 8BA</p>
                <p className="mt-3">
                  <strong>Phone:</strong>{' '}
                  <a href="tel:+447454704949" className="text-gold hover:underline focus:underline">
                    07454 704949
                  </a>
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:manaf.alfrouh@yahoo.com" className="text-gold hover:underline focus:underline">
                    manaf.alfrouh@yahoo.com
                  </a>
                </p>
              </address>
            </div>

            <div className="mt-6 aspect-video overflow-hidden rounded-lg border border-charcoal-200">
              <iframe
                title="Map showing M & Sons Construction location in Hayes UB4 8BA"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19865!2d-0.421389!3d51.503396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876722e1e2f3b0f%3A0x0!2sHayes%2C%20UB4%208BA%2C%20UK!5e0!3m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>
          </div>
          </AnimateIn>

          <AnimateIn delay={150} variant="left">
          <div>
            <form
              id="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="card-premium p-6"
              noValidate
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal-900">
                    Name <span className="text-charcoal-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-1 block w-full rounded-md border border-charcoal-300 px-3 py-2 text-charcoal-900 shadow-sm transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-charcoal-900">
                    Phone <span className="text-charcoal-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    autoComplete="tel"
                    className="mt-1 block w-full rounded-md border border-charcoal-300 px-3 py-2 text-charcoal-900 shadow-sm transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal-900">
                    Email <span className="text-charcoal-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border border-charcoal-300 px-3 py-2 text-charcoal-900 shadow-sm transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal-900">
                    Message <span className="text-charcoal-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-1 block w-full rounded-md border border-charcoal-300 px-3 py-2 text-charcoal-900 shadow-sm transition-colors focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-charcoal-500">
                Submitting will open your email client to send your enquiry. We&apos;ll respond as soon as possible.
              </p>
              <button
                type="submit"
                className="btn-primary mt-4 w-full"
              >
                Send Enquiry
              </button>
            </form>
          </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
