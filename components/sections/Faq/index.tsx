'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FaqSectionData } from '../../types';

export default function Faq({ data }: { data: FaqSectionData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>(
    data.categories?.[0] || 'All Questions'
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Filter items by category
  const filteredItems = data.items.filter((item) => {
    if (activeCategory === 'All Questions' || !activeCategory) return true;
    return item.category === activeCategory;
  });

  const midpoint = Math.ceil(filteredItems.length / 2);
  const leftCol = filteredItems.slice(0, midpoint);
  const rightCol = filteredItems.slice(midpoint);

  return (
    <section id={data.id} className="relative overflow-hidden bg-white py-12 lg:py-16">
      {/* Background Decorative Radial Glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8ec641]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#0a3322]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[740px] mx-auto mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[2px] w-6 bg-[#72a628]" />
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#72a628] sm:text-[13px]">
              {data.eyebrow}
            </p>
            <span className="h-[2px] w-6 bg-[#72a628]" />
          </div>

          <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[#0a3322] sm:text-[38px] lg:text-[42px]">
            {data.title}{' '}
            <span className="text-[#72a628]">{data.title_highlight}</span>
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-slate-500 sm:text-[16px]">
            {data.subtitle}
          </p>

          {/* Category Filter: Custom Luxury Dropdown on Mobile (<sm), Pills on Desktop (>=sm) */}
          {data.categories && data.categories.length > 0 && (
            <div ref={dropdownRef} className="mt-8 relative max-w-[340px] mx-auto sm:max-w-none">
              {/* Custom Luxury Mobile Dropdown (< sm) */}
              <div className="relative sm:hidden">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((v) => !v)}
                  aria-expanded={dropdownOpen}
                  className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-[14px] font-medium text-[#0a3322] transition-all duration-200 outline-none ${
                    dropdownOpen
                      ? 'border-[#8ec641] bg-white ring-2 ring-[#8ec641]/25 shadow-sm'
                      : 'border-slate-200/90 bg-[#fafdf8] hover:border-[#8ec641]/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#8ec641] ring-2 ring-[#8ec641]/30" />
                    <span className="font-semibold text-[#0a3322]">{activeCategory}</span>
                  </div>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-lg transition-transform duration-200 ${
                      dropdownOpen
                        ? 'rotate-180 text-[#72a628]'
                        : 'text-slate-400'
                    }`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden rounded-2xl border border-[#8ec641]/35 bg-white p-1.5 shadow-[0_12px_36px_rgba(10,51,34,0.14)]"
                    >
                      <div className="space-y-1">
                        {data.categories.map((category) => {
                          const isSelected = activeCategory === category;
                          return (
                            <button
                              key={category}
                              type="button"
                              onClick={() => {
                                setActiveCategory(category);
                                setOpenIndex(0);
                                setDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] text-left transition-all duration-150 ${
                                isSelected
                                  ? 'bg-[#0a3322] text-[#8ec641] font-bold shadow-sm'
                                  : 'text-slate-700 hover:bg-[#f2faf0] hover:text-[#0a3322] font-medium'
                              }`}
                            >
                              <span>{category}</span>
                              {isSelected && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8ec641]/20 text-[#8ec641]">
                                  <svg className="h-3 w-3 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Pills (>= sm) */}
              <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
                {data.categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        setOpenIndex(0);
                      }}
                      className={`rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all duration-200 border ${
                        isActive
                          ? 'bg-[#0a3322] text-[#8ec641] border-[#0a3322] shadow-sm'
                          : 'bg-[#fafdf8] text-slate-600 border-slate-200 hover:border-[#8ec641] hover:text-[#0a3322]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2-Column Accordion Layout */}
        <div className="grid gap-5 lg:grid-cols-2 max-w-[1200px] mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftCol.map((faq, i) => {
              const actualIndex = i;
              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={`${faq.question}-${actualIndex}`}
                  className={`overflow-hidden rounded-[20px] border transition-all duration-300 hover:shadow-none ${
                    isOpen
                      ? 'border-[#8ec641] bg-white ring-1 ring-[#8ec641]/25'
                      : 'border-slate-200/90 bg-[#fafdf8] hover:border-[#8ec641]/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(actualIndex)}
                    className="flex w-full items-start justify-between p-5 sm:p-6 text-left transition-colors"
                  >
                    <div className="pr-4">
                      {faq.category && (
                        <span className="inline-block rounded-md bg-[#8ec641]/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#72a628] border border-[#8ec641]/25 mb-2">
                          {faq.category}
                        </span>
                      )}
                      <h3 className={`text-[15.5px] sm:text-[16.5px] font-bold leading-snug transition-colors ${
                        isOpen ? 'text-[#72a628]' : 'text-[#0a3322]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#8ec641] text-[#051c12] rotate-180'
                          : 'bg-[#f0f8ee] text-[#0a3322] border border-[#d2edbe]'
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        {isOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        )}
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[14px] leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightCol.map((faq, i) => {
              const actualIndex = midpoint + i;
              const isOpen = openIndex === actualIndex;

              return (
                <div
                  key={`${faq.question}-${actualIndex}`}
                  className={`overflow-hidden rounded-[20px] border transition-all duration-300 hover:shadow-none ${
                    isOpen
                      ? 'border-[#8ec641] bg-white ring-1 ring-[#8ec641]/25'
                      : 'border-slate-200/90 bg-[#fafdf8] hover:border-[#8ec641]/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(actualIndex)}
                    className="flex w-full items-start justify-between p-5 sm:p-6 text-left transition-colors"
                  >
                    <div className="pr-4">
                      {faq.category && (
                        <span className="inline-block rounded-md bg-[#8ec641]/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#72a628] border border-[#8ec641]/25 mb-2">
                          {faq.category}
                        </span>
                      )}
                      <h3 className={`text-[15.5px] sm:text-[16.5px] font-bold leading-snug transition-colors ${
                        isOpen ? 'text-[#72a628]' : 'text-[#0a3322]'
                      }`}>
                        {faq.question}
                      </h3>
                    </div>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#8ec641] text-[#051c12] rotate-180'
                          : 'bg-[#f0f8ee] text-[#0a3322] border border-[#d2edbe]'
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        {isOpen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        )}
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[14px] leading-relaxed text-slate-600 border-t border-slate-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Concierge Support Banner */}
        {data.support_box && (
          <div className="mt-14 max-w-[1080px] mx-auto rounded-[24px] bg-gradient-to-r from-[#0a3322] via-[#08291c] to-[#0a3322] p-6 sm:p-8 text-white border border-[#8ec641]/25 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_30px_rgba(10,51,34,0.1)] hover:shadow-none transition-all">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#8ec641] border border-white/10">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-[17px] font-bold text-white">
                  {data.support_box.title}
                </h4>
                <p className="mt-1 text-[13.5px] text-emerald-100/70 max-w-[540px]">
                  {data.support_box.subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={scrollToContact}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#8ec641] via-[#95cc4b] to-[#78b02f] px-6 py-3 text-[14px] font-bold text-[#051c12] shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>{data.support_box.button_text}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
