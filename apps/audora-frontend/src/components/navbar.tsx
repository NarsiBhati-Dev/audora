"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  Camera,
  Scissors,
  Radio,
  Video,
  Text,
  Sparkles,
  Captions,
  AudioLines,
  FileText,
  UserSquare2,
} from "lucide-react";

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const textColor = scrolled ? "text-black" : "text-white";
  const buttonBg = scrolled ? "bg-black text-white" : "bg-white text-black";

  return (
    <nav className="flex justify-between items-center px-6 w-full">
      <ul className="flex space-x-8">
        <li
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <span className={`cursor-pointer ${textColor}`}>Product</span>
          {isHovered && (
            <div className="absolute top-full left-0 mt-4 bg-white text-black shadow-xl rounded-xl p-6 w-[800px] flex justify-between z-50">
              {/* Products Column */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Products</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Camera className="text-violet-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Recording</p>
                      <p className="text-sm text-gray-500">
                        4K video and audio recorder.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Scissors className="text-violet-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Editing</p>
                      <p className="text-sm text-gray-500">
                        AI, text-based video editor.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Radio className="text-violet-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Live Streaming</p>
                      <p className="text-sm text-gray-500">
                        For livestreams in full HD.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Video className="text-violet-500 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Webinars</p>
                      <p className="text-sm text-gray-500">
                        Host, record, and repurpose.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Column */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Features</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center space-x-2">
                    <Text className="w-4 h-4" /> <span>Transcribing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" /> <span>Magic Clips</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Captions className="w-4 h-4" /> <span>Captions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AudioLines className="w-4 h-4" /> <span>Magic Audio</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" /> <span>AI Show Notes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <UserSquare2 className="w-4 h-4" />{" "}
                    <span>Async Recording</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </li>
        <li className={`${textColor}`}>Solutions</li>
        <li className={`${textColor}`}>Resources</li>
        <li className={`${textColor}`}>Pricing</li>
      </ul>

      <div className="flex items-center space-x-4">
        <Link href="/login" className={`text-sm ${textColor}`}>
          Login
        </Link>
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium ${buttonBg}`}
        >
          Start for Free
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
