'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';

export const AnimatedAvatar = ({ open }: { open: boolean }) => {
  const gradientId = useId();

  return (
    <motion.svg
      width='46'
      height='46'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      whileHover={{ rotate: -10, scale: 1.1, x: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      className={`${
        open ? 'border-dashboard-bg-light' : 'border-transparent'
      } hover:border-dashboard-bg-light cursor-pointer rounded-full border-4 shadow-none`}
      style={{ willChange: 'transform' }}
    >
      {/* Gradient Face Circle */}
      <defs>
        <linearGradient
          id={gradientId}
          x1='0'
          y1='48'
          x2='48'
          y2='0'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#a78bfa' />
          <stop offset='1' stopColor='#8b5cf6' />
          <stop offset='1' stopColor='#a78bfa' />
          <stop offset='1' stopColor='#8b5cf6' />
        </linearGradient>
      </defs>
      <circle cx='24' cy='24' r='20' fill={`url(#${gradientId})`} />

      {/* Eyes with Safari-safe transform */}
      <motion.ellipse
        cx='18'
        cy='20'
        rx='1.2'
        ry='2'
        fill='#000'
        style={{
          transform: 'rotate(-10deg)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
        }}
        animate={{ scaleY: [1, 0.15, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.15 }}
      />
      <motion.ellipse
        cx='30'
        cy='20'
        rx='1.2'
        ry='2'
        fill='#000'
        style={{
          transform: 'rotate(10deg)',
          transformOrigin: 'center center',
          transformBox: 'fill-box',
        }}
        animate={{ scaleY: [1, 0.15, 1] }}
        transition={{ repeat: Infinity, repeatDelay: 4.3, duration: 0.15 }}
      />

      {/* Mouth with adjusted position */}
      <path
        d='M0.777832 6.65076C0.777832 7.86318 1.43339 9.02594 2.60028 9.88325C3.76717 10.7406 5.34982 11.2222 7.00005 11.2222C8.65029 11.2222 10.2329 10.7406 11.3998 9.88325C12.5667 9.02594 13.2223 7.86318 13.2223 6.65076'
        fill='black'
        transform='translate(17 20)'
      />
    </motion.svg>
  );
};
