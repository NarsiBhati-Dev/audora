import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { products } from "@/data/ProductsList";
import Logo from "../logo";
import MobileDropdownSection from "./mobile-dropdown-section";

const noScrollbar = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const menuSections = [{ label: "Product", key: "product1", items: products }];

const MobileNavbar = ({ scrolled }: { scrolled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const textColor = scrolled ? "text-black" : "text-zinc-100";

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <style>{noScrollbar}</style>
      <div className="md:hidden">
        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${textColor} rounded-lg transition-colors`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-50 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 rounded-b-2xl shadow-xl transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="p-4 flex flex-col h-full relative">
            {/* Close button */}
            <div className="flex justify-between items-center mb-2">
              <Logo scrolled={true} />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-black rounded-lg"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>

            {/* Scrollable Menu Sections */}
            <nav
              className="mt-2 mb-4 overflow-y-auto no-scrollbar flex-1 pb-32"
              style={{ maxHeight: "calc(100dvh - 180px)" }}
            >
              {menuSections.map((section, index) => (
                <MobileDropdownSection
                  key={index}
                  sectionKey={section.key}
                  label={section.label}
                  items={section.items}
                  isOpen={openDropdown === section.key}
                  onToggle={(key) =>
                    setOpenDropdown(openDropdown === key ? null : key)
                  }
                  onCloseMenu={() => setIsOpen(false)}
                />
              ))}

              <Link
                href="/blogs"
                className="block py-4 text-lg font-semibold text-black border-b border-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/pricing"
                className="block py-4 text-lg font-semibold text-black border-b border-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
            </nav>

            {/* Auth Buttons - fixed at the bottom */}
            <div className="fixed left-0 bottom-0 w-full z-50 bg-white p-4 space-y-4 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.04)] rounded-b-2xl">
              <Link
                href="/login"
                className="block w-full text-center py-4 text-lg font-bold border-2 border-black rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center py-4 text-lg font-bold bg-black text-white rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Start for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
