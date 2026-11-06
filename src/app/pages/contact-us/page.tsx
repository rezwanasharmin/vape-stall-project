import type { Metadata } from 'next';
import ContactUsContent from './ContactUsContent';

export const metadata: Metadata = {
  title: 'Contact Us | Vape Stall UAE',
  description: 'Get in touch with Vape Stall UAE. Reach us via phone, email, or send us a message for fast order support, product questions, and delivery inquiries.',
};

export default function ContactUsPage() {
  return <ContactUsContent />;
}

