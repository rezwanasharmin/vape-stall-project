import type { Metadata } from 'next';
import ShopPage from '@/app/shop/page';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (params.slug === 'offer-vape-shop-dubai') {
    return {
      title: 'Offer – Vape Stall: Disposable Vape shop in UAE',
      description: 'Exclusive vape offers and discounts at Vape Stall UAE. Buy authentic disposable vapes, pod kits, and e-liquids at best prices with fast delivery across Dubai and UAE.',
    };
  }
  return {
    title: 'Collections – Vape Stall UAE',
  };
}

export default function CollectionPage() {
  return <ShopPage />;
}
