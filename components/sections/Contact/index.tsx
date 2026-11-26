'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContactSectionData } from '../../types';

export default function Contact({ data }: { data: ContactSectionData }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>(
    data.form.services_options?.[0] || 'Personal Banking'
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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      setFormData((prev) => ({
        ...prev,
        phone: numbersOnly,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitted(false), 7000);
    }, 800);
  };

  return (
    <section id={data.id} className="relative overflow-hidden bg-gradient-to-b from-[#fafdf8] via-white to-[#fafdf8] py-12 lg:py-16">
      {/* Background Decorative Radial Glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-[#8ec641]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#0a3322]/5 blur-3xl" />

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

        {/* Dual-Card Executive Contact Suite */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 max-w-[1200px] mx-auto items-stretch">
          {/* Left Column: Forest Green Executive Advisory Hub */}
          <motion.div
            className="relative flex flex-col justify-between overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0a3322] via-[#08281a] to-[#04170e] p-7 sm:p-9 text-white border border-[#8ec641]/20 shadow-[0_10px_35px_rgba(10,51,34,0.12)] hover:shadow-none transition-all lg:col-span-5"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#8ec641]/15 blur-2xl" />

            <div>
              {/* Top Priority Badge */}
              {data.info.badge && (
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8ec641] border border-[#8ec641]/30 backdrop-blur-md mb-6">
                  <span className="h-2 w-2 rounded-full bg-[#8ec641] animate-pulse" />
                  <span>{data.info.badge}</span>
                </div>
              )}

              <h3 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white leading-snug">
                {data.info.card_title || 'Dedicated Concierge & Wealth Advisory'}
              </h3>

              <p className="mt-2.5 text-[14px] leading-relaxed text-emerald-100/70">
                {data.info.card_subtitle || 'Connect directly with our senior bankers to discuss customized credit, asset portfolios, or corporate treasury.'}
              </p>

              {/* Contact Info List */}
              <div className="mt-8 space-y-6">
                {/* Global HQ Address */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8ec641] border border-white/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#8ec641]">
                      {data.info.address_title}
                    </h4>
                    <p className="mt-1 text-[14px] leading-relaxed text-slate-200">
                      {data.info.address}
                    </p>
                    {data.info.hours && (
                      <p className="mt-1 text-[12px] text-emerald-200/60">
                        {data.info.hours}
                      </p>
                    )}
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8ec641] border border-white/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#8ec641]">
                      {data.info.phone_title}
                    </h4>
                    <a
                      href={data.info.phone_href}
                      className="mt-1 block text-[15px] font-semibold text-white hover:text-[#8ec641] transition-colors"
                    >
                      {data.info.phone}
                    </a>
                    <span className="text-[11.5px] text-emerald-200/60">
                      {data.info.phone_note || 'Available 24/7 for Global Clients'}
                    </span>
                  </div>
                </div>

                {/* Concierge Email */}
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8ec641] border border-white/10">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#8ec641]">
                      {data.info.email_title}
                    </h4>
                    <a
                      href={data.info.email_href}
                      className="mt-1 block text-[15px] font-semibold text-white hover:text-[#8ec641] transition-colors"
                    >
                      {data.info.email}
                    </a>
                    <span className="text-[11.5px] text-emerald-200/60">
                      {data.info.email_note || 'Response within 15 minutes'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Security Assurance Pill */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-2 text-[12px] text-emerald-100/70">
              <svg className="h-4 w-4 text-[#8ec641] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>{data.info.security_note || '256-Bit SSL Encrypted • Strict Banking Confidentiality'}</span>
            </div>
          </motion.div>

          {/* Right Column: Sleek Advisory Request Suite */}
          <motion.div
            className="flex flex-col justify-between rounded-[26px] border border-[#8ec641]/30 bg-white p-7 sm:p-9 shadow-[0_8px_30px_rgba(10,51,34,0.05)] hover:shadow-none transition-all lg:col-span-7"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div>
              <div className="mb-6">
                <h3 className="text-[21px] sm:text-[23px] font-bold text-[#0a3322] tracking-tight">
                  {data.form.form_title || 'Request a Confidential Consultation'}
                </h3>
                <p className="mt-1 text-[14px] text-slate-500">
                  {data.form.form_subtitle || 'Please provide your details below. A dedicated financial officer will contact you.'}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-gradient-to-b from-[#f2faf0] to-[#e8f7e4] border border-[#8ec641]/40 p-8 text-center my-6">
                  <div className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#8ec641] text-[#051c12] shadow-sm">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-[#0a3322]">
                    {data.form.success_title || 'Request Submitted Successfully'}
                  </h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#0a3322]/80 max-w-[460px] mx-auto">
                    {data.form.success_message}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {/* Service Topic Selection: Custom Luxury Dropdown on Mobile (<sm), Pills on Desktop (>=sm) */}
                  {data.form.services_options && data.form.services_options.length > 0 && (
                    <div ref={dropdownRef} className="relative">
                      <label
                        className="block text-[12.5px] font-bold uppercase tracking-wider text-[#0a3322] mb-2"
                      >
                        {data.form.services_label || 'Select Service Area'}
                      </label>

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
                            <span className="font-semibold text-[#0a3322]">{selectedService}</span>
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
                                {data.form.services_options.map((service) => {
                                  const isSelected = selectedService === service;
                                  return (
                                    <button
                                      key={service}
                                      type="button"
                                      onClick={() => {
                                        setSelectedService(service);
                                        setDropdownOpen(false);
                                      }}
                                      className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-[14px] text-left transition-all duration-150 ${
                                        isSelected
                                          ? 'bg-[#0a3322] text-[#8ec641] font-bold shadow-sm'
                                          : 'text-slate-700 hover:bg-[#f2faf0] hover:text-[#0a3322] font-medium'
                                      }`}
                                    >
                                      <span>{service}</span>
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
                      <div className="hidden sm:flex flex-wrap gap-2">
                        {data.form.services_options.map((service) => {
                          const isSelected = selectedService === service;
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => setSelectedService(service)}
                              className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 border ${
                                isSelected
                                  ? 'bg-[#0a3322] text-[#8ec641] border-[#0a3322] shadow-sm'
                                  : 'bg-[#fafdf8] text-slate-600 border-slate-200 hover:border-[#8ec641] hover:text-[#0a3322]'
                              }`}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder={data.form.first_name_placeholder}
                        className="w-full rounded-xl border border-slate-200/90 bg-[#fafdf8] px-4 py-3 text-[14px] text-[#0a3322] outline-none transition-all placeholder:text-slate-400 focus:border-[#8ec641] focus:bg-white focus:ring-2 focus:ring-[#8ec641]/20"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder={data.form.last_name_placeholder}
                        className="w-full rounded-xl border border-slate-200/90 bg-[#fafdf8] px-4 py-3 text-[14px] text-[#0a3322] outline-none transition-all placeholder:text-slate-400 focus:border-[#8ec641] focus:bg-white focus:ring-2 focus:ring-[#8ec641]/20"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject Fields */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                          if (
                            [
                              'Backspace',
                              'Delete',
                              'Tab',
                              'Escape',
                              'Enter',
                              'ArrowLeft',
                              'ArrowRight',
                              'Home',
                              'End',
                            ].includes(e.key) ||
                            e.ctrlKey ||
                            e.metaKey
                          ) {
                            return;
                          }
                          if (!/^[0-9]$/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        placeholder={data.form.phone_placeholder}
                        className="w-full rounded-xl border border-slate-200/90 bg-[#fafdf8] px-4 py-3 text-[14px] text-[#0a3322] outline-none transition-all placeholder:text-slate-400 focus:border-[#8ec641] focus:bg-white focus:ring-2 focus:ring-[#8ec641]/20"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={data.form.subject_placeholder}
                        className="w-full rounded-xl border border-slate-200/90 bg-[#fafdf8] px-4 py-3 text-[14px] text-[#0a3322] outline-none transition-all placeholder:text-slate-400 focus:border-[#8ec641] focus:bg-white focus:ring-2 focus:ring-[#8ec641]/20"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={data.form.message_placeholder}
                      className="w-full rounded-xl border border-slate-200/90 bg-[#fafdf8] px-4 py-3 text-[14px] text-[#0a3322] outline-none transition-all placeholder:text-slate-400 focus:border-[#8ec641] focus:bg-white focus:ring-2 focus:ring-[#8ec641]/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8ec641] via-[#95cc4b] to-[#78b02f] px-8 py-3.5 text-[14.5px] font-bold text-[#051c12] shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <svg className="h-4 w-4 animate-spin text-[#051c12]" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>{data.form.submit_loading || 'Transmitting Request...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{data.form.submit_button}</span>
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
