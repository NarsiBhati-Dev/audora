import React from "react";
import Image from "next/image";

const EditSection = () => {
  return (
    <section className="bg-gradient-to-r from-black/80 via-black/40 to-black/0 py-24 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-7xl w-full flex flex-col items-center text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4 text-white">Edit it.</h1>
        <p className="text-lg text-zinc-300 mb-8 max-w-2xl">
          Cut down on editing time, without losing out on editing capabilities.
          No learning curve needed, and zero file transfer required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <a
            href="/dashboard"
            className="bg-[#7357FF] hover:bg-[#5a3fdc] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7357FF] focus:ring-offset-2"
            aria-label="Start editing for free"
          >
            Start for Free
          </a>
          <a
            href="/video-editor"
            className="text-[#a78bfa] font-medium flex items-center justify-center hover:underline transition-colors duration-300"
            aria-label="Learn more about editing features"
          >
            Learn more{" "}
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        {/* Editor mockup image */}
        <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-8 border-zinc-800 bg-zinc-900">
          <Image
            src="/images/editor-mockup-2.png"
            alt="Editor interface mockup"
            width={1200}
            height={700}
            className="w-full h-auto object-cover"
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default EditSection;
