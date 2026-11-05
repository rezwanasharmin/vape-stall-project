'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { insightArticles } from '@/data/insights';

export function InsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="shopify-section-template--28099413770470__vap_lnd_blog_TgtdMQ" className="shopify-section">
      <section ref={sectionRef} className="bin-read-more-about-section">
        <div className="page-width">
          <div className="bin-read-more-about-container">
            <h4 className="bin-read-more-title">Disposable Vape Insights</h4>
            <p className="bin-read-more-text">Learn &amp; Choose</p>

            <div className="bin-read-more-card-container">
              {insightArticles.map((article) => (
                <div key={article.id} className="en-blog-card">
                  <Link href={article.href} className="blog-content" aria-label={article.title}>
                    <div className="img-container">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={600}
                        height={335}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="blog-text-content">
                      <div className="blog-author">{article.author}</div>
                      <h3 className="blog-title">{article.title}</h3>
                      <div className="date-tag">
                        <div className="time">
                          <span className="tag">{article.date}</span>
                        </div>
                      </div>
                      <div className="blog-text">
                        <p dir="ltr">
                          <span>{article.excerpt}</span>
                        </p>
                      </div>
                      <div className="btn-container">
                        <p className="lees-meer-text">Read more</p>
                        <span className="arrow-svg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.38797 0.798006C7.69283 0.436488 8.22349 0.398914 8.57315 0.714081L13.712 5.34568C13.8949 5.51056 14 5.74932 14 6.00024C14 6.25127 13.8949 6.48991 13.712 6.65479L8.57315 11.2864C8.22349 11.6015 7.69283 11.564 7.38797 11.2025C7.0831 10.8409 7.1195 10.2924 7.46917 9.97725L10.9182 6.86866H0.84C0.376085 6.86866 0 6.47984 0 6.00024C0 5.52064 0.376085 5.13182 0.84 5.13182H10.9182L7.46917 2.02327C7.1195 1.7081 7.0831 1.15952 7.38797 0.798006Z"
                              fill="#1F271B"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="bin-read-more-footer">
              <Link href="/blogs/news" className="bin-read-more-view-all">
                View All
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

