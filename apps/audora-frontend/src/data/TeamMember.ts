import siteMetadata from "@/lib/siteMetadata";

export interface TeamMemberSchema {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
  twitter: string;
}

export const teamMembers: TeamMemberSchema[] = [
  {
    name: "Narsi Bhati",
    role: "Founder & Full-Stack Engineer",
    image: "/images/team/narsi-bhati.png",
    bio: "Passionate about real-time media, distributed systems, and building reliable user-first applications. Leads product and tech at Audora.",
    linkedin: siteMetadata.linkedIn,
    twitter: siteMetadata.twitter,
  },
  // {
  //   name: "Aisha Mehta",
  //   role: "Frontend Developer",
  //   image: "/images/team/aisha-mehta.webp",
  //   bio: "UI/UX-focused developer building intuitive interfaces and smooth WebRTC experiences for Audora users.",
  //   linkedin: "https://linkedin.com/in/aisha-mehta",
  //   twitter: "https://twitter.com/aishamehta",
  // },
  // {
  //   name: "Rohan Verma",
  //   role: "Backend Engineer",
  //   image: "/images/team/rohan-verma.webp",
  //   bio: "Works on scalable backend infrastructure and high-quality audio/video pipelines using FFmpeg and WebSockets.",
  //   linkedin: "https://linkedin.com/in/rohan-verma",
  //   twitter: "https://twitter.com/rohanverma",
  // },
  // {
  //   name: "Priya Sharma",
  //   role: "DevOps & Reliability",
  //   image: "/images/team/priya-sharma.webp",
  //   bio: "Ensures Audora stays fast, secure, and highly available. Focuses on CI/CD, observability, and S3 multi-part uploads.",
  //   linkedin: "https://linkedin.com/in/priya-sharma",
  //   twitter: "https://twitter.com/priyasharma",
  // },
];
