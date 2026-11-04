import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AgeVerificationModal } from '@/components/common/AgeVerificationModal';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Best authentic disposable vape store in UAE | Buy Vape in Dubai',
  description: 'Shop at Vape Stall, the best authentic disposable vape store in UAE. Buy vape in Dubai with a premium selection of disposable vapes, pod systems, vape kits, and accessories from top brands.',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark-bg text-gray-100 flex flex-col antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <AgeVerificationModal />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
