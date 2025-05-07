"use client";

import React, { useState, useRef } from "react";
import DropdownTrigger from "./dropdown-trigger";

interface HoverCardProps {
  triggerText: string;
  children: React.ReactNode;
  className?: string;
}

const HoverCard = ({
  triggerText,
  children,
  className = "",
}: HoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <DropdownTrigger
        text={triggerText}
        className={className}
        isOpen={isOpen}
      />

      <div
        className={`absolute top-full left-0 mt-7 bg-white border border-gray-300 text-gray-800 shadow-xl rounded-xl w-[800px] transition-all duration-200 ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default HoverCard;
