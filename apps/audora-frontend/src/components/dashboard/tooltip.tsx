'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  tooltip: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip = ({
  tooltip,
  children,
  position = 'top',
  delay = 200,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updatePosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const tooltipHeight = 32;
    const tooltipWidth = 120;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = rect.top + scrollY - tooltipHeight - 8;
        left = rect.left + scrollX + (rect.width - tooltipWidth) / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollY + 8;
        left = rect.left + scrollX + (rect.width - tooltipWidth) / 2;
        break;
      case 'left':
        top = rect.top + scrollY + (rect.height - tooltipHeight) / 2;
        left = rect.left + scrollX - tooltipWidth - 8;
        break;
      case 'right':
        top = rect.top + scrollY + (rect.height - tooltipHeight) / 2;
        left = rect.right + scrollX + 8;
        break;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isVisible) {
        updatePosition();
      }
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={triggerRef}
      className='group relative inline-block'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible &&
        createPortal(
          <div
            role='tooltip'
            className='pointer-events-none fixed z-[9999] min-w-max transition-all duration-200'
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
          >
            <div
              className={`rounded-md bg-[#1f1f1f] px-3 py-1.5 text-sm text-white shadow-lg before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-[#1f1f1f] ${position === 'top' ? 'origin-bottom scale-95 before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2' : ''} ${position === 'bottom' ? 'origin-top scale-95 before:top-[-4px] before:left-1/2 before:-translate-x-1/2' : ''} ${position === 'left' ? 'origin-right scale-95 before:top-1/2 before:right-[-4px] before:-translate-y-1/2' : ''} ${position === 'right' ? 'origin-left scale-95 before:top-1/2 before:left-[-4px] before:-translate-y-1/2' : ''} animate-in fade-in-0 zoom-in-95 pointer-events-auto`}
            >
              {tooltip}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
