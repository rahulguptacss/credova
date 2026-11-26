'use client';

import { motion } from 'framer-motion';
import type { TeamSectionData } from '../../types';

export default function Team({ data }: { data: TeamSectionData }) {
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

  return (
    <section id={data.id} className="relative overflow-hidden bg-gradient-to-b from-[#fbfdfa] via-white to-[#fbfdfa] py-12 lg:py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#8ec641]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-[#0a3322]/5 blur-3xl" />

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

        {/* 3 Distinct Compact Executive Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1140px] mx-auto">
          {data.members.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative flex flex-col justify-between rounded-[22px] border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-[0_4px_18px_rgba(10,51,34,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8ec641] hover:shadow-none"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              {/* Top: Compact Capsule Portrait with Badges & Hover Controls */}
              <div className="relative aspect-[4/3.1] w-full overflow-hidden rounded-[16px] bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-600 ease-out group-hover:scale-105"
                />

                {/* Ambient vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a3322]/80 via-[#0a3322]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Top-Left Floating Status/Exp Pill */}
                {member.experience && (
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5 rounded-full border border-white/60 bg-white/95 px-2.5 py-0.5 shadow-sm backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8ec641] animate-pulse" />
                    <span className="text-[10.5px] font-bold text-[#0a3322]">
                      {member.experience}
                    </span>
                  </div>
                )}

                {/* Slide-Up Hover Social Bar */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-center gap-2 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#0a3322] shadow hover:bg-[#8ec641] hover:text-[#051c12] transition-colors"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.65 1.66 1.66 0 0 0 1.66-1.65 1.65 1.65 0 0 0-1.66-1.66Z" />
                      </svg>
                    </a>
                  )}

                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#0a3322] shadow hover:bg-[#8ec641] hover:text-[#051c12] transition-colors"
                    >
                      <svg className="h-3.5 w-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  )}

                  <button
                    onClick={scrollToContact}
                    className="flex h-8 items-center gap-1.5 rounded-full bg-[#8ec641] px-2.5 text-[10.5px] font-bold text-[#051c12] shadow hover:bg-[#a1dc52] transition-colors"
                  >
                    <span>{data.book_meet_text || 'Connect'}</span>
                    <svg className="h-2.5 w-2.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Middle: Name, Role & Specialty Details */}
              <div className="mt-3 px-1">
                {member.specialty && (
                  <span className="inline-block rounded-md bg-[#8ec641]/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0a3322] border border-[#8ec641]/30 mb-1.5">
                    {member.specialty}
                  </span>
                )}

                <h3 className="text-[18px] sm:text-[19px] font-bold text-[#0a3322] tracking-tight transition-colors group-hover:text-[#72a628]">
                  {member.name}
                </h3>

                <p className="mt-0.5 text-[13px] font-semibold text-[#72a628]">
                  {member.role}
                </p>

                {member.bio && (
                  <p className="mt-1.5 text-[12.5px] leading-snug text-slate-500 line-clamp-1">
                    {member.bio}
                  </p>
                )}
              </div>

              {/* Bottom: Schedule Advisory Action Row */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100">
                <button
                  onClick={scrollToContact}
                  className="w-full flex items-center justify-between text-[12.5px] font-bold text-[#0a3322] transition-colors group-hover:text-[#72a628]"
                >
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8ec641]" />
                    {data.schedule_consult_text || 'Schedule Consultation'}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0f8ee] text-[#0a3322] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#8ec641] group-hover:text-[#051c12]">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
