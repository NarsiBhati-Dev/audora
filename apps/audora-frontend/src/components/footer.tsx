import React from "react";
import Link from "next/link";
import { socialLinks, footerSections, bottomLinks } from "@/data/FooterData";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#1f1f1f] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm">
              Empowering creators with the best audio recording and sharing
              platform.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, label, iconPath }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={iconPath} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ name, href }) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Audora. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {bottomLinks.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
