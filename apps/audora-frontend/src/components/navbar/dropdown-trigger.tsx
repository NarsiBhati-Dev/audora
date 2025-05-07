"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface DropdownTriggerProps {
  text: string;
  className?: string;
  isOpen: boolean;
}

const DropdownTrigger = ({
  text,
  className = "",
  isOpen,
}: DropdownTriggerProps) => {
  return (
    <span
      className={`cursor-pointer flex items-center gap-1 font-semibold ${className}`}
    >
      {text}
      {isOpen ? (
        <ChevronUp className="w-5 h-5" />
      ) : (
        <ChevronDown className="w-5 h-5" />
      )}
    </span>
  );
};

export default DropdownTrigger;
