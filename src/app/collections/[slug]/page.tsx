import type { Metadata } from 'next';
import ShopPage from '@/app/shop/page';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (params.slug === 'offer-vape-shop-dubai') {
    return {
      title: 'Offer – Vape Stall: Disposable Vape shop in UAE',
      description: 'Exclusive vape offers and discounts at Vape Stall UAE. Buy authentic disposable vapes, pod kits, and e-liquids at best prices with fast delivery across Dubai and UAE.',
    };
  }
  if (params.slug === 'buy-disposable-vape-uae') {
    return {
      title: 'Buy Disposable Vape in UAE – Vape Stall',
      description: 'Buy authentic disposable vapes in UAE at Vape Stall. Free same-day delivery in Dubai, Abu Dhabi & across all Emirates. Top brands including Elf Bar, Al Fakher, Vozol, Myle.',
    };
  }
  if (params.slug === 'relx-disposable-vape-shop-in-dubai') {
    return {
      title: 'Shisha/Hookah Disposable Vape in UAE – Vape Stall',
      description: 'Buy authentic Shisha and Hookah disposable vapes in Dubai and UAE. Premium selection from XTRA, VOZOL, Al Fakher with fast delivery across all UAE Emirates.',
    };
  }
  return {
    title: 'Collections – Vape Stall UAE',
  };
}

export default function CollectionPage() {
  return <ShopPage />;
}
