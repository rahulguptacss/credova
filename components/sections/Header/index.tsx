'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HeaderData } from '../../types';

export default function Header({ data }: { data: HeaderData }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(data.links[0]?.href ?? '#home');
  const [scrolled, setScrolled] = useState(false);
  const isClickScrolling = useRef(false);

  const scrollTo = (href: string) => {
    setActive(href);
    isClickScrolling.current = true;
    setOpen(false);

    const id = href.replace('#', '');
    const headerOffset = 80;

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const scrollY = window.scrollY;
        setScrolled(scrollY > 30);

        if (isClickScrolling.current) return;

        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= docHeight - 80) {
          const lastLink = data.links[data.links.length - 1];
          if (lastLink) {
            setActive(lastLink.href);
            return;
          }
        }

        const headerOffset = 110;
        let current = data.links[0]?.href ?? '#home';
        for (const link of data.links) {
          const section = document.getElementById(link.href.replace('#', ''));
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerOffset) {
              current = link.href;
            }
          }
        }
        setActive(current);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [data.links]);

  return (
    <>
      {/* ========================================================= */}
      {/* 1. TOP UTILITY STRIP (Deep Forest Green Palette)          */}
      {/* ========================================================= */}
      <div className="relative z-40 bg-[#051c12] text-slate-300 text-[11px] sm:text-[12px] border-b border-[#8ec641]/25 py-2 sm:py-2.5">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
          {/* Left info: Mobile Email (< sm), Location & Hours on tablet/desktop */}
          <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-0.5">
            {/* Email visible on Mobile (< sm) */}
            {data.top_bar?.email && (
              <a
                href={data.top_bar.email_href || `mailto:${data.top_bar.email}`}
                className="flex sm:hidden items-center gap-1.5 text-slate-300 hover:text-[#8ec641] transition-colors text-[11px] truncate"
              >
                <svg className="h-3 w-3 text-[#8ec641] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{data.top_bar.email}</span>
              </a>
            )}

            {data.top_bar?.address && (
              <div className="hidden md:flex items-center gap-1.5 text-slate-300">
                <svg className="h-3.5 w-3.5 text-[#8ec641] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="whitespace-nowrap">{data.top_bar.address}</span>
              </div>
            )}

            {data.top_bar?.hours && (
              <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                <svg className="h-3.5 w-3.5 text-[#8ec641] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="whitespace-nowrap">{data.top_bar.hours}</span>
              </div>
            )}
          </div>

          {/* Right info: Phone & Desktop Email */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs shrink-0">
            {data.top_bar?.email && (
              <a
                href={data.top_bar.email_href || `mailto:${data.top_bar.email}`}
                className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-[#8ec641] transition-colors"
              >
                <svg className="h-3.5 w-3.5 text-[#8ec641]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{data.top_bar.email}</span>
              </a>
            )}

            <a
              href={data.top_bar?.phone_href || data.phone_href}
              className="flex items-center gap-1 sm:gap-1.5 font-semibold text-[#8ec641] hover:text-white transition-colors"
            >
              <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#8ec641]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{data.top_bar?.phone || data.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN NAVBAR (Crisp Clean White & Forest Green/Lime)    */}
      {/* ========================================================= */}
      <header
        className={`sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md transition-shadow duration-200 ${
          scrolled
            ? 'shadow-[0_4px_20px_rgba(7,38,24,0.08)] border-b border-emerald-50'
            : 'shadow-[0_1px_0_rgba(0,0,0,0.04)] border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] sm:h-[76px] max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo & Tag Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#home');
              }}
              className="flex items-center gap-2 shrink-0 group"
            >
              <img
                src={data.logo}
                alt={data.logo_text}
                className="h-11 sm:h-[52px] lg:h-[56px] max-h-[58px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1.5 rounded-full bg-slate-50/90 p-1.5 border border-slate-200/70">
            {data.links.map((link) => {
              const on = active === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-semibold transition-all duration-150 ${
                    on
                      ? 'bg-[#0a3322] text-[#8ec641] shadow-sm'
                      : 'text-slate-600 hover:text-[#0a3322] hover:bg-white'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Direct Phone & Request a Call CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={data.phone_href}
              className="hidden 2xl:flex items-center gap-2.5 text-left"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a3322]/5 text-[#8ec641] ring-1 ring-[#8ec641]/40">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div>
                <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Direct Line
                </span>
                <span className="block text-[13px] font-bold text-[#0a3322]">
                  {data.phone}
                </span>
              </div>
            </a>

            <a
              href={data.button_href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(data.button_href);
              }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8ec641] via-[#95cc4b] to-[#78b02f] px-6 py-2.5 text-[14px] font-bold text-[#051c12] shadow-[0_4px_16px_rgba(142,198,65,0.35)] hover:shadow-[0_6px_22px_rgba(142,198,65,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              <span>{data.button_text}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#051c12]/10 group-hover:translate-x-0.5 transition-transform">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </div>

          {/* Mobile Actions: CTA + Hamburger */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={data.button_href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(data.button_href);
              }}
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#8ec641] to-[#78b02f] px-3.5 py-1.5 text-[12px] font-bold text-[#051c12] shadow-sm sm:text-[13px]"
            >
              {data.button_text}
            </a>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-[#0a3322] hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <motion.span
                  className="absolute left-0 h-[2.5px] w-5 rounded-full bg-[#0a3322]"
                  animate={{ top: open ? 7 : 0, rotate: open ? 45 : 0 }}
                />
                <motion.span
                  className="absolute left-0 top-[7px] h-[2.5px] w-5 rounded-full bg-[#0a3322]"
                  animate={{ opacity: open ? 0 : 1 }}
                />
                <motion.span
                  className="absolute left-0 h-[2.5px] w-5 rounded-full bg-[#0a3322]"
                  animate={{ top: open ? 7 : 14, rotate: open ? -45 : 0 }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 3. MOBILE MENU (Drawer in Brand Colors)                   */}
      {/* ========================================================= */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[#051c12]/60 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto xl:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                  <img
                    src={data.logo}
                    alt={data.logo_text}
                    className="h-10 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                    aria-label="Close Menu"
                  >
                    ✕
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  {data.links.map((link) => {
                    const on = active === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(link.href);
                        }}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-semibold transition-all ${
                          on
                            ? 'bg-[#0a3322] text-[#8ec641]'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{link.name}</span>
                        {on && (
                          <span className="h-2 w-2 rounded-full bg-[#8ec641]" />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <a
                  href={data.button_href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(data.button_href);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8ec641] to-[#78b02f] py-3.5 text-[15px] font-bold text-[#051c12] shadow-md"
                >
                  {data.button_text}
                </a>

                <div className="rounded-xl bg-emerald-50/50 p-4 border border-emerald-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0a3322] font-bold">Phone:</span>
                    <a href={data.phone_href} className="font-semibold text-[#0a3322]">
                      {data.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0a3322] font-bold">Email:</span>
                    <a href={`mailto:${data.top_bar?.email || 'contact@credova.com'}`} className="text-slate-600">
                      {data.top_bar?.email || 'contact@credova.com'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
