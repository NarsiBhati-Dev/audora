"use client";

import { FaGoogle, FaApple, FaSpotify } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

const LoginCard = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-[#111] rounded-2xl p-8 flex max-w-4xl w-full shadow-lg">
        {/* Left Panel */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-sm text-gray-400 mb-6">
            Sign up to join, it's free
          </p>

          <div className="space-y-4">
            <AuthButton icon={<FaGoogle />} text="Continue with Google" />
            <AuthButton icon={<FaApple />} text="Continue with Apple" />
            <AuthButton icon={<FaSpotify />} text="Continue with Spotify" />
            <AuthButton icon={<MdEmail />} text="Continue with Email" />
          </div>

          <p className="text-xs text-gray-500 mt-6">
            By signing up, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> &{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          <p className="text-sm mt-3">
            Have an account?{" "}
            <Link href="/login" className="text-purple-400 underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Panel (Mock Video/Visual) */}
        <div className="hidden md:flex-1 md:flex items-center justify-center relative">
          <img
            src="/sample-thumb.jpg"
            alt="Recording"
            className="rounded-xl w-full max-w-sm"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 px-4 py-2 rounded text-lime-300 font-semibold text-sm">
            Studio-quality recording. <br />
            Effortless editing.
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <button className="w-full bg-[#222] hover:bg-[#333] text-white rounded-lg px-4 py-3 flex items-center gap-3 text-sm font-medium">
    <span className="text-lg">{icon}</span> {text}
  </button>
);

export default LoginCard;
