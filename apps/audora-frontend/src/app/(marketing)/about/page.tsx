import React from 'react';
import { teamMembers } from '@/data/TeamMember';
import TeamMemberCard from '@/components/about/team-member-card';
import {
  InnovationIcon,
  AccessibilityIcon,
  QualityIcon,
  XIcon,
} from '@/data/icons';
import AboutHeroSection from '@/components/about/about-hero-section';
import siteMetadata from '@/lib/siteMetadata';

const values = [
  {
    title: 'Innovation',
    description:
      "We constantly push the boundaries of what's possible in remote content creation, making it easy to collaborate and record from anywhere.",
    icon: <InnovationIcon />,
  },
  {
    title: 'Accessibility',
    description:
      'Professional-grade recording tools for podcasts, meetings, and more—available to everyone, no matter their experience level.',
    icon: <AccessibilityIcon />,
  },
  {
    title: 'Quality',
    description:
      'Local recording for every participant ensures the best possible audio and video quality, every time.',
    icon: <QualityIcon />,
  },
];

const AboutPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50'>
      <AboutHeroSection />

      <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        {/* Values Section */}
        <section className='mb-24 rounded-3xl bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] px-6 py-20 text-white md:px-12'>
          <div className='mb-10 text-center'>
            <h2 className='relative z-10 inline-block text-3xl font-bold'>
              Our Values
              <span className='mx-auto mt-3 block h-1 w-16 rounded-full bg-gradient-to-r from-[#6965db] to-[#a18fff]'></span>
            </h2>
            <p className='mx-auto mt-4 max-w-xl text-lg font-medium text-gray-400'>
              The principles that drive our mission and shape every experience
              on Audora.
            </p>
          </div>
          <div className='mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3'>
            {values.map((value, index) => (
              <div
                key={index}
                className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-lg backdrop-blur-md transition-all duration-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] before:from-[#a18fff]/40 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100 hover:scale-105 hover:border-transparent hover:bg-white/20 hover:shadow-2xl'
                style={{ minHeight: 340 }}
              >
                <div className='mb-6 flex justify-center'>
                  <span className='relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#6965db] to-[#a18fff] shadow-xl transition-transform duration-300 group-hover:shadow-2xl'>
                    <span className='absolute inset-0 z-0 rounded-full bg-gradient-to-br from-[#a18fff] to-[#6965db] opacity-40 blur-xl'></span>
                    <span className='relative z-10 text-4xl text-white'>
                      {value.icon}
                    </span>
                  </span>
                </div>
                <h3 className='mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#a18fff] md:text-3xl'>
                  {value.title}
                </h3>
                <p className='text-base leading-relaxed font-light text-gray-200 md:text-lg'>
                  {value.description}
                </p>
                {/* Animated gradient border on hover */}
                <span className='group-hover:border-gradient-to-r pointer-events-none absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-300 group-hover:border-[3px] group-hover:from-[#6965db] group-hover:to-[#a18fff]' />
                {/* Subtle noise overlay for texture */}
                <span
                  className='pointer-events-none absolute inset-0 rounded-3xl opacity-10 mix-blend-soft-light'
                  style={{ backgroundImage: 'url("/noise.png")' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className='mb-24'>
          <h2 className='mb-16 text-center text-3xl font-bold text-gray-900'>
            {`Who's Behind Audora?`}
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
                bio={member.bio}
                linkedin={member.linkedin}
                twitter={member.twitter}
              />
            ))}
          </div>
        </section>

        {/* Community Section */}
        <section className='rounded-3xl bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] p-12 text-center text-white'>
          <h2 className='mb-6 text-3xl font-bold'>Join Our Community</h2>
          <p className='mx-auto mb-8 max-w-2xl text-lg text-white/90'>
            Be part of our growing community of audio creators and enthusiasts.
            Stay updated with our latest features, share your creations, and
            connect with fellow creators.
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <a
              href={siteMetadata.twitter}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-black shadow-lg transition-colors hover:bg-gray-100 hover:shadow-xl'
            >
              <XIcon className='mr-2 h-5 w-5' />
              Follow on X
            </a>
            <a
              href={siteMetadata.discord}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center justify-center rounded-xl bg-[#5865F2] px-8 py-4 font-semibold text-white shadow-lg transition-colors hover:bg-[#4752C4] hover:shadow-xl'
            >
              <svg
                className='mr-2 h-5 w-5'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' />
              </svg>
              Join Discord
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
