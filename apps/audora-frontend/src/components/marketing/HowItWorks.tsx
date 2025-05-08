import React from "react";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Plan your webinar",
    description:
      "Schedule and start sharing invites with other speakers and your audience.",
  },
  {
    number: "02",
    title: "Go live",
    description:
      "Recording is automatic, but you can choose if and where to stream at the same time.",
  },
  {
    number: "03",
    title: "Edit & Repurpose",
    description:
      "Rework your recording into multiple assets, long or short-form, in any layout, with any design.",
  },
];

const HowItWorks = () => (
  <section className="py-10 md:py-20">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      {/* Left: Steps */}
      <div className="flex-1 w-full">
        <h2 className="text-4xl font-extrabold mb-10 text-white">
          How it works.
        </h2>
        <ol className="space-y-2">
          {steps.map((step, idx) => (
            <li key={step.number} className="flex flex-col">
              <div className="flex items-start gap-4">
                <span className="text-3xl font-extrabold text-white min-w-[2.5rem]">
                  {step.number}
                </span>
                <div>
                  <span className="font-bold text-lg text-white">
                    {step.title}
                  </span>
                  <span className="text-white/80 font-normal">
                    {" "}
                    – {step.description}
                  </span>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <hr className="my-8 border-[#33334d]" />
              )}
            </li>
          ))}
        </ol>
      </div>
      {/* Right: Image with play button and label */}
      <div className="flex-1 w-full flex justify-center">
        <div className="relative max-w-xl w-full">
          <Image
            src="/images/webinar-works.png"
            alt="How it works thumbnail"
            width={600}
            height={350}
            className="rounded-2xl shadow-2xl object-cover w-full"
          />
          {/* Play button overlay */}
          <button
            className="absolute left-1/2 bottom-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg group"
            aria-label="Play video"
          >
            <svg width="44" height="44" fill="none" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="#fff"
                className="opacity-80 group-hover:opacity-100 transition"
              />
              <polygon points="13,11 23,16 13,21" fill="#7357FF" />
            </svg>
          </button>
          {/* <span className="absolute left-8 bottom-0 translate-y-full mt-4 text-white text-2xl font-bold drop-shadow-lg">
            Webinars
          </span> */}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
