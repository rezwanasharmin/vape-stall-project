"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import "./vap-about-us.css";

export default function AboutUsContent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Canvas particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = (canvas.width = canvas.offsetWidth || window.innerWidth);
    let H = (canvas.height = canvas.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x = Math.random() * W;
      y = Math.random() * H;
      r = Math.random() * 1.8 + 0.4;
      vx = (Math.random() - 0.5) * 0.35;
      vy = (Math.random() - 0.5) * 0.35;
      a = Math.random() * 0.5 + 0.15;
      color =
        Math.random() > 0.5
          ? `rgba(125,211,252,${this.a})`
          : `rgba(6,182,212,${this.a})`;

      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.8 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.a = Math.random() * 0.5 + 0.15;
        this.color =
          Math.random() > 0.5
            ? `rgba(125,211,252,${this.a})`
            : `rgba(6,182,212,${this.a})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(125,211,252,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      drawLines();
      animId = requestAnimationFrame(loop);
    };
    loop();

    // Scroll reveal (IntersectionObserver)
    const revealEls = document.querySelectorAll(
      ".vap-reveal, .vap-reveal-left, .vap-reveal-right, .vap-reveal-scale"
    );
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => observer?.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // Timeline line draw
    const tlLine = document.getElementById("vap-tl-line");
    let tlObs: IntersectionObserver | null = null;
    if (tlLine && "IntersectionObserver" in window && tlLine.parentElement) {
      tlObs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            tlLine.classList.add("is-drawn");
            tlObs?.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      tlObs.observe(tlLine.parentElement);
    } else if (tlLine) {
      tlLine.classList.add("is-drawn");
    }

    // Counter animation
    const animateCount = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute("data-count") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const suffix_el = el.querySelector(".stat-suffix");
      const duration = 1800;
      const start = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.round(easeOut(progress) * target);
        const text =
          value >= 1000000
            ? (value / 1000000).toFixed(1).replace(".0", "") + "M"
            : value >= 1000
            ? (value / 1000).toFixed(1).replace(".0", "") + "K"
            : String(value);

        if (el.childNodes[0]) {
          el.childNodes[0].textContent = text;
        }
        if (suffix_el) {
          suffix_el.textContent = suffix;
        }
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const counterEls = document.querySelectorAll<HTMLElement>(
      ".vap-about-stat__num[data-count]"
    );
    let counterObs: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      counterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target as HTMLElement);
              counterObs?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counterEls.forEach((el) => counterObs?.observe(el));
    }

    // Mouse parallax on hero orbs
    const hero = heroRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;
      const orbs = hero.querySelectorAll<HTMLElement>(".vap-about-hero__orb");
      orbs.forEach((orb, i) => {
        const depth = (i + 1) * 18;
        orb.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
    };
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      observer?.disconnect();
      tlObs?.disconnect();
      counterObs?.disconnect();
      if (hero) hero.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="vap-about-page">
<section ref={heroRef} className="vap-about-hero">
  <canvas ref={canvasRef} id="vap-about-canvas" />
  <div className="vap-about-hero__mesh"></div>
  <div className="vap-about-hero__orbs">
    <div className="vap-about-hero__orb vap-about-hero__orb--1"></div>
    <div className="vap-about-hero__orb vap-about-hero__orb--2"></div>
    <div className="vap-about-hero__orb vap-about-hero__orb--3"></div>
  </div>

  {/* Decorative ring */}
  <div className="vap-about-hero__rings">
    <svg viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="260" cy="260" r="250" stroke="white" strokeWidth="1"/>
      <circle cx="260" cy="260" r="200" stroke="white" strokeWidth="0.5"/>
      <circle cx="260" cy="260" r="150" stroke="white" strokeWidth="0.5"/>
      <circle cx="260" cy="260" r="100" stroke="white" strokeWidth="0.5"/>
      <line x1="10" y1="260" x2="510" y2="260" stroke="white" strokeWidth="0.5"/>
      <line x1="260" y1="10" x2="260" y2="510" stroke="white" strokeWidth="0.5"/>
      <line x1="83" y1="83" x2="437" y2="437" stroke="white" strokeWidth="0.5"/>
      <line x1="437" y1="83" x2="83" y2="437" stroke="white" strokeWidth="0.5"/>
    </svg>
  </div>

  <div className="vap-about-hero__inner">
    {/* Left */}
    <div className="vap-about-hero__left vap-reveal-right">
      <div className="vap-about-hero__badge">
        <span className="vap-about-hero__badge-dot"></span>
        <span className="vap-about-hero__badge-text">UAE's Premier Vape Store · Est. 2020</span>
      </div>
      <h1 className="vap-about-hero__title">
        Crafted for<br />
        <em>Vape Enthusiasts</em><br />
        Across the UAE
      </h1>
      <p className="vap-about-hero__subtitle">
        Vape Stall is your trusted vape shop in UAE, offering genuine disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from top brands like Elf Bar, Lost Mary, VOZOL, HQD, and Al Fakher. Based in Dubai, we deliver across all seven Emirates with fair prices, authentic products, and friendly service.
      </p>
      <div className="vap-about-hero__actions">
        <a href="/shop" className="vap-about-hero__btn vap-about-hero__btn--primary">
          Shop Now
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="/contact" className="vap-about-hero__btn vap-about-hero__btn--secondary">
          Get In Touch
          <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>

    {/* Right: Glass stat cards */}
    <div className="vap-about-hero__visual vap-reveal-left vap-delay-2">
      <div className="vap-about-hero__visual-card">
        <div className="vap-about-hero__vc-icon">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
        </div>
        <div>
          <div className="vap-about-hero__vc-num">2000000+</div>
          <div className="vap-about-hero__vc-label">Happy Customers</div>
        </div>
      </div>
      <div className="vap-about-hero__visual-card">
        <div className="vap-about-hero__vc-icon">
          <svg viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div>
          <div className="vap-about-hero__vc-num">300+</div>
          <div className="vap-about-hero__vc-label">Brands</div>
        </div>
      </div>
      <div className="vap-about-hero__visual-card">
        <div className="vap-about-hero__vc-icon">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div>
          <div className="vap-about-hero__vc-num">4.9 ★</div>
          <div className="vap-about-hero__vc-label">Average Rating</div>
        </div>
      </div>
    </div>
  </div>

  <div className="vap-about-hero__wave">
    <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,100 L0,55 C200,95 400,15 600,40 C800,65 1000,90 1200,60 C1310,44 1390,22 1440,50 L1440,100 Z" fill="#f1f4f9"/>
    </svg>
  </div>
</section>

{/* Ticker */}
<div className="vap-about-ticker" aria-hidden="true">
  <div className="vap-about-ticker__track"><span className="vap-about-ticker__item">100% Authentic Products <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Same-Day Dubai Delivery <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">7 Emirates Coverage <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">24/7 Expert Support <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Free Shipping Over AED 350 <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Easy 7-Day Returns <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Best Prices Guaranteed <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Loyalty Rewards Programme <span className="vap-about-ticker__sep">✦</span></span><span className="vap-about-ticker__item">100% Authentic Products <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Same-Day Dubai Delivery <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">7 Emirates Coverage <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">24/7 Expert Support <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Free Shipping Over AED 350 <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Easy 7-Day Returns <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Best Prices Guaranteed <span className="vap-about-ticker__sep">✦</span></span>
        <span className="vap-about-ticker__item">Loyalty Rewards Programme <span className="vap-about-ticker__sep">✦</span></span></div>
</div>

{/* Story */}
<section className="vap-about-story">
  <div className="vap-about-story__inner">

    <div className="vap-about-story__content vap-reveal-right">
      <p className="vap-about-story__eyebrow">Our Story</p>
      <h2 className="vap-about-story__title">
        From Dubai Roots to<br />
        <strong>UAE-Wide Passion</strong>
      </h2>
      <p className="vap-about-story__text">Vape Stall was founded in Dubai with one goal: to make premium vaping products more accessible across the UAE. We offer genuine disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from trusted global brands known for quality and performance.</p>
      <p className="vap-about-story__text">What started as a growing vape shop in Dubai now serves customers across all seven Emirates with authentic products, fast delivery, fair prices, and reliable customer support.</p>
      <div className="vap-about-story__blockquote">
        <span className="vap-about-story__blockquote-mark">"</span>
        <p>"At Vape Stall, we believe vaping should be simple, reliable, and enjoyable — from your first vape device to your everyday favorite flavors."</p>
      </div>
    </div>

    <div className="vap-about-story__visual vap-reveal-left vap-delay-2">
      <div className="vap-about-story__block vap-about-story__block--a">
        <div className="vap-about-story__block-bg-icon">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div className="vap-about-story__block-num" data-count="7+" data-suffix="+">5<span>+</span></div>
        <div className="vap-about-story__block-label">Years of Trusted Service in the UAE</div>
      </div>
      <div className="vap-about-story__block vap-about-story__block--b">
        <div className="vap-about-story__block-bg-icon">
          <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
        </div>
        <div className="vap-about-story__block-num">2M<span>+</span></div>
        <div className="vap-about-story__block-label">Satisfied Customers</div>
      </div>
      <div className="vap-about-story__block vap-about-story__block--c">
        <div className="vap-about-story__block-bg-icon">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div className="vap-about-story__block-num">4.9<span>★</span></div>
        <div className="vap-about-story__block-label">Average Customer Rating</div>
      </div>
    </div>

  </div>
</section>

{/* Stats Banner */}
<div className="vap-about-stats">
  <div className="vap-about-stats__inner">
    <div className="vap-about-stat vap-reveal vap-delay-1">
      <div className="vap-about-stat__icon">
        <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
      </div>
      <span className="vap-about-stat__num" data-count="2000000" data-suffix="+">0<span className="stat-suffix">+</span></span>
      <span className="vap-about-stat__label">Happy Customers</span>
    </div>
    <div className="vap-about-stat vap-reveal vap-delay-2">
      <div className="vap-about-stat__icon">
        <svg viewBox="0 0 24 24"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
      </div>
      <span className="vap-about-stat__num" data-count="300" data-suffix="+">0<span className="stat-suffix">+</span></span>
      <span className="vap-about-stat__label">Products in Stock</span>
    </div>
    <div className="vap-about-stat vap-reveal vap-delay-3">
      <div className="vap-about-stat__icon">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
      </div>
      <span className="vap-about-stat__num" data-count="7">0<span className="stat-suffix"></span></span>
      <span className="vap-about-stat__label">Emirates Covered</span>
    </div>
    <div className="vap-about-stat vap-reveal vap-delay-4">
      <div className="vap-about-stat__icon">
        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      </div>
      <span className="vap-about-stat__num" data-count="30" data-suffix="+">0<span className="stat-suffix">+</span></span>
      <span className="vap-about-stat__label">Hour Support</span>
    </div>
  </div>
</div>

{/* Values */}
<section className="vap-about-mission">
  <div className="vap-about-mission__inner">
    <div className="vap-about-section-head vap-reveal">
      <div className="vap-about-section-head__pill">
        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Our Values
      </div>
      <h2 className="vap-about-section-head__title">What Drives Everything We Do</h2>
      <p className="vap-about-section-head__subtitle">Every decision we make goes back to these core principles.</p>
    </div>
    <div className="vap-about-mission__grid">
      <div className="vap-about-value-card vap-reveal vap-delay-1">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">Authenticity First</h3>
        <p className="vap-about-value-card__text">Every product we sell is 100% genuine, sourced directly from authorised distributors. No fakes, no grey imports — ever. Your safety is non-negotiable.</p>
      </div>
      <div className="vap-about-value-card vap-reveal vap-delay-2">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">Customer Obsession</h3>
        <p className="vap-about-value-card__text">From same-day delivery to 24/7 support, we obsess over every customer touchpoint. When you're happy, we're happy — it's really that simple.</p>
      </div>
      <div className="vap-about-value-card vap-reveal vap-delay-3">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">Expert Knowledge</h3>
        <p className="vap-about-value-card__text">Our team are passionate vapers themselves. We give honest, informed advice — not just sales pitches. We help you find what's right for you.</p>
      </div>
      <div className="vap-about-value-card vap-reveal vap-delay-1">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">UAE-Wide Reach</h3>
        <p className="vap-about-value-card__text">We deliver across all seven emirates — from Dubai to Fujairah. Same-day in Dubai, fast 1–4 day shipping everywhere else.</p>
      </div>
      <div className="vap-about-value-card vap-reveal vap-delay-2">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">Transparent Pricing</h3>
        <p className="vap-about-value-card__text">What you see is what you pay. No hidden fees, no surprise charges at checkout. Just fair, honest pricing on every product.</p>
      </div>
      <div className="vap-about-value-card vap-reveal vap-delay-3">
        <div className="vap-about-value-card__icon-wrap">
          <div className="vap-about-value-card__icon">
            <svg viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
          </div>
        </div>
        <h3 className="vap-about-value-card__title">Hassle-Free Returns</h3>
        <p className="vap-about-value-card__text">Not happy with your order? Our 7-day return policy means you can shop with full confidence. We make it right, every time.</p>
      </div>
    </div>
  </div>
</section>

{/* Timeline */}
<section className="vap-about-journey">
  <div className="vap-about-journey__inner">
    <div className="vap-about-section-head vap-reveal">
      <div className="vap-about-section-head__pill">
        <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Our Journey
      </div>
      <h2 className="vap-about-section-head__title">How We Got Here</h2>
      <p className="vap-about-section-head__subtitle">From a small team with a big idea to the UAE's go-to vape destination.</p>
    </div>
    <div className="vap-about-timeline">
      <div className="vap-about-timeline__line" id="vap-tl-line"></div>
      <div className="vap-about-tl-item vap-reveal vap-delay-1">
        <div className="vap-about-tl-item__dot-wrap"><div className="vap-about-tl-item__dot"></div></div>
        <div className="vap-about-tl-item__card">
          <span className="vap-about-tl-item__year">2020</span>
          <h4 className="vap-about-tl-item__title">The Beginning — Dubai</h4>
          <p className="vap-about-tl-item__text">Founded in Dubai by a group of vaping enthusiasts frustrated with the lack of quality and authentic options in the UAE market. We started with a curated range of 50 products and a promise to never compromise on quality.</p>
        </div>
      </div>
      <div className="vap-about-tl-item vap-reveal vap-delay-2">
        <div className="vap-about-tl-item__dot-wrap"><div className="vap-about-tl-item__dot"></div></div>
        <div className="vap-about-tl-item__card">
          <span className="vap-about-tl-item__year">2021</span>
          <h4 className="vap-about-tl-item__title">Expanding Our Catalogue</h4>
          <p className="vap-about-tl-item__text">Grew our product range to over 300 items across premium device brands, international e-liquid labels, and UAE-compliant accessories. Launched same-day delivery across Dubai.</p>
        </div>
      </div>
      <div className="vap-about-tl-item vap-reveal vap-delay-3">
        <div className="vap-about-tl-item__dot-wrap"><div className="vap-about-tl-item__dot"></div></div>
        <div className="vap-about-tl-item__card">
          <span className="vap-about-tl-item__year">2022</span>
          <h4 className="vap-about-tl-item__title">Nationwide Coverage</h4>
          <p className="vap-about-tl-item__text">Extended delivery to all 7 UAE emirates. Partnered with leading logistics providers to ensure reliable, fast shipping from Abu Dhabi to Ras Al Khaimah and everywhere in between.</p>
        </div>
      </div>
      <div className="vap-about-tl-item vap-reveal vap-delay-4">
        <div className="vap-about-tl-item__dot-wrap"><div className="vap-about-tl-item__dot"></div></div>
        <div className="vap-about-tl-item__card">
          <span className="vap-about-tl-item__year">2023</span>
          <h4 className="vap-about-tl-item__title">2000000+ Customers & Growing</h4>
          <p className="vap-about-tl-item__text">Reached the milestone of 2000000 happy customers with a 4.9-star average rating. Launched our loyalty rewards programme and expanded our team to 24/7 customer support.</p>
        </div>
      </div>
      <div className="vap-about-tl-item vap-reveal vap-delay-5">
        <div className="vap-about-tl-item__dot-wrap"><div className="vap-about-tl-item__dot"></div></div>
        <div className="vap-about-tl-item__card">
          <span className="vap-about-tl-item__year">2024</span>
          <h4 className="vap-about-tl-item__title">What's Next</h4>
          <p className="vap-about-tl-item__text">New brand partnerships, exclusive UAE-first product launches, and a refreshed loyalty programme with even bigger rewards. We're just getting started.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Why Choose Us */}
<section className="vap-about-why">
  <div className="vap-about-why__inner">
    <div className="vap-about-section-head vap-reveal">
      <div className="vap-about-section-head__pill">
        <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Why VAP
      </div>
      <h2 className="vap-about-section-head__title">Why Millions Choose VAP</h2>
      <p className="vap-about-section-head__subtitle">Real reasons our customers keep coming back.</p>
    </div>
    <div className="vap-about-why__grid">
      <div className="vap-about-why-item vap-reveal vap-delay-1">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg></div>
        <div><h4 className="vap-about-why-item__title">100% Authentic Products</h4><p className="vap-about-why-item__text">Every item sourced from verified, authorised distributors. Full manufacturer warranty on all devices. Scan-to-verify anti-counterfeit codes on all major brands.</p></div>
      </div>
      <div className="vap-about-why-item vap-reveal vap-delay-2">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
        <div><h4 className="vap-about-why-item__title">Same-Day Dubai Delivery</h4><p className="vap-about-why-item__text">Order before 2pm and receive within 3–6 hours anywhere in Dubai. Free standard delivery across UAE on orders over AED 350.</p></div>
      </div>
      <div className="vap-about-why-item vap-reveal vap-delay-3">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.81 19.79 19.79 0 01.46 2.18 2 2 0 012.44 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 7.91a16 16 0 006.61 6.61l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></div>
        <div><h4 className="vap-about-why-item__title">Expert Support — 7 Days</h4><p className="vap-about-why-item__text">Real humans, not bots. Our vape-expert team available every day via WhatsApp, email, and live chat.</p></div>
      </div>
      <div className="vap-about-why-item vap-reveal vap-delay-4">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
        <div><h4 className="vap-about-why-item__title">Best Prices Guaranteed</h4><p className="vap-about-why-item__text">We price-match against any authorised UAE retailer. Found it cheaper? Tell us and we'll beat it.</p></div>
      </div>
      <div className="vap-about-why-item vap-reveal vap-delay-5">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg></div>
        <div><h4 className="vap-about-why-item__title">Loyalty Rewards</h4><p className="vap-about-why-item__text">Earn points on every purchase. Redeem for discounts, early access, and exclusive member bundles.</p></div>
      </div>
      <div className="vap-about-why-item vap-reveal vap-delay-6">
        <div className="vap-about-why-item__icon"><svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg></div>
        <div><h4 className="vap-about-why-item__title">Easy 7-Day Returns</h4><p className="vap-about-why-item__text">Changed your mind? Our no-hassle return policy means you buy with complete confidence every time.</p></div>
      </div>
    </div>
  </div>
</section>

{/* CTA */}
<section className="vap-about-cta">
  <div className="vap-about-cta__bg"></div>
  <div className="vap-about-cta__orb vap-about-cta__orb--1"></div>
  <div className="vap-about-cta__orb vap-about-cta__orb--2"></div>
  <div className="vap-about-cta__inner vap-reveal">
    <div className="vap-about-cta__badge">
      <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      Join the VAP Community
    </div>
    <h2>Ready to Elevate Your<br /><span>Vape Experience?</span></h2>
    <p>Browse premium devices, e-liquids, and accessories — delivered fast across all seven UAE emirates.</p>
    <div className="vap-about-cta__actions">
      <a href="/shop" className="vap-about-cta__btn vap-about-cta__btn--primary">
        Shop the Collection
        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
      <a href="/contact" className="vap-about-cta__btn vap-about-cta__btn--secondary">
        Talk to an Expert
        <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
  </div>
</section>


    </div>
  );
}
