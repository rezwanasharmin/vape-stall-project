import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { FeaturesBar } from '@/components/home/FeaturesBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductSection } from '@/components/home/ProductSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Testimonials } from '@/components/home/Testimonials';
import { products, newArrivalProducts } from '@/data/products';

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <CategoryGrid />
      <FeaturesBar />
      <ProductSection products={products} />
      <NewArrivalsSection products={newArrivalProducts} />
      <PromoBanner />
      <Testimonials />
    </div>
  );
}

