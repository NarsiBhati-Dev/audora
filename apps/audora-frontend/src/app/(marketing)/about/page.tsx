import React from "react";
import { teamMembers } from "@/data/TeamMember";
import TeamMemberCard from "@/components/about/team-member-card";
import {
  InnovationIcon,
  AccessibilityIcon,
  QualityIcon,
  XIcon,
} from "@/data/icons";
import AboutHeroSection from "@/components/about/about-hero-section";
import siteMetadata from "@/lib/siteMetadata";

const values = [
  {
    title: "Innovation",
    description:
      "We constantly push the boundaries of what's possible in audio creation and sharing.",
    icon: <InnovationIcon />,
  },
  {
    title: "Accessibility",
    description:
      "Making professional-grade audio tools available to creators of all levels.",
    icon: <AccessibilityIcon />,
  },
  {
    title: "Quality",
    description:
      "Delivering exceptional audio quality and user experience in everything we do.",
    icon: <QualityIcon />,
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <AboutHeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Values Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#6965db]/20 group"
              >
                <div className="text-[#6965db] mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-[#6965db] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {(() => {
                    if (value.title === "Innovation") {
                      return "We constantly push the boundaries of what's possible in remote content creation, making it easy to collaborate and record from anywhere.";
                    }
                    if (value.title === "Accessibility") {
                      return "Professional-grade recording tools for podcasts, meetings, and more—available to everyone, no matter their experience level.";
                    }
                    if (value.title === "Quality") {
                      return "Local recording for every participant ensures the best possible audio and video quality, every time.";
                    }
                    return value.description;
                  })()}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        <section className="bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of our growing community of audio creators and enthusiasts.
            Stay updated with our latest features, share your creations, and
            connect with fellow creators.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={siteMetadata.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
            >
              <XIcon className="w-5 h-5 mr-2" />
              Follow on X
            </a>
            <a
              href="https://discord.gg/hwqtjKuz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#5865F2] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#4752C4] transition-colors shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
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
