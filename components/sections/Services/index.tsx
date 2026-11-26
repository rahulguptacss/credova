'use client';

import { motion } from 'framer-motion';
import type { ServicesSectionData } from '../../types';

function renderServiceIcon(icon: string) {
  switch (icon) {
    case 'bank':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M12 3l9 7H3l9-7z" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'coins':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'credit-card':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    case 'chart':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'shield':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'trending-up':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      );
    case 'mobile':
    default:
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
  }
}

export default function Services({ data }: { data: ServicesSectionData }) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const headerOffset = 84;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id={data.id} className="relative overflow-hidden bg-[#fafdf8] py-12 lg:py-16">
      {/* Background Decorative Radial Glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8ec641]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#0a3322]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto mb-9">
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

          <p className="mt-3.5 text-[15px] leading-relaxed text-slate-500 sm:text-[16px]">
            {data.subtitle}
          </p>
        </div>

        {/* 8 Services Grid: Compact Cards in Logo Brand Green Palette */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[22px] sm:rounded-[24px] border border-[#8ec641]/40 bg-white p-5 sm:p-6 shadow-[0_4px_16px_rgba(10,51,34,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8ec641] hover:shadow-none cursor-pointer min-h-[190px] sm:min-h-[200px]"
              onClick={scrollToContact}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              {/* Subtle Ambient Hover Sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f5fbf2] via-white to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                {/* Top Row: Icon Container with Soft Sage/Mint Background */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f8ee] border border-[#d2edbe] text-[#0a3322] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#8ec641] group-hover:text-[#051c12] group-hover:border-[#8ec641]">
                    {renderServiceIcon(service.icon)}
                  </div>
                </div>

                {/* Service Title in Forest Green */}
                <h3 className="text-[18px] sm:text-[19px] font-bold tracking-tight text-[#0a3322] group-hover:text-[#72a628] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-slate-600 line-clamp-3">
                  {service.description}
                </p>
              </div>

              {/* Signature Bottom-Right Angled Lime Corner Tab */}
              <div className="absolute bottom-0 right-0 h-7 w-7 overflow-hidden pointer-events-none z-20">
                <svg
                  viewBox="0 0 32 32"
                  className="w-full h-full fill-[#8ec641] transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M 0 32 L 32 0 L 32 32 Z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
