'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { blogArticles } from '@/data/blogArticles';
import { FAQSection } from '@/components/home/FAQSection';
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
          
          {/* ─── Hero Image Container (Crystal-Clear 2752w Original) ─── */}
          <div className="article-template__hero-container max-w-[1040px] mx-auto px-4 sm:px-6 mt-4 sm:mt-8">
            <div className="article-template__hero-adapt media relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-[16/9] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                unoptimized
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
          {article.toc && article.toc.length > 0 && (
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
          )}

          {/* ─── Article Content (1:1 with vapstall.ae) ─── */}
          <div
            className="article-template__content page-width page-width--narrow max-w-[820px] mx-auto px-4 sm:px-6 text-[15px] sm:text-[16.5px] leading-relaxed text-[#334155] space-y-5"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

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

        {/* ─── Frequently Asked Questions Section (Exact 1:1 Home page FAQ section) ─── */}
        <FAQSection />
      </main>
    </div>
  );
}
