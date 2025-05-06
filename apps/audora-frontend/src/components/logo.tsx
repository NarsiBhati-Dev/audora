import React from "react";
import Image from "next/image";
import siteMetadata from "@/lib/siteMetadata";

const Logo = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={
          scrolled
            ? "/images/audora-logo-black.webp"
            : "/images/audora-logo-white.webp"
        }
        alt="Audora Logo"
        width={32}
        height={26}
        className="rounded-sm"
      />
      <span
        className={`text-xl font-extrabold ${scrolled ? "text-black" : "text-white"}`}
      >
        {siteMetadata.header}
      </span>
    </div>
  );
};

export default Logo;
