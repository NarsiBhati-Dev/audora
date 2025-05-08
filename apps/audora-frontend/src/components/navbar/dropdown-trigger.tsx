'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DropdownTriggerProps {
  text: string;
  className?: string;
  isOpen: boolean;
}

const DropdownTrigger = ({
  text,
  className = '',
  isOpen,
}: DropdownTriggerProps) => {
  return (
    <span
      className={`flex cursor-pointer items-center gap-1 font-semibold ${className}`}
    >
      {text}
      {isOpen ? (
        <ChevronUp className='h-5 w-5' />
      ) : (
        <ChevronDown className='h-5 w-5' />
      )}
    </span>
  );
};

export default DropdownTrigger;
