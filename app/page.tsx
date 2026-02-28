import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { ContactSection } from '@/components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}
