'use client';

import { motion } from 'framer-motion';
import type { WhyChooseUsSectionData } from '../../types';

function renderWhyIcon(icon: string) {
  switch (icon) {
    case 'shield-check':
      return (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case 'layers':
      return (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case 'trending':
    default:
      return (
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
  }
}

export default function WhyChooseUs({ data }: { data: WhyChooseUsSectionData }) {
  return (
    <section id={data.id} className="relative overflow-hidden bg-white py-12 lg:py-16">
      {/* Background Subtle Pattern */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8ec641]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-[#0a3322]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[740px] mx-auto mb-9">
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
        </div>

        {/* 4 Feature Pillars: Elevated Luxury Fintech Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-[#8ec641]/35 bg-gradient-to-b from-white via-white to-[#f7fbf5] p-7 shadow-[0_4px_20px_rgba(10,51,34,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-[#8ec641] hover:shadow-none"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8ec641] via-[#b5ea74] to-[#72a628] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Top Row: Icon Badge & Optional Feature Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0a3322] text-[#8ec641] shadow-md transition-all duration-300 group-hover:scale-105">
                    {renderWhyIcon(item.icon)}
                  </div>

                  {item.badge && (
                    <span className="rounded-full bg-[#8ec641]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0a3322] border border-[#8ec641]/25">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-[19px] sm:text-[20px] font-bold text-[#0a3322] group-hover:text-[#72a628] transition-colors leading-snug tracking-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>

              {/* Bottom Standard Guarantee Pill */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#0a3322]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#8ec641]/20 text-[#72a628]">
                  <svg className="h-2.5 w-2.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-slate-500 text-[11.5px]">{item.guarantee_text || data.default_guarantee || 'Credova Certified'}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
