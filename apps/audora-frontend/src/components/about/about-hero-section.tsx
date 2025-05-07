import React from "react";
import GridBackground from "../ui/GridBackground";

const AboutHeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] py-36">
        <GridBackground />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm uppercase tracking-widest text-gray-400 mb-6 font-semibold">
              AUDIO. VIDEO. ANYWHERE.
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Audora is Built for Creators.
              <br />
              Capture Your{" "}
              <span className="bg-gradient-to-r from-[#6965db] to-[#a18fff] bg-clip-text text-transparent">
                Best Content
              </span>{" "}
              Remotely.
            </h1>
            <div className="text-lg md:text-xl text-gray-300 font-semibold mb-2">
              Record studio-quality audio and video straight from your
              browser—with no compromise.
            </div>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {`Whether you're podcasting, hosting interviews, or creating
              long-form content, Audora ensures your recordings are locally
              captured, perfectly synced, and ready to publish.`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutHeroSection;
