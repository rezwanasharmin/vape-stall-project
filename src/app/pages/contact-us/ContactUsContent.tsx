'use client';

import React, { useState } from 'react';
import './vap-contact-page.css';

export default function ContactUsContent() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        topic: '',
        message: '',
      });
    }, 500);
  };

  return (
    <div className="vap-contact-page">
      {/* Hero */}
      <section className="vap-contact-hero">
        <div className="vap-contact-hero__shapes">
          <div className="vap-contact-hero__shape vap-contact-hero__shape--1" />
          <div className="vap-contact-hero__shape vap-contact-hero__shape--2" />
          <div className="vap-contact-hero__shape vap-contact-hero__shape--3" />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="vap-contact-hero__eyebrow">
            <span className="vap-contact-hero__eyebrow-dot" />
            Get In Touch
          </div>
          <h1 className="vap-contact-hero__title">Contact Vape Stall</h1>
          <p className="vap-contact-hero__subtitle">
            Need help with an order, product recommendation, delivery inquiry, or general question? Our team is here to assist you. Send us a message and Vape Stall support will respond as quickly as possible to help with your vaping needs across Dubai and the UAE.
          </p>
        </div>

        <div className="vap-contact-hero__wave">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,70 L0,35 C240,70 480,0 720,20 C960,40 1200,60 1440,35 L1440,70 Z" fill="#f1f4f9" />
          </svg>
        </div>
      </section>

      {/* Body */}
      <section className="vap-contact-body">
        <div className="vap-contact-body__inner">
          {/* Info Sidebar */}
          <aside className="vap-contact-info">
            <div className="vap-contact-info__header">
              <p className="vap-contact-info__label">Contact Details</p>
              <h2 className="vap-contact-info__heading">Reach Us Anytime</h2>
              <p className="vap-contact-info__desc">
                Our friendly team is here to help and always ready to assist you.
              </p>
            </div>

            <div className="vap-contact-card">
              <div className="vap-contact-card__icon">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </div>
              <div className="vap-contact-card__content">
                <p className="vap-contact-card__label">Email Us</p>
                <p className="vap-contact-card__value">
                  <a href="mailto:vapestallae@gmail.com">vapestallae@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="vap-contact-card">
              <div className="vap-contact-card__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 10.81 19.79 19.79 0 01.46 2.18 2 2 0 012.44 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 7.91a16 16 0 006.61 6.61l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div className="vap-contact-card__content">
                <p className="vap-contact-card__label">Call Us</p>
                <p className="vap-contact-card__value">
                  <a href="tel:+971551688299">+971 55 168 8299</a>
                </p>
              </div>
            </div>

            <div className="vap-contact-card">
              <div className="vap-contact-card__icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>
              </div>
              <div className="vap-contact-card__content">
                <p className="vap-contact-card__label">Visit Us</p>
                <p className="vap-contact-card__value">5CG7+3G7 Dubai - United Arab Emirates</p>
              </div>
            </div>

            <div className="vap-contact-card">
              <div className="vap-contact-card__icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="vap-contact-card__content">
                <p className="vap-contact-card__label">Working Hours</p>
                <p className="vap-contact-card__value">Mon–Fri: 10am – 10pm GST</p>
              </div>
            </div>
          </aside>

          {/* Form Panel */}
          <div className="vap-contact-form-panel">
            <div className="vap-contact-form-panel__header">
              <h2 className="vap-contact-form-panel__title">Send Us a Message</h2>
              <p className="vap-contact-form-panel__subtitle">
                Fill out the form and we'll be in touch as soon as possible.
              </p>
            </div>

            {submitted && (
              <div className="vap-contact-success" role="alert">
                <svg viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="vap-contact-form">
                {/* Row: Name + Email */}
                <div className="vap-contact-form__row">
                  <div className="vap-field">
                    <label className="vap-field__label" htmlFor="VapContact-name">
                      Full Name
                    </label>
                    <input
                      className="vap-field__input"
                      type="text"
                      id="VapContact-name"
                      name="contact[Full Name]"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      autoComplete="name"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="vap-field">
                    <label className="vap-field__label" htmlFor="VapContact-email">
                      Email Address <span className="vap-field__required">*</span>
                    </label>
                    <input
                      className="vap-field__input"
                      type="email"
                      id="VapContact-email"
                      name="contact[email]"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      autoComplete="email"
                      spellCheck="false"
                      autoCapitalize="off"
                      required
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Row: Phone + Topic */}
                <div className="vap-contact-form__row">
                  <div className="vap-field">
                    <label className="vap-field__label" htmlFor="VapContact-phone">
                      Phone Number
                    </label>
                    <input
                      className="vap-field__input"
                      type="tel"
                      id="VapContact-phone"
                      name="contact[Phone]"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      autoComplete="tel"
                      pattern="[0-9\-\+\s\(\)]*"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="vap-field">
                    <label className="vap-field__label" htmlFor="VapContact-topic">
                      Topic
                    </label>
                    <select
                      className="vap-field__select"
                      id="VapContact-topic"
                      name="contact[Topic]"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    >
                      <option value="">Select a topic</option>
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Return / Refund">Return / Refund</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="vap-field">
                  <label className="vap-field__label" htmlFor="VapContact-body">
                    Message <span className="vap-field__required">*</span>
                  </label>
                  <textarea
                    className="vap-field__textarea"
                    id="VapContact-body"
                    name="contact[Message]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    placeholder="How can we help you?"
                  />
                </div>

                {/* Footer */}
                <div className="vap-contact-form__footer">
                  <p className="vap-contact-form__note">
                    <span className="vap-field__required">*</span> Required fields · We respect your privacy
                  </p>
                  <button type="submit" className="vap-contact-submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                    <svg viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
