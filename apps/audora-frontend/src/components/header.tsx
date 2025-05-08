"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Navbar from "./navbar/navbar";
import MobileNavbar from "./navbar/mobile-navbar";

const Header = ({ isMarketing = false }: { isMarketing?: boolean }) => {
  const [scrolled, setScrolled] = useState(isMarketing);

  useEffect(() => {
    if (isMarketing) {
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMarketing]);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-[background-color,box-shadow] duration-500 px-4 md:px-8 lg:px-16 xl:px-24 ease-in-out ${
        scrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-[1480px] flex justify-between items-center mx-auto py-3">
        <Logo scrolled={scrolled} />
        <Navbar scrolled={scrolled} />
        <MobileNavbar scrolled={scrolled} />
      </div>
    </header>
  );
};

export default Header;
