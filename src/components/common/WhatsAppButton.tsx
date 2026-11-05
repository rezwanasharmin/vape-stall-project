'use client';

import React, { useState, useEffect, useRef } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleActionClick = (actionName: string) => {
    // Interactive action without navigating or page reloading:
    console.log(`WhatsApp widget option clicked: ${actionName}`);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none font-sans"
    >
      {/* Floating Action Pills (Call & Message) */}
      <div
        className={`flex flex-col items-end gap-2.5 mb-3 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Call Pill */}
        <button
          type="button"
          onClick={() => handleActionClick('Call')}
          className="group flex items-center gap-2.5 bg-white text-gray-800 pl-1.5 pr-4 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.16)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-black/[0.04]"
          aria-label="Call"
        >
          <span className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#20ba59] transition-colors">
            {/* Phone Call Icon */}
            <svg
              className="w-4.5 h-4.5 fill-white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-.99-1z" />
            </svg>
          </span>
          <span className="text-[14.5px] font-bold text-[#1f2937] tracking-tight">Call</span>
        </button>

        {/* Message Pill */}
        <button
          type="button"
          onClick={() => handleActionClick('Message')}
          className="group flex items-center gap-2.5 bg-white text-gray-800 pl-1.5 pr-4 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.16)] hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-black/[0.04]"
          aria-label="Message"
        >
          <span className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-[#20ba59] transition-colors">
            {/* Message Bubble Icon with horizontal lines cutout */}
            <svg
              className="w-4.5 h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 4C1.895 4 1 4.895 1 6v10c0 1.105.895 2 2 2h2v3.5L8.5 18H21c1.105 0 2-.895 2-2V6c0-1.105-.895-2-2-2H3zm3 4a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 3.5a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zm0 3.5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                fill="white"
              />
            </svg>
          </span>
          <span className="text-[14.5px] font-bold text-[#1f2937] tracking-tight">Message</span>
        </button>
      </div>

      {/* Main WhatsApp / Close Toggle Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close contact options' : 'Open WhatsApp contact options'}
        aria-expanded={isOpen}
        className={`w-[58px] h-[58px] rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_4px_18px_rgba(37,211,102,0.48)] hover:shadow-[0_6px_22px_rgba(37,211,102,0.60)] transition-all duration-300 transform active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-400/30 ${
          isOpen ? 'scale-100 rotate-90' : 'hover:scale-105 rotate-0'
        }`}
      >
        {isOpen ? (
          /* Bold White Close "X" Icon */
          <svg
            className="w-7 h-7 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          /* Authentic WhatsApp Icon */
          <svg
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.002 2C8.28 2 2 8.28 2 16.002c0 2.652.738 5.13 2.019 7.247L2 30l6.938-1.977A13.93 13.93 0 0016.002 30C23.723 30 30 23.723 30 16.002 30 8.28 23.723 2 16.002 2zm0 25.438c-2.316 0-4.484-.668-6.326-1.825l-.453-.284-4.688 1.336 1.353-4.57-.31-.476a11.374 11.374 0 01-1.978-6.617c0-6.31 5.132-11.442 11.442-11.442 6.31 0 11.442 5.132 11.442 11.442 0 6.31-5.132 11.436-11.482 11.436zm6.275-8.567c-.344-.173-2.036-1.006-2.352-1.121-.315-.116-.545-.173-.775.173-.23.344-.888 1.121-1.088 1.35-.2.23-.401.258-.745.086-.344-.172-1.455-.536-2.772-1.71-1.025-.913-1.718-2.04-1.919-2.385-.2-.344-.021-.53.151-.702.155-.155.344-.401.516-.602.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.775-1.868-1.062-2.558-.28-.671-.564-.58-.775-.59-.2-.01-.43-.014-.66-.014-.23 0-.602.086-.917.43-.316.344-1.206 1.177-1.206 2.87 0 1.693 1.235 3.33 1.407 3.56.172.23 2.43 3.71 5.885 5.2 3.456 1.49 3.456.994 4.086.936.63-.057 2.036-.832 2.323-1.636.287-.803.287-1.492.201-1.636-.086-.143-.316-.23-.66-.402z" />
          </svg>
        )}
      </button>
    </div>
  );
};
