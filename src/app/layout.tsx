import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import './component-whatsapp-float.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AgeVerificationModal } from '@/components/common/AgeVerificationModal';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Best authentic disposable vape store in UAE | Buy Vape in Dubai',
  description: 'Shop at Vape Stall, the best authentic disposable vape store in UAE. Buy vape in Dubai with a premium selection of disposable vapes, pod systems, vape kits, and accessories from top brands.',
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png?v=2', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png?v=2', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico?v=2', sizes: 'any' },
    ],
    shortcut: '/favicon-32x32.png?v=2',
    apple: '/favicon-192x192.png?v=2',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} min-h-screen bg-dark-bg text-gray-100 flex flex-col antialiased`}>
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <CartDrawer />
              <AgeVerificationModal />
              <WhatsAppButton />
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

