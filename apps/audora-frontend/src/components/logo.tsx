"use client";

import React from "react";
import Image from "next/image";
import siteMetadata from "@/lib/siteMetadata";
import Link from "next/link";

interface LogoParams {
  href?: string;
  scrolled?: boolean;
  page?: string;
}

const Logo = ({ scrolled, page, href = "/" }: LogoParams) => {
  return (
    <Link href={href} className="flex items-center space-x-1.5">
      <Image
        src={
          scrolled
            ? "/images/audora-logo-black.webp"
            : "/images/audora-logo-white.webp"
        }
        alt="Audora Logo"
        width={24}
        height={24}
        className="rounded-sm"
      />
      <span
        className={`text-lg font-semibold ${scrolled ? "text-black" : "text-white"}`}
      >
        {siteMetadata.header} {page && ` | ${page}`}
      </span>
    </Link>
  );
};

export default Logo;
