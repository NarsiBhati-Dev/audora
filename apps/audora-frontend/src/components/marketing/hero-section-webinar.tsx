import React from "react";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";

const HeroSectionWebinar = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 flex flex-col items-center text-center px-4 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f]">
        <GridBackground />
        <div className="max-w-3xl mx-auto relative">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-white leading-tight">
            Host Stunning Webinars Effortlessly
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Engage your audience with high-quality, interactive webinars. No
            downloads, no hassle—just seamless live experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <a
              href="/dashboard"
              className="bg-[#7357FF] hover:bg-[#5a3fdc] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition"
            >
              Start Your Webinar
            </a>
            <a
              href="#features"
              className="text-[#7357FF] font-medium flex items-center justify-center hover:underline"
            >
              Learn more <span className="ml-1">→</span>
            </a>
          </div>
        </div>
        <div className="w-full flex relative justify-center">
          <Image
            src="/images/webinar-hero.png"
            alt="Webinar Hero"
            width={900}
            height={500}
            className="rounded-2xl shadow-2xl border border-[#a78bfa] object-cover max-w-full"
            priority
          />
        </div>
      </section>
    </>
  );
};

export default HeroSectionWebinar;
