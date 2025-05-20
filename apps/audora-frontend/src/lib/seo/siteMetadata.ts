import { SITE_URL } from '@/config';

if (!SITE_URL) {
  throw new Error(
    '❌ NEXT_PUBLIC_SITE_URL is missing or empty! Check your .env file.',
  );
}

const siteMetadata = {
  title:
    'Audora: All-in-One Podcast & Video Studio | Record, Edit & Share in HD',
  description:
    'Audora is your all-in-one podcast and video studio. Record, edit, and share high-quality content with ease – solo or with your team.',

  header: 'AUDORA',

  slogan: `Create Confidently, Share Seamlessly`,

  developer: 'Narsi Bhati',

  siteUrl: SITE_URL,

  language: 'en-US',
  locale: 'en-US',

  socialBanner: `${SITE_URL}/social-banner-2.webp`,

  // social links
  github: 'https://github.com/NarsiBhati-Dev/Audora',
  linkedIn: 'https://www.linkedin.com/in/narsi-bhati-b43459224/',
  twitter: 'https://x.com/NarsiBhati31',
  discord: 'https://discord.gg/M95XBRdGzc',

  // contacts
  email: 'narsibhati2000@gmail.com',
};

export default siteMetadata;
