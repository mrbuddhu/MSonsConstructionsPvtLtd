'use client';

import { useRef, FormEvent } from 'react';
import { Split } from './motion/Split';

const fields = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { id: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
] as const;

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
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:info@construction-group.co.uk?subject=${subject}&body=${body}`;
  }

  return (
    <section id="contact" className="section-padding grid-paper" aria-labelledby="contact-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ink/70" data-reveal>
              Free quote
            </p>
            <Split id="contact-heading" text="Get in Touch" className="heading-display mt-6" />
          </div>
          <p className="lede self-end text-ink/75 lg:col-span-5" data-reveal style={{ ['--d' as string]: '150ms' }}>
            If you are planning a building project or renovation, our team is ready to help. Get in touch today
            for a free quote and professional advice.
          </p>
        </div>

        <div className="mt-16 h-px bg-ink/25" data-reveal="rule" />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal="left">
            <div className="bg-ink p-7 text-paper md:p-9">
              <h3 className="heading-sub text-2xl md:text-3xl">M & Sons Construction Group LTD</h3>
              <address className="mt-8 grid gap-6 not-italic sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="text-paper/85">99A Woodstock Gardens</p>
                  <p className="text-paper/85">Hayes, UB4 8BA</p>
                </div>
                <div className="space-y-1">
                  <p>
                    <strong className="font-medium text-paper/60">Phone:</strong>{' '}
                    <a href="tel:+447454704949" className="link-line text-gold">
                      07454 704949
                    </a>
                  </p>
                  <p>
                    <strong className="font-medium text-paper/60">Email:</strong>{' '}
                    <a href="mailto:info@construction-group.co.uk" className="link-line text-gold">
                      info@construction-group.co.uk
                    </a>
                  </p>
                </div>
              </address>
            </div>

            <div className="crop mt-8 text-ink/50">
              <div className="map-frame aspect-[4/3] overflow-hidden border border-ink/20 bg-paper-200">
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
                  data-lenis-prevent
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal="right">
            <form
              id="contact-form"
              ref={formRef}
              onSubmit={handleSubmit}
              className="border border-ink/15 bg-paper-50 p-7 md:p-10"
              noValidate
            >
              <div className="space-y-8">
                {fields.map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="mono block text-ink/60">
                      {f.label} <span className="text-ink/45">*</span>
                    </label>
                    <input type={f.type} id={f.id} name={f.id} required autoComplete={f.autoComplete} className="field" />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="mono block text-ink/60">
                    Message <span className="text-ink/45">*</span>
                  </label>
                  <textarea id="message" name="message" rows={4} required className="field resize-none" />
                </div>
              </div>
              <p className="mt-6 text-xs text-ink/55">
                Submitting will open your email client to send your enquiry. We&apos;ll respond as soon as possible.
              </p>
              <button type="submit" className="btn-dark mt-6 w-full justify-between" data-cta-zone>
                Send Enquiry <span className="arrow" aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
