import React from "react";
import {
  FaYoutube,
  FaLinkedin,
  FaTwitch,
  FaTiktok,
  FaXTwitter,
  FaFacebook,
  FaInstagram,
  FaVideo,
} from "react-icons/fa6";
import Image from "next/image";

const leftIcons = [
  { icon: <FaFacebook />, color: "bg-blue-600" },
  { icon: <FaXTwitter />, color: "bg-black" },
  { icon: <FaYoutube />, color: "bg-red-600" },
  { icon: <FaLinkedin />, color: "bg-blue-700" },
];

const rightIcons = [
  { icon: <FaTwitch />, color: "bg-purple-600" },
  {
    icon: <FaInstagram />,
    color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
  },
  { icon: <FaTiktok />, color: "bg-black" },
  { icon: <FaVideo />, color: "bg-violet-300" },
];

const ICON_SIZE = 64;
const ICON_GAP = 32;
const ICON_COUNT = leftIcons.length;
const IMAGE_HEIGHT = ICON_COUNT * ICON_SIZE + (ICON_COUNT - 1) * ICON_GAP;
const IMAGE_WIDTH = 600;

const GoLiveSection = () => {
  return (
    <section className="py-20 min-h-screen bg-[#f7f7fa] flex items-center">
      <div className="w-full flex flex-col items-center text-center px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-black leading-tight">
          Go live.
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Stream your events and webinars in full HD from your fully branded
          studio. Simulcasting, omnichat, and lots more included.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button className="text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg bg-[#7357FF] hover:bg-[#5a3fdc] px-8 py-3 transition">
            Start for Free
          </button>
          <a
            href="/video-editor"
            className="text-[#7357FF] font-medium flex items-center justify-center hover:underline"
          >
            Learn more <span className="ml-1">→</span>
          </a>
        </div>
        <div className="relative flex justify-center items-center mt-8 w-full">
          {/* Left icons and lines */}
          <div className="hidden md:flex flex-col gap-8 left-0 top-1/2 -translate-x-10 z-10 h-[350px] justify-between">
            {leftIcons.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-3xl shadow-lg border-2 border-[#a78bfa] ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Central image */}
          <div className="relative z-20">
            <Image
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              src="/images/go-live-section.png"
              alt="Product Screenshot"
              className="rounded-xl shadow-2xl border-8 border-[#a78bfa] w-[700px] max-w-full"
            />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-4 py-1 rounded-lg text-xs font-semibold shadow">
              ON AIR
            </div>
          </div>

          {/* Right icons and lines */}
          <div className="hidden md:flex flex-col gap-8  right-0 top-1/2 translate-x-10 z-10 h-[350px] justify-between">
            {rightIcons.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`md:w-16 md:h-16 flex items-center justify-center rounded-full text-white text-3xl shadow-lg border-2 border-[#a78bfa] ${item.color}`}
                >
                  {item.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoLiveSection;
