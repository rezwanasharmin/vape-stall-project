'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="vap-footer">
      <div className="vap-footer__top-accent" />
      <div className="page-width">
        <div className="vap-footer__main">
          {/* Brand Column */}
          <div className="vap-footer__brand">
            <Link href="/" className="vap-footer__logo-link">
              <Image
                src="/images/footer-logo.png"
                alt="Logo of Vape Stall with a person holding a vape device on a white background"
                width={100}
                height={100}
                className="w-[100px] h-auto object-contain brightness-110"
              />
            </Link>

            <p className="vap-footer__desc">
              Vape Stall is a authorized vape shop offering genuine disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from top brands like Elf Bar, Lost Mary, VOZOL, HQD, and Al Fakher. We provide fast delivery across all UAE Emirates, competitive prices, and reliable customer support for a smooth vaping experience.
            </p>

            {/* Social Icons */}
            <div className="vap-footer__socials">
              <a
                href="https://www.facebook.com/profile.php?id=61583779137796"
                target="_blank"
                rel="noopener noreferrer"
                className="vap-footer__social-icon"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/vapestallae/"
                target="_blank"
                rel="noopener noreferrer"
                className="vap-footer__social-icon"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@vapestall.uae"
                target="_blank"
                rel="noopener noreferrer"
                className="vap-footer__social-icon"
                aria-label="TikTok"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://x.com/vapestalluae"
                target="_blank"
                rel="noopener noreferrer"
                className="vap-footer__social-icon"
                aria-label="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.pinterest.com/vapestallae/"
                target="_blank"
                rel="noopener noreferrer"
                className="vap-footer__social-icon"
                aria-label="Pinterest"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Group */}
          <div className="vap-footer__nav-group">
            <div className="vap-footer__nav-col">
              <h3 className="vap-footer__col-title">Menu</h3>
              <ul className="vap-footer__nav-list">
                <li><Link href="/shop?category=Nicotine+Pouches" className="vap-footer__nav-link">Nicotine Pouches</Link></li>
                <li><Link href="/shop?category=Shisha+Disposable" className="vap-footer__nav-link">Shisha Disposable</Link></li>
                <li><Link href="/shop?category=Disposable+Vape" className="vap-footer__nav-link">Disposable Vape</Link></li>
                <li><Link href="/pages/wishlist" className="vap-footer__nav-link">Wishlist</Link></li>
                <li><Link href="/sitemap" className="vap-footer__nav-link">Sitemap</Link></li>
              </ul>
            </div>
            <div className="vap-footer__nav-col">
              <h3 className="vap-footer__col-title">Support</h3>
              <ul className="vap-footer__nav-list">
                <li><Link href="/pages/about-us" className="vap-footer__nav-link">About us</Link></li>
                <li><Link href="/terms" className="vap-footer__nav-link">Terms &amp; Conditions</Link></li>
                <li><Link href="/blogs/news" className="vap-footer__nav-link">Latest Blog</Link></li>
                <li><Link href="/contact" className="vap-footer__nav-link">Contact us</Link></li>
                <li><Link href="/#vapFaqSection" className="vap-footer__nav-link">FAQs</Link></li>
                <li><Link href="/shipping" className="vap-footer__nav-link">Shipping &amp; Delivery</Link></li>
                <li><Link href="/privacy" className="vap-footer__nav-link">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="vap-footer__contact">
            <h3 className="vap-footer__col-title">Contact Us</h3>
            <ul className="vap-footer__contact-list">
              <li className="vap-footer__contact-item">
                <span className="vap-footer__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <a href="https://maps.app.goo.gl/k8rbf6nAYFjNbHBc6" target="_blank" rel="noopener noreferrer" className="vap-footer__contact-link">
                  Map
                </a>
              </li>
              <li className="vap-footer__contact-item">
                <span className="vap-footer__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <a href="tel:+971551688299" className="vap-footer__contact-link">
                  +971 55 168 8299
                </a>
              </li>
              <li className="vap-footer__contact-item">
                <span className="vap-footer__contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <a href="mailto:vapestallae@gmail.com" className="vap-footer__contact-link">
                  vapestallae@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="vap-footer__divider" />

        {/* Bottom Bar */}
        <div className="vap-footer__bottom">
          <p className="vap-footer__copyright">
            &copy; 2026 vape stall. All rights reserved. Powered by{' '}
            <a href="https://www.webestone.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
              Webestone
            </a>.
          </p>
        </div>
      </div>
    </footer>
  );
};
