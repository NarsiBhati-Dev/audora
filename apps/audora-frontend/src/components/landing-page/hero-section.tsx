import React from "react";
import Link from "next/link";

const options = [
  "Podcasts",
  "Video interviews",
  "Social media clips",
  "Transcriptions",
  "Webinars",
  "Video marketing",
  "AI show notes",
  "Captions",
];

const HeroSection = () => {
  return (
    <div className="relative min-h-[94vh] flex flex-col md:flex-row items-center justify-start overflow-hidden">
      {/* Video Section */}
      <div className="w-full h-[50vh] md:h-[94vh] md:absolute md:inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="images/video-poster.png"
          className="w-full h-full object-cover"
        >
          <source src="/videos/audora-hero.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay: only on desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/0" />
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-8 md:px-12 lg:pl-24 text-center md:text-left items-center md:items-start max-w-2xl py-12 md:py-24 md:relative md:z-10 text-white">
        <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 md:mb-6 text-left">
          Your Podcast
          <br />
          Studio Anywhere<span className="text-[#7357FF]">.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 text-left max-w-xl">
          Record studio-quality podcasts from anywhere. Connect with guests
          worldwide, edit with precision, and publish your episodes with
          confidence - all in one powerful platform.
        </p>
        <div className="hidden md:flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          {options.map((option) => (
            <button
              key={option}
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-400 bg-black/30 text-gray-100 text-xs sm:text-sm hover:bg-white/10 transition-colors"
              type="button"
              tabIndex={-1}
            >
              {option}
            </button>
          ))}
        </div>
        <Link
          href="/signup"
          className="inline-block w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-[#7357FF] text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-[#5a3fdc] transition-colors mb-2"
        >
          Start Podcasting
        </Link>
        <div className="text-[10px] sm:text-xs text-gray-300 mt-2">
          * Launch your podcast today. No credit card required.
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
