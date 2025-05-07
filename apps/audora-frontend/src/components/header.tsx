"use client";

import React, { useEffect, useState } from "react";
import Logo from "@/components/logo";
import Navbar from "./navbar/navbar";

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
      className={`fixed w-full top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-in-out ${
        scrolled ? "bg-white shadow-md" : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-[1480px] flex justify-start items-center mx-auto py-3">
        <Logo scrolled={scrolled} />
        <Navbar scrolled={scrolled} />
      </div>
    </header>
  );
};

export default Header;
