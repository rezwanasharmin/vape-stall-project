import type { Metadata } from 'next';
import AboutUsContent from './AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us | Vape Stall UAE',
  description: "Learn about Vape Stall, UAE's premier vape store. Genuine disposable vapes, pod systems, and accessories delivered across all 7 emirates.",
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}

