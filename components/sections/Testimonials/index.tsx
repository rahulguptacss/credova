'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { TestimonialsSectionData, TestimonialItem } from '../../types';

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="group relative flex h-full flex-col justify-between rounded-[24px] border border-slate-200/90 bg-[#fafdf8] p-6 sm:p-7 shadow-[0_4px_18px_rgba(10,51,34,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#8ec641] hover:bg-white hover:shadow-none">
      {/* Top Row: 5 Stars Score & Category Badge */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5 text-[#8ec641]">
              {[...Array(item.rating)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[12px] font-bold text-[#0a3322]">
              5.0
            </span>
          </div>

          {item.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#8ec641]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#0a3322] border border-[#8ec641]/25">
              <svg className="h-3 w-3 text-[#72a628]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item.badge}
            </span>
          )}
        </div>

        {/* Impact Result Pill */}
        {item.highlight_metric && (
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#f0f9eb] to-[#e4f5dc] px-3 py-1 text-[11.5px] font-bold text-[#0a3322] border border-[#8ec641]/30">
            <span className="text-[#72a628]">📈</span>
            <span>{item.highlight_metric}</span>
          </div>
        )}

        {/* Quote Body */}
        <div className="relative">
          <p className="text-[14px] leading-relaxed text-slate-600 italic">
            &ldquo;{item.quote}&rdquo;
          </p>
        </div>
      </div>

      {/* Author Footer Card */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={item.avatar}
              alt={item.name}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-[#8ec641]"
            />
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#8ec641] ring-2 ring-white" />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#0a3322] group-hover:text-[#72a628] transition-colors leading-snug">
              {item.name}
            </h4>
            <p className="text-[12px] font-medium text-slate-500">
              {item.role}
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#72a628] hidden sm:inline-block">
          Verified ✓
        </span>
      </div>
    </div>
  );
}

export default function Testimonials({ data }: { data: TestimonialsSectionData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide and controls condition: ONLY when more than 3 items
  const shouldSlide = data.items.length > 3;

  // Responsive cards per view (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = shouldSlide ? Math.max(0, data.items.length - cardsPerView) : 0;

  // Re-clamp index if screen size changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Auto-slide timer: ONLY active when > 3 items and not hovered
  useEffect(() => {
    if (!shouldSlide || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [shouldSlide, isPaused, maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id={data.id} className="relative overflow-hidden bg-white py-12 lg:py-16">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#8ec641]/10 blur-3xl" />
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

          <p className="mt-3.5 text-[15px] leading-relaxed text-slate-500 sm:text-[16px]">
            {data.subtitle}
          </p>

          {/* Trust Score Header Pill */}
          {(data.overall_rating || data.reviews_count) && (
            <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-[#8ec641]/35 bg-[#f5fbf2] px-4 py-1.5 shadow-sm">
              <div className="flex gap-0.5 text-[#8ec641]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {data.overall_rating && (
                <span className="text-[12.5px] font-bold text-[#0a3322]">
                  {data.overall_rating}
                </span>
              )}
              {data.reviews_count && (
                <>
                  <span className="h-3 w-[1px] bg-slate-300" />
                  <span className="text-[12px] font-medium text-slate-600">
                    {data.reviews_count}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Testimonials Container */}
        {shouldSlide ? (
          /* Responsive Auto-Sliding Carousel Track when items > 3 */
          <div
            className="relative overflow-hidden max-w-[1240px] mx-auto py-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex} * ((100% + 24px) / ${cardsPerView})))`,
                gap: '24px',
              }}
            >
              {data.items.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="shrink-0"
                  style={{
                    width: `calc((100% - ${(cardsPerView - 1) * 24}px) / ${cardsPerView})`,
                  }}
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Static Clean Grid when 3 or fewer items */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
            {data.items.map((item) => (
              <div key={item.name} className="h-full">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Carousel Navigation Buttons & Pagination Dots: ONLY shown when items > 3 */}
        {shouldSlide && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0a3322] hover:bg-[#8ec641] hover:text-[#051c12] hover:border-[#8ec641] transition-colors shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-[#8ec641]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0a3322] hover:bg-[#8ec641] hover:text-[#051c12] hover:border-[#8ec641] transition-colors shadow-sm"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
