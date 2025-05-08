"use client";

import React, { useState } from "react";
import Image from "next/image";

const videos = [
  {
    names: "Angel Poon & Kerry Washington",
    youtubeId: "XVR9OgOtnZo",
  },
  {
    names: "Web Dev Cody",
    youtubeId: "yR7bIVhktOE",
  },
];

const TrustedSection = () => {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-r from-black/80 via-black/40 to-black/0 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-white text-2xl sm:text-3xl font-extrabold text-center mb-8">
          Made with Audora
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video, i) => (
            <div
              key={i}
              className="bg-[#232326] rounded-2xl p-3 shadow-lg max-w-[300px] mx-auto"
            >
              <div
                className={`rounded-xl overflow-hidden mb-3 relative`}
                style={{ aspectRatio: "16/9" }}
              >
                {playingIdx === i ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title={video.names}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    <Image
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt={video.names}
                      width={300}
                      height={169}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                      onClick={() => setPlayingIdx(i)}
                    >
                      <div className="bg-black/70 rounded-full p-2">
                        <svg
                          width="24"
                          height="24"
                          fill="white"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  </>
                )}
              </div>
              <div className="text-gray-100 text-sm font-medium">
                {video.names}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
