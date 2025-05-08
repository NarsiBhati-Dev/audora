import React from "react";
import Image from "next/image";

interface Participant {
  name: string;
  avatar: string | null;
  status: string;
  resolution: string;
  icon?: React.ReactNode;
}

const participants: Participant[] = [
  {
    name: "Narsi",
    avatar: "/images/team/narsi-bhati.png",
    status: "Ready",
    resolution: "3840 × 2160",
  },
  {
    name: "Stephen",
    avatar: "/images/stephen.png",
    status: "Ready",
    resolution: "3840 × 2160",
  },
  {
    name: "All Speakers",
    avatar: null,
    status: "",
    resolution: "3840 × 2160",
    icon: (
      <svg
        width="32"
        height="32"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" fill="#a1a1aa" />
        <rect x="4" y="16" width="16" height="4" rx="2" fill="#a1a1aa" />
      </svg>
    ),
  },
];

const RecordSection = () => {
  return (
    <section className="bg-[#f7f7fa] py-20" aria-labelledby="record-heading">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
        <h1
          id="record-heading"
          className="text-5xl font-extrabold mb-4 text-black"
        >
          Record it.
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Studio-quality, separate audio and video tracks for each participant,
          thanks to our local recording technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <a
            href="/dashboard"
            className="bg-[#7357FF] hover:bg-[#5a3fdc] text-white font-semibold px-8 py-3 rounded-lg text-lg shadow transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7357FF] focus:ring-offset-2"
            aria-label="Start recording for free"
          >
            Start for Free
          </a>
          <a
            href="/recording"
            className="text-[#7357FF] font-medium flex items-center justify-center hover:underline transition-colors duration-300"
            aria-label="Learn more about recording features"
          >
            Learn more{" "}
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </a>
        </div>
        {/* Main content */}
        <div className="relative flex flex-col md:flex-row items-center justify-center mt-8 w-full">
          {/* Device image */}
          <div className="relative w-full md:w-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 transition-transform duration-300 scale-[1.02]">
            <Image
              src="/images/4k.png"
              alt="4K Quality Badge"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
              quality={90}
            />
            {/* REC badge */}
            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full inline-block" />{" "}
              REC
            </div>
          </div>
          {/* Floating cards */}
          <div className="flex flex-col gap-6 md:ml-8 mt-8 md:mt-0 w-full max-w-lg">
            {/* Download tracks card */}
            <div className="bg-zinc-900 rounded-2xl shadow-lg p-6 transition-transform duration-300 scale-[1.02]">
              <div className="text-white font-semibold mb-4 text-base">
                Download separate tracks
              </div>
              <div className="space-y-3">
                {participants.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between bg-zinc-800 rounded-xl px-4 py-3 transition-colors duration-300 hover:bg-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      {p.avatar ? (
                        <div className="w-12 h-12 min-w-[48px] min-h-[48px] relative">
                          <Image
                            src={p.avatar}
                            alt={`${p.name}'s avatar`}
                            fill
                            className="rounded-full object-cover border-2 border-zinc-700"
                            quality={85}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-full bg-zinc-700 border-2 border-zinc-600">
                          {p.icon}
                        </div>
                      )}
                      <div>
                        <div className="text-white font-medium">{p.name}</div>
                        {p.status && (
                          <div className="text-xs text-zinc-400">
                            {p.status}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-400 text-xs">
                        {p.resolution}
                      </span>
                      <button
                        className="text-white hover:text-[#7357FF] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Download ${p.name}'s WAV file`}
                      >
                        {`"WAV"`}
                      </button>
                      <button
                        className="text-white hover:text-[#7357FF] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={`Download ${p.name}'s MP4 file`}
                      >
                        {`"MP4"`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecordSection;
