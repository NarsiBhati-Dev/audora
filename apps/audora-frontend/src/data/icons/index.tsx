import React from 'react';

interface IconProps {
  className?: string;
}

export const LinkedInIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
}) => (
  <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
    <path
      d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 
2.761 2.239 5 5 5h14c2.762 0 5-2.239 
5-5v-14c0-2.761-2.238-5-5-5zm-11 
19h-3v-11h3v11zm-1.5-12.268c-.966 
0-1.75-.79-1.75-1.764s.784-1.764 
1.75-1.764 1.75.79 1.75 
1.764-.783 1.764-1.75 
1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 
0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 
7 2.476v6.759z'
    />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill='currentColor' viewBox='0 0 24 24'>
    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
  </svg>
);

export const InnovationIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13 10V3L4 14h7v7l9-11h-7z'
    />
  </svg>
);

export const AccessibilityIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
    />
  </svg>
);

export const QualityIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M5 13l4 4L19 7'
    />
  </svg>
);
