'use client';

import React, { useState } from 'react';

const FAQ = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <section className='py-12'>
      <div className='mx-auto max-w-3xl px-4'>
        <h2 className='mb-10 text-center text-4xl font-extrabold text-white'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-6'>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className='rounded-xl bg-[#232323] shadow-lg transition-all duration-300'
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className='flex w-full items-center justify-between px-8 py-5 text-left focus:outline-none'
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className='font-semibold text-white md:text-lg'>
                    {faq.question}
                  </span>
                  <span className='ml-4 text-3xl text-white select-none'>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'max-h-40 px-8 pb-7 opacity-100'
                      : 'max-h-0 px-8 pb-0 opacity-0'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p className='text-lg text-gray-400'>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
