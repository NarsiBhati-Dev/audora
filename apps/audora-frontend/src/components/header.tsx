"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Navbar from "./navbar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1480px] flex justify-start items-center mx-auto px-4 py-4">
        <Logo scrolled={scrolled} />
        <Navbar scrolled={scrolled} />
      </div>
    </header>
  );
};

export default Header;
