import React from 'react';
import { HeroSlider } from '@/components/home/HeroSlider';
import { FeaturesBar } from '@/components/home/FeaturesBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductSection } from '@/components/home/ProductSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { BrandsSection } from '@/components/home/BrandsSection';
import { MostPopularSection } from '@/components/home/MostPopularSection';
import { PromoBanner } from '@/components/home/PromoBanner';
import { TopRatedSection } from '@/components/home/TopRatedSection';
import { WellnessSection } from '@/components/home/WellnessSection';
import { FAQSection } from '@/components/home/FAQSection';
import { Testimonials } from '@/components/home/Testimonials';
import { products, newArrivalProducts, mostPopularProducts, topRatedProducts } from '@/data/products';

export default function HomePage() {
  return (
    <div>
      <HeroSlider />
      <CategoryGrid />
      <FeaturesBar />
      <ProductSection products={products} />
      <NewArrivalsSection products={newArrivalProducts} />
      <BrandsSection />
      <MostPopularSection products={mostPopularProducts} />
      <PromoBanner />
      <TopRatedSection products={topRatedProducts} />
      <WellnessSection />
      <FAQSection />
      <Testimonials />
    </div>
  );
}

