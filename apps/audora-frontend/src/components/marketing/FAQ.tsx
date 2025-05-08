'use client';

import React, { useState } from 'react';

const faqs = [
  {
    question: 'How many guests can I host at my webinar?',
    answer:
      'You can host and record up to 10 guest speakers in a Riverside webinar.',
  },
  {
    question: 'How many audience members can watch the recording session?',
    answer:
      'Up to 10,000 audience members can join to watch a live webinar session. You can also multi-stream your webinar to different social media channels, making your audience size practically limitless.',
  },
  {
    question:
      'Will my guests and viewers need to download an app and/or open an account?',
    answer:
      'No, guests and viewers can join directly from their browser without any downloads or account creation.',
  },
  {
    question: 'What audio and video quality does Riverside livestream in?',
    answer:
      'Riverside live-streams in up to 1080p HD video and high-quality audio.',
  },
  {
    question: 'What audio and video quality does Riverside record in?',
    answer:
      'Riverside records locally in up to 4K video and uncompressed audio for each participant.',
  },
  {
    question: "What's the advantage of separate recording tracks?",
    answer:
      "Separate tracks give you more flexibility in post-production, allowing you to edit each speaker's audio and video independently.",
  },
  {
    question:
      'How do I access my guest recordings? Will they need to send them to me?',
    answer:
      'All recordings are automatically uploaded and available in your dashboard. Guests do not need to send files manually.',
  },
  {
    question: 'Can I brand my webinars the way I want?',
    answer:
      'Yes, you can fully brand your webinars with your own logos, colors, and layouts.',
  },
  {
    question: 'Can I repurpose my webinars for different platforms?',
    answer:
      'Absolutely! You can edit and export your recordings in various formats and aspect ratios for any platform.',
  },
  {
    question: 'Would it be easy for my team to collaborate?',
    answer:
      'Yes, your team can collaborate in real-time, manage guests, and access recordings together.',
  },
  {
    question: 'What is the best webinar software?',
    answer:
      'The best webinar software is one that fits your needs for quality, scalability, and ease of use. Our platform is designed to deliver all three.',
  },
  {
    question: 'Is there a free webinar platform?',
    answer:
      'Yes, we offer a free plan so you can get started without any cost.',
  },
  {
    question: 'How much does it cost to set up a webinar?',
    answer:
      'You can start for free, and upgrade as your needs grow. See our pricing page for details.',
  },
  {
    question: 'What is a webinar?',
    answer:
      'A webinar is an online seminar or presentation, allowing you to connect with a large audience in real time over the internet.',
  },
];

const FAQ = () => {
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
