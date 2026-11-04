import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { FeaturesBar } from '@/components/home/FeaturesBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductSection } from '@/components/home/ProductSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { Testimonials } from '@/components/home/Testimonials';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <FeaturesBar />
      <CategoryGrid />
      <ProductSection products={products} />
      <PromoBanner />
      <Testimonials />
    </div>
  );
}
