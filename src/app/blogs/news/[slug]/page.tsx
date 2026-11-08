'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { blogArticles } from '@/data/blogArticles';
import { ArticleFaq } from '@/components/blog/ArticleFaq';
import '@/app/section-blog-post.css';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'best-nasty-vape-juice-models-uae';
  const article = blogArticles[slug] || blogArticles['best-nasty-vape-juice-models-uae'];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Scroll Progress listener
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const scrolled = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://vapstall.ae/blogs/news/${slug}`;
  const shareTitle = encodeURIComponent(article.title);

  return (
    <div className="bg-white min-h-screen text-[#1f2733]">
      {/* ─── Reading Progress Bar (Top of Screen) ─── */}
      <div className="vap-reading-progress" aria-hidden="true">
        <div
          className="vap-reading-progress__bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ─── Breadcrumb Bar ─── */}
      <div className="page-width page-width--narrow vap-article-breadcrumb max-w-[820px] mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav className="vap-breadcrumb" aria-label="Breadcrumb">
          <ol className="vap-breadcrumb__list flex items-center flex-wrap gap-1.5 text-xs font-medium text-slate-500">
            <li className="vap-breadcrumb__item">
              <Link href="/" className="vap-breadcrumb__link inline-flex items-center gap-1.5 hover:text-[#25406f] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--separator text-slate-300" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li className="vap-breadcrumb__item">
              <Link href="/blogs/news" className="vap-breadcrumb__link hover:text-[#25406f] transition-colors">
                News
              </Link>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--separator text-slate-300" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--current text-[#25406f] font-semibold truncate max-w-[280px] sm:max-w-[400px]" aria-current="page">
              {article.title}
            </li>
          </ol>
        </nav>
      </div>

      <main id="MainContent" className="flex-grow">
        <article className="article-template">
          
          {/* ─── Hero Image Container ─── */}
          <div className="article-template__hero-container max-w-[1040px] mx-auto px-4 sm:px-6 mt-4 sm:mt-8">
            <div className="article-template__hero-adapt media relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-[16/9] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1100px) 1040px, (min-width: 750px) calc(100vw - 10rem), 100vw"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* ─── Article Header ─── */}
          <header className="page-width page-width--narrow max-w-[820px] mx-auto px-4 sm:px-6 text-center mt-8 sm:mt-12">
            <h1 className="article-template__title text-2xl sm:text-4xl md:text-5xl font-black text-[#1a2a4a] leading-tight">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="vap-article-meta flex items-center justify-center flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500 font-medium mt-4">
              <span className="vap-article-meta__author inline-flex items-center gap-2 text-[#1a2a4a] font-bold">
                <span className="vap-article-meta__avatar w-7 h-7 rounded-full bg-gradient-to-br from-[#25406f] to-[#b48648] text-white flex items-center justify-center text-xs font-bold shadow-sm" aria-hidden="true">
                  S
                </span>
                {article.author}
              </span>
              <span className="vap-article-meta__dot w-1.5 h-1.5 rounded-full bg-[#b48648]" aria-hidden="true" />
              <span className="vap-article-meta__item inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="3" />
                  <path d="M3 9h18M8 3v4M16 3v4" />
                </svg>
                <time dateTime="2026-10-15">{article.date}</time>
              </span>
              <span className="vap-article-meta__dot w-1.5 h-1.5 rounded-full bg-[#b48648]" aria-hidden="true" />
              <span className="vap-article-meta__item inline-flex items-center gap-1.5">
                <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {article.readTime}
              </span>
            </div>
          </header>

          {/* ─── Table of Contents ─── */}
          <nav className="vap-toc page-width page-width--narrow max-w-[820px] mx-auto px-4 sm:px-6 my-8" aria-labelledby="VapToc-content">
            <details className="vap-toc__details bg-[#f4f6fb] border border-[#e8edf5] rounded-2xl overflow-hidden" open>
              <summary className="vap-toc__summary flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none">
                <span id="VapToc-content" className="vap-toc__title inline-flex items-center gap-2.5 font-bold text-[#1a2a4a] text-sm sm:text-base">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="text-[#b48648]">
                    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                  </svg>
                  In this article
                </span>
                <svg className="vap-toc__chevron w-4 h-4 text-[#25406f] transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <ol className="vap-toc__list pb-4 px-6 sm:px-8 space-y-1.5 list-decimal text-xs sm:text-sm text-slate-600 font-medium">
                {article.toc.map((item) => (
                  <li key={item.id} className="pl-1">
                    <a href={`#${item.id}`} className="text-[#25406f] hover:text-[#b48648] hover:underline transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </nav>

          {/* ─── Article Content (1:1 with vapstall.ae) ─── */}
          <div className="article-template__content page-width page-width--narrow max-w-[820px] mx-auto px-4 sm:px-6 text-[15px] sm:text-[16.5px] leading-relaxed text-[#334155] space-y-5">
            <p>
              Step into any vape shop in Dubai and mention Nasty, and the counter staff will nearly always answer with a question. Which one? The brand covers a long list of flavors, a few bottle sizes, and two kinds of nicotine. When all you want is a juice that tastes good in your device, that’s plenty to work through. Buy{' '}
              <Link href="/shop?brand=Nasty" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                Nasty Vape Juice
              </Link>{' '}
              Models after you know your device and your nicotine need, and the whole thing gets easier.
            </p>

            <p>
              Most people come to Nasty for the flavors, and the brand has a solid fan base across the UAE. The range includes freebase bottles and{' '}
              <Link href="/shop?category=E-Liquids" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                salt nic
              </Link>{' '}
              bottles. A liquid that runs fine in a refillable tank can feel strange in a small pod system. Customers ask this type of question all the time, so we put the answers on one page. Here you’ll find the Best Nasty Vape Juice Models UAE adult users ask about most. We also cover label reading and fake bottles.
            </p>

            {/* SECTION 1 */}
            <h2 id="why-getting-the-right-model-matters" className="text-xl sm:text-2xl font-black text-[#1a2a4a] pt-6 pb-2 border-b border-slate-200">
              Why Getting the Right Model Matters
            </h2>

            <p>
              Say you own a small pod kit and pick up a bottle made for a big tank. The vapor comes out thin. The nicotine hardly shows up. Or a smoker grabs a mild bottle, feels nothing, and quits vaping by Friday. You can read endless lists of the best vape juice in UAE, but a list has no idea what device you hold. In most cases the bottle type is the problem, not the brand.
            </p>

            <p>
              We sorted this guide into three groups. The first group is for those who are new to vaping. The second already vapes and knows what flavors it likes. The third is cigarette smokers who want to switch. Each group gets plain advice on nicotine, bottle size and flavor. We’ll also look at a product page, because the label tells you more than the artwork does.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#1a2a4a] pt-3">
              Different Nasty Vape Juice Models Explained
            </h3>

            <p>
              Nasty freebase vs salt nic models is the split to learn first. Freebase is the older style of{' '}
              <Link href="/shop?category=E-Liquids" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                e-liquid
              </Link>
              , and most people use it in refillable tanks. The nicotine strength is usually lower, and you breathe the vapor directly into your lungs. Vapers call this Direct-To-Lung, or DTL, and the clouds come out big. A Nasty Juice shortfill sits in this group. The bottle isn’t full to the top, so you have space to add a nicotine shot, or you can skip it and vape at zero.
            </p>

            <p>
              Nic salt is the other type. Its lower pH keeps the throat hit smooth, even when the strength is high. You’ll see it in{' '}
              <Link href="/shop?category=Pod+Systems" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                pod
              </Link>{' '}
              systems and low-wattage devices that use a tight Mouth-to-Lung draw, shortened to MTL. That draw is close to puffing on a cigarette. Look at your e liquid vape device first, because the device tells you which type to buy. Some people just search liquid vape nasty and assume any bottle will do. It won’t, because the two types don’t swap well.
            </p>

            <p>
              Bottle size is the next thing to look at. With Nasty 30ml vs 60ml bottle models, the bigger one lasts longer and usually costs less for each ml. Some flavors also come in a 50ml bottle, so check the listing. The PG/VG ratio sits on the label too. PG gives a bit of throat hit and carries the flavor. VG makes the vapor thicker. Neither is better. Your device decides.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#1a2a4a] pt-3">
              Best Nasty Vape Juice Models for New Vapers
            </h3>

            <p>
              Start small with your first bottle. Choose a low strength and a smooth flavor, and make sure the liquid matches the device you already own. A Nasty vape juice nicotine strength guide for beginners can be short. Begin low. Go up later only if you need to. People often ask about Nasty Juice 20mg vs{' '}
              <Link href="/shop?q=50mg" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                50mg
              </Link>{' '}
              models. Most people who don’t smoke find 20mg plenty, and 50mg can make the first few puffs hit hard enough to make you cough. The stronger bottle makes more sense for someone who already smokes every day.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Easy starter:</strong> A{' '}
              <Link href="/shop?nicotine=20mg" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                20mg
              </Link>{' '}
              salt nic bottle in a pod system is where most people begin, and a light ice flavor keeps the first week simple. Apple Ice, Peach Ice, Strawberry Ice and Blueberry Ice are the ones we would hand to a first-timer. They’re cool, fruity and soft on the throat. A pod with a tight draw suits them well, so you can find out if vaping is for you without a harsh start.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Everyday middle ground:</strong> Once you’ve settled in, a refillable tank saves money because it takes more liquid. Mango Ice, Strawberry Watermelon and Raspberry Watermelon are tasty in a tank, and a 60ml bottle goes a long way. Keep the nicotine low. Freebase at high strength is rough on the throat. Look at the PG/VG ratio as well, and choose one your coil can handle.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Long-lasting stock:</strong> If you vape every day, a long lasting Nasty Juice e-liquid saves you from running out after three days. A big bottle helps, and a cupboard away from sun and car heat keeps it tasting the way it should. Steady e-liquid flow into the coil matters too, so don’t let the tank run low before you refill.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#1a2a4a] pt-3">
              Best Nasty Vape Juice Models for Experienced Vapers
            </h3>

            <p>
              You know your coil, your wattage and your favorite draw. By now flavor depth and PG/VG ratio count for more than anything else. A quick label check saves a lot of guessing. Read the liquid type, the PG/VG ratio and the size of each bottle you like. Line up two or three flavors that way and one tends to stand out. If you Buy Nasty Vape Juice Models this way, you can easily get authentic Nasty vape juice instead of fakes.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Layered fruit mixes:</strong> Berry Grape, Mix Berry, Cherry Peach Raspberry and Grape Raspberry Ice have a blended taste that comes through best in a tank with open airflow. Blue Razz Ice and Berry Bomb lean sharper and sweeter. Kiwi Passionfruit Guava gives a bright, juicy finish.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Popular names:</strong> Trap Queen Nasty Juice gets asked for more than most. You can read the Nasty Trap Queen flavor profile on its product page. The reviews on that page are worth a look before you pick a size.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#1a2a4a] pt-3">
              Best Nasty Vape Juice Models for Smokers Switching Over
            </h3>

            <p>
              A smoker who switches usually cares about the hit before anything else. If the nicotine feels weak, a pack of cigarettes starts looking easy again. Nic salt in a pod system with a tight MTL draw is the usual route. For heavy smokers, 35mg to 50mg is a common range. Lighter smokers can begin near 20mg and adjust. The same rule applies if you’re moving over from a basic e-cigarette.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Tobacco flavors:</strong> Dry Tobacco, Vanilla Tobacco, Caramel Tobacco, Vanilla Custard Tobacco, Cubano and Tobacco Apple taste warm and familiar. They work for smokers who don’t want a fruity taste in the way.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Menthol and mint:</strong> Menthol, Arctic Mint, Spearmint and Miami Mint hit cold and clean. People who smoked menthols usually settle in here quickly.
            </p>

            {/* SECTION 2 */}
            <h2 id="nasty-vape-juice-flavors-and-features" className="text-xl sm:text-2xl font-black text-[#1a2a4a] pt-6 pb-2 border-b border-slate-200">
              Nasty Vape Juice Flavors and Features
            </h2>

            <p>
              Flavor is why most people pick Nasty. Instead of listing every bottle in a row, the flavors below sit in groups by taste.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Ice flavors:</strong> Nasty Lychee Ice, Watermelon Ice and Mango Ice are a good place to start if you like a cold exhale. Grape Ice, Pineapple Ice, Cola Ice, Guava Ice, Mango Peach Ice and Passion Fruit Ice follow the same idea. On most of them the cold stays gentle, and the fruit still comes through.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Fruit and berry flavors:</strong> Strawberry Kiwi, Strawberry Mango and Strawberry Melon are the strawberry blends, and Cherry Watermelon, Double Watermelon and Watermelon Apple cover the melon side. Grape Strawberry, Grape &amp; Mixed Berries and Blackcurrant round out the berries. Honeydew, Aloe Grape and Aqua taste lighter. Some grape fans ask for Genuine Nasty ASAP Grape e-liquid Dubai stores keep in stock.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Tropical flavors:</strong> Mango runs through most of this group, from Caribbean Mango and Green Mango to Peach Mango and Mango Lassi. Pineapple shows up as Pineapple, Pineapple Kiwi and Pineapple Lychee, and Passion Fruit, Guava and Lychee sit alongside them. They’re sweet, and they stay pleasant in hot weather.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Cush Man flavors:</strong> Nasty Cushman Mango and Mango Cushman are the starting point. Cush Man Mango Strawberry, Cush Man Mango Banana and Cush Man Mango Grape each bring a second fruit into the mango. If you’re after Original Nasty Cush Man e-liquid UAE shops carry, try the plain mango first and branch out from there.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Shisha flavors:</strong> Shisha Double Apple is the obvious pick for hookah fans. Shisha Melon Mint, Shisha Mix Melon Mint, Shisha Lemon Mint, Shisha Green Grape and Shisha Grape Raspberry cover the other hookah-style mixes. The Nasty Double Apple vs Green Ape debate is mostly about taste. Double Apple is sweet with a slight tartness, the classic hookah style. Green Ape suits people who want a sharper green apple. Green Apple and Nasty Green Apple are close neighbors.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Dessert, energy and cola flavors:</strong> For something sweet, there’s Coffee, Strawberry Milkshake, Rainbow Candy and plain Strawberry. Cherry Cola and Fizzy Cherry taste like soda, and Energy Drink, Red Energy and Red Rage go for the energy can. Pineapple Lemonade and Blackcurrant Lemonade land between fruit and soda.
            </p>

            {/* SECTION 3 */}
            <h2 id="things-worth-knowing-before-you-buy" className="text-xl sm:text-2xl font-black text-[#1a2a4a] pt-6 pb-2 border-b border-slate-200">
              Things Worth Knowing Before You Buy
            </h2>

            <p>
              <strong className="text-[#1a2a4a]">Match nicotine strength to your habit.</strong> Bigger isn’t better here. Salt nic at 35mg to 50mg suits heavy smokers. Casual vapers do better at 10mg to 20mg, and they can move up later if it feels weak.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Check your pods and tank.</strong> Buying a Nasty vape refill for a pod device? Confirm the pod accepts that liquid first. Thick, VG-heavy juice can clog a small coil. Thin salt nic juice can leak from a large tank.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Compare by price per ml.</strong> Vape liquid price in UAE shifts with bottle size, and larger bottles often cost less per ml. Many shoppers ask about the Nasty Vape Box price, and you’ll find the current figure on each product page. A salt nic bottle and a shortfill cost different amounts, so compare similar bottles.
            </p>

            <p>
              <strong className="text-[#1a2a4a]">Use real reviews.</strong> Reviews help most when they come from real buyers. Skim the ratings and comments, and see which best selling Nasty Juice flavors UAE shoppers keep reordering.
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-[#1a2a4a] pt-3">
              Real vs Fake Nasty Vape Juice
            </h3>

            <p>
              Real vs fake Nasty vape juice is something every UAE buyer should think about. A fake can taste harsh or chemical, and you can’t trust the nicotine level printed on it. That can hurt your health, so skip the gamble. Start with the printing. Real packaging has sharp text and even colors. The cap should be sealed, and the label should list nicotine strength, bottle size and PG/VG ratio.
            </p>

            <p>
              Vape products here have to meet ESMA safety standards, so a seller who can’t explain that should worry you. Look for ESMA approved Nasty vape juice UAE sellers can explain in plain words. Random social media sellers are not worth the risk. A shop that lists full product details is the safer choice.
            </p>

            {/* SECTION 4 */}
            <h2 id="where-to-buy-nasty-vape-juice-in-uae" className="text-xl sm:text-2xl font-black text-[#1a2a4a] pt-6 pb-2 border-b border-slate-200">
              Where to Buy Nasty Vape Juice in UAE
            </h2>

            <p>
              <Link href="/" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                Vape Stall
              </Link>{' '}
              is a verified and licensed vape seller in the UAE, and our products come from verified suppliers. As an online vape store, we aim to be the Best Nasty Vape Juice Shop in UAE for adult vapers. The{' '}
              <Link href="/shop?brand=Nasty" className="text-[#25406f] font-semibold hover:text-[#b48648] underline">
                Nasty collection
              </Link>{' '}
              can be browsed by flavor, nicotine strength and bottle size, and every bottle’s price is on its product page. Stock changes, so check the page before ordering.
            </p>

            <p>
              Delivery covers Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah and Umm Al Quwain. In central areas of Dubai, same day delivery is available, and some orders arrive within a few hours. Where you live changes the timing. You can pay with Cash on Delivery (COD) anywhere in the UAE.
            </p>

            <p>
              When a shop shows clear labels and answers your questions, you can Buy Nasty Vape Juice Models without second-guessing the bottle in your hand. You can order online at Vape Stall.
            </p>
          </div>

          {/* ─── Social Sharing Bar ─── */}
          <div className="article-template__social-sharing page-width page-width--narrow max-w-[820px] mx-auto px-4 sm:px-6 my-10">
            <div className="vap-share flex items-center justify-between flex-wrap gap-4 py-5 border-y border-slate-200">
              <span className="vap-share__label text-sm sm:text-base font-bold text-[#1a2a4a]">
                Share this article
              </span>
              <div className="vap-share__links flex items-center gap-2.5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/?text=${shareTitle}+${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vap-share__btn flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-[#25D366] hover:text-white hover:border-[#25D366] text-[#25406f] text-xs font-semibold transition-all shadow-sm"
                  aria-label="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 32 32">
                    <path d="M16 3.5C9.1 3.5 3.5 9.1 3.5 16c0 2.3.62 4.45 1.7 6.3L3.6 28.4l6.25-1.55A12.45 12.45 0 0016 28.5c6.9 0 12.5-5.6 12.5-12.5S22.9 3.5 16 3.5z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" fill="none" />
                    <path d="M11.793 9.5c-.25-.001-.52.006-.776.573-.258.569-.983 2.41-.983 2.41s-.162.437.065.87c.228.433.796 1.268 1.427 1.898 0 0 1.634 1.885 4.072 2.895 2.439 1.01 2.439.68 2.879.638.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.014-.374-1.932-1.192-.714-.637-1.197-1.424-1.338-1.664-.14-.24-.015-.37.105-.49.108-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.194-.468-.392-.404-.54-.411l-.458-.007z" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vap-share__btn flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] text-[#25406f] text-xs font-semibold transition-all shadow-sm"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M18 10.049C18 5.603 14.419 2 10 2s-8 3.603-8 8.049C2 14.067 4.925 17.396 8.75 18v-5.624H6.719v-2.328h2.03V8.275c0-2.017 1.195-3.132 3.023-3.132.874 0 1.79.158 1.79.158v1.98h-1.009c-.994 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326H11.25V18c3.825-.604 6.75-3.933 6.75-7.951" />
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vap-share__btn flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-black hover:text-white hover:border-black text-[#25406f] text-xs font-semibold transition-all shadow-sm"
                  aria-label="Share on X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.273 2.8 10.8 7.822 15.218 2.8h1.768l-5.4 6.139 5.799 8.254h-4.658l-3.73-5.31-4.671 5.31H2.558l5.654-6.427L2.615 2.8zm6.242 13.125L5.07 4.109h1.405l8.446 11.816z" clipRule="evenodd" />
                  </svg>
                  <span>X</span>
                </a>

                {/* Copy Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`vap-share__btn flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                    copied
                      ? 'bg-[#b48648] text-white border-[#b48648]'
                      : 'border-slate-200 bg-white text-[#25406f] hover:bg-[#25406f] hover:text-white hover:border-[#25406f]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  <span>{copied ? 'Copied!' : 'Copy link'}</span>
                </button>
              </div>
            </div>
          </div>

        </article>

        {/* ─── Frequently Asked Questions Section (8 Authentic Items) ─── */}
        <ArticleFaq items={article.faqs} />
      </main>
    </div>
  );
}
