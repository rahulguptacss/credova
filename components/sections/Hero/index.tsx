'use client';

import { motion } from 'framer-motion';
import type { HeroSectionData } from '../../types';

export default function Hero({ data }: { data: HeroSectionData }) {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition +
        (window.pageYOffset || document.documentElement.scrollTop) -
        headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id={data.id}
      className="relative overflow-hidden bg-gradient-to-b from-[#04170f] via-[#08281a] to-[#0c3825] text-white pt-10 pb-16 lg:pt-14 lg:pb-24"
    >
      {/* Background Ambient Radial Glows in Logo's Emerald & Lime Tints */}
      <div className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-[#0d4a30]/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-[#8ec641]/15 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/3 bottom-0 h-64 w-96 rounded-full bg-[#8ec641]/10 blur-[100px]" />

      {/* Subtle Dot Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.8) 1.5px, transparent 1.6px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ========================================================= */}
          {/* LEFT CONTENT COLUMN                                       */}
          {/* ========================================================= */}
          <motion.div
            className="text-center lg:text-left lg:col-span-6 xl:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            {/* Eyebrow with Lime Accent Line */}
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-[2px] w-7 rounded-full bg-gradient-to-r from-[#8ec641] to-transparent" />
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#8ec641] sm:text-[13px]">
                {data.eyebrow}
              </p>
              <span className="h-[2px] w-7 rounded-full bg-gradient-to-l from-[#8ec641] to-transparent lg:hidden" />
            </div>

            {/* Headline with Brand Lime Gradient Accent */}
            <h1 className="text-[36px] font-extrabold leading-[1.14] tracking-tight text-white sm:text-[48px] md:text-[56px] lg:text-[54px] xl:text-[62px]">
              {data.title_start}{' '}
              <span className="block sm:inline bg-gradient-to-r from-[#b5ea74] via-[#8ec641] to-[#6ea328] bg-clip-text text-transparent">
                {data.title_highlight}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-slate-300 sm:text-[17px] mx-auto lg:mx-0">
              {data.description}
            </p>

            {/* Dual CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href={data.primary_button_href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(data.primary_button_href);
                }}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#8ec641] via-[#95cc4b] to-[#78b02f] px-8 py-4 text-[15px] font-bold text-[#051c12] shadow-[0_8px_25px_rgba(142,198,65,0.35)] hover:shadow-[0_10px_30px_rgba(142,198,65,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>{data.primary_button_text}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#051c12]/10 group-hover:translate-x-1 transition-transform">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>

              <a
                href={data.secondary_button_href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(data.secondary_button_href);
                }}
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-md hover:border-[#8ec641] hover:bg-[#8ec641]/10 hover:text-[#8ec641] transition-all duration-200"
              >
                {data.secondary_button_text}
              </a>
            </div>

            {/* Quick Benefits Bullet Strip */}
            {data.features_strip && data.features_strip.length > 0 && (
              <div className="mt-9 pt-7 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-[13px] text-slate-300 font-medium">
                {data.features_strip.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8ec641]/20 text-[#8ec641]">
                      ✓
                    </span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT VISUAL COLUMN WITH FLOATING STAT BADGES             */}
          {/* ========================================================= */}
          <motion.div
            className="relative lg:col-span-6 xl:col-span-6"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative mx-auto max-w-[540px] lg:max-w-none">
              {/* Outer Brand Lime Gradient Ring */}
              <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-[#8ec641]/60 via-white/10 to-[#8ec641]/30 blur-md opacity-80" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-[#0a3322] shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={data.image}
                  alt={data.title_start}
                  className="h-[340px] w-full object-cover sm:h-[440px] lg:h-[480px] xl:h-[510px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04170f]/75 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Stat Card 1: 4.9/5 Rating (Bottom Left) */}
              {data.trust_badge && (
                <motion.div
                  className="absolute -bottom-6 -left-3 sm:-left-6 z-20 flex items-center gap-3.5 rounded-2xl bg-[#051c12]/95 p-4 backdrop-blur-xl border border-white/15 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8ec641]/20 text-[#8ec641] font-bold">
                    ★
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-base font-extrabold text-white">
                        {data.trust_badge.rating}
                      </span>
                      <span className="text-[11px] text-[#8ec641]">★★★★★</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-400">
                      {data.trust_badge.rating_text}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Floating Stat Card 2: Assets Protected (Top Right) */}
              {data.trust_badge && (
                <motion.div
                  className="absolute -top-5 -right-3 sm:-right-5 z-20 flex items-center gap-3 rounded-2xl bg-[#0a3322]/95 px-4 py-3 backdrop-blur-xl border border-[#8ec641]/35 shadow-[0_16px_36px_rgba(0,0,0,0.4)]"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8ec641]/20 text-[#8ec641]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white leading-none">
                      {data.trust_badge.stat_value}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider text-slate-300 font-medium mt-1">
                      {data.trust_badge.stat_text}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SIGNATURE LIME / FOREST GREEN SWOOP DIVIDER               */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-14 overflow-hidden pointer-events-none leading-none z-10">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle Lime Arc Stroke matching logo */}
          <path
            d="M0 45 C360 85 820 90 1440 30"
            stroke="url(#limeGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Solid White Base filling into the next section */}
          <path
            d="M0 50 C420 95 900 85 1440 45 L1440 90 L0 90 Z"
            fill="#ffffff"
          />
          <defs>
            <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8ec641" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#b2e86d" stopOpacity="1" />
              <stop offset="100%" stopColor="#0d4a30" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
