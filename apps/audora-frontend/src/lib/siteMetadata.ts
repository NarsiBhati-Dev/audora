import { envSiteUrl } from "@/config";

if (!envSiteUrl) {
  throw new Error(
    "❌ NEXT_PUBLIC_SITE_URL is missing or empty! Check your .env file."
  );
}

const SITE_URL = envSiteUrl.replace(/\/$/, "");

const siteMetadata = {
  title:
    "Audora: All-in-One Podcast & Video Studio | Record, Edit & Share in HD",
  description:
    "Audora is your all-in-one podcast and video studio. Record, edit, and share high-quality content with ease – solo or with your team.",

  header: "AUDORA",

  slogan: `Create Confidently, Share Seamlessly`,

  developer: "Narsi Bhati",

  siteUrl: SITE_URL,

  language: "en-US",
  locale: "en-US",

  socialBanner: `${SITE_URL}/images/social-banner.webp`,

  // social links
  github: "https://github.com/NarsiBhati-Dev/Audora",
  linkedIn: "https://www.linkedin.com/in/narsi-bhati-b43459224/",
  twitter: "https://x.com/NarsiBhati31",

  // contacts
  email: "narsibhati2000@gmail.com",
};

export default siteMetadata;
