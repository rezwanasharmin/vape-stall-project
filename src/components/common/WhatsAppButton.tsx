'use client';

import React, { useState, useEffect, useRef } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape (matching authentic vapstall.ae behavior)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (floatRef.current && !floatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="wa-float" id="WaFloat" ref={floatRef}>
      <div className="wa-float__menu" id="WaMenu" aria-hidden={isOpen ? 'false' : 'true'}>
        <a
          href="tel:+971551688299"
          rel="noopener noreferrer"
          className="wa-float__option"
        >
          <span className="wa-float__option-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className="wa-float__option-label">Call</span>
        </a>
        <a
          href="https://wa.me/971551688299"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-float__option"
        >
          <span className="wa-float__option-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className="wa-float__option-label">Message</span>
        </a>
      </div>
      <button
        className="wa-float__trigger"
        id="WaTrigger"
        aria-label="Contact us on WhatsApp"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls="WaMenu"
        onClick={handleTriggerClick}
      >
        <svg className="wa-icon-wa" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M16 2C8.268 2 2 8.268 2 16c0 2.478.674 4.797 1.848 6.786L2 30l7.43-1.818A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
            fill="#fff"
          />
          <path
            d="M16 4.5c-6.351 0-11.5 5.149-11.5 11.5 0 2.138.587 4.14 1.607 5.854l.224.378-1.014 3.704 3.803-.998.365.217A11.452 11.452 0 0016 27.5c6.351 0 11.5-5.149 11.5-11.5S22.351 4.5 16 4.5z"
            fill="#25D366"
          />
          <path
            d="M11.793 9.5c-.25-.001-.52.006-.776.573-.258.569-.983 2.41-.983 2.41s-.162.437.065.87c.228.433.796 1.268 1.427 1.898 0 0 1.634 1.885 4.072 2.895 2.439 1.01 2.439.68 2.879.638.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.014-.374-1.932-1.192-.714-.637-1.197-1.424-1.338-1.664-.14-.24-.015-.37.105-.49.108-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.194-.468-.392-.404-.54-.411l-.458-.007z"
            fill="#fff"
          />
        </svg>
        <svg className="wa-icon-close" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};
