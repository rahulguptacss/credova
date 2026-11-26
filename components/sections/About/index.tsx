'use client';

import { motion } from 'framer-motion';
import type { AboutSectionData } from '../../types';

export default function About({ data }: { data: AboutSectionData }) {
  return (
    <section id={data.id} className="relative overflow-hidden bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Visual Collage with Experience Badge */}
          <motion.div
            className="relative lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mx-auto max-w-[520px] lg:max-w-none">
              {/* Main Photo: Team Consulting */}
              <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                <img
                  src={data.image_team}
                  alt="Financial Advisory Team"
                  className="h-[280px] sm:h-[340px] w-full object-cover"
                />
              </div>

              {/* Secondary Overlapping Photo: Handshake */}
              <div className="relative z-20 -mt-16 ml-auto w-3/4 overflow-hidden rounded-2xl border-4 border-white shadow-2xl sm:-mt-20 sm:w-2/3">
                <img
                  src={data.image_handshake}
                  alt="Business Handshake"
                  className="h-[180px] sm:h-[220px] w-full object-cover"
                />
              </div>

              {/* Floating Forest Green & Lime Badge: "25 Years of Excellence" */}
              <div className="absolute -top-4 -right-2 sm:right-6 z-30 flex items-center gap-3.5 rounded-2xl bg-[#0a3322] px-5 py-4 text-white shadow-2xl border border-[#8ec641]/40">
                <span className="text-[36px] font-black leading-none text-[#8ec641] tracking-tight">
                  {data.experience_years}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200 leading-tight max-w-[80px]">
                  {data.experience_text}
                </span>
              </div>

              {/* Subtle Lime Decorative Grid behind photos */}
              <div
                className="pointer-events-none absolute -bottom-6 -left-6 h-36 w-36 opacity-30 z-0"
                style={{
                  backgroundImage:
                    'radial-gradient(#8ec641 1.5px, transparent 1.6px)',
                  backgroundSize: '16px 16px',
                }}
              />
            </div>
          </motion.div>

          {/* Right Column: Content & Checklist */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="h-[2px] w-5 bg-[#72a628]" />
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#72a628] sm:text-[13px]">
                {data.eyebrow}
              </p>
            </div>

            {/* Title */}
            <h2 className="text-[28px] font-bold leading-tight tracking-tight text-[#0a3322] sm:text-[36px] lg:text-[40px]">
              {data.title}{' '}
              <span className="text-[#72a628] block sm:inline">
                {data.title_highlight}
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 text-[15px] leading-relaxed text-slate-600 sm:text-[16px]">
              {data.description}
            </p>

            {/* 4 Feature Checklist Points with Lime Checkmarks */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {data.checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8ec641]/20 text-[#0a3322]">
                    <svg
                      className="h-4 w-4 text-[#72a628]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[14px] font-semibold text-[#0a3322]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle Divider */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                {(data.client_avatars || [
                  '/images/team-priya.webp',
                  '/images/team-daniel.webp',
                  '/images/team-arjun.webp',
                ]).map((avatar, idx) => (
                  <img
                    key={idx}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    src={avatar}
                    alt="Advisor"
                  />
                ))}
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0a3322]">
                  {data.trust_stat_title || 'Trusted by Over 25,000+ Clients Worldwide'}
                </p>
                <p className="text-[12px] text-slate-500">
                  {data.trust_stat_subtitle || 'Dedicated personal bankers and financial planners'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
