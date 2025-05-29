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

export const FacebookIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='10'
    height='16'
    viewBox='0 0 10 16'
    fill='none'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/facebook-01.f9d02084bc8e85a680f5.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M5.63314 9.30178V16H2.55621V9.30178H0V6.5858H2.55621V5.59763C2.55621 1.92899 4.08876 0 7.33136 0C8.32544 0 8.57396 0.159763 9.11834 0.289941V2.97633C8.50887 2.86982 8.33728 2.81065 7.70414 2.81065C6.95266 2.81065 6.55029 3.02367 6.18343 3.44379C5.81657 3.86391 5.63314 4.59172 5.63314 5.63314V6.59172H9.11834L8.18343 9.30769H5.63314V9.30178Z'
      fill='currentColor'
    ></path>
  </svg>
);

export const YoutubeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/youtube-logo.a5cc7000982a0b536430.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M23.4982 6.37365C23.2216 5.34039 22.4096 4.5284 21.3763 4.25181C19.5055 3.75 12 3.75 12 3.75C12 3.75 4.49456 3.75 2.62364 4.25181C1.59039 4.5284 0.778399 5.34039 0.501811 6.37365C1.50211e-07 8.24458 0 12.1504 0 12.1504C0 12.1504 1.50211e-07 16.0563 0.501811 17.9272C0.778399 18.9605 1.59039 19.7725 2.62364 20.049C4.49456 20.5508 12 20.5508 12 20.5508C12 20.5508 19.5055 20.5508 21.3763 20.049C22.4096 19.7725 23.2216 18.9605 23.4982 17.9272C24 16.0563 24 12.1504 24 12.1504C24 12.1504 23.998 8.24458 23.4982 6.37365Z'
      fill='#FF0000'
    ></path>
    <path
      d='M9.59766 15.75L15.8328 12.1504L9.59766 8.55078V15.75Z'
      fill='white'
    ></path>
  </svg>
);

export const TwitchIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='21'
    height='22'
    viewBox='0 0 21 22'
    fill='currentColor'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/twitch-logo.56c154a7a76928a26028.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path d='M1.47196 0L0 3.78125V19.25H5.25V22H8.19392L10.9907 19.25H15.2593L21 13.5045V0H1.47196ZM18.9883 12.5223L15.75 15.7634H10.5L7.70327 18.5625V15.7634H3.23832V2.01339H18.9883V12.5223ZM15.75 5.74554H13.7383V11.4911H15.75V5.74554ZM10.5 5.74554H8.48832V11.4911H10.5V5.74554Z'></path>
  </svg>
);

export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='12'
    height='14'
    viewBox='0 0 12 14'
    fill='none'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/tiktok.32e2d39429aef726a96c.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M8.13951 0.625977H5.99098V9.30986C5.99098 10.3446 5.16464 11.1945 4.13629 11.1945C3.10793 11.1945 2.28158 10.3446 2.28158 9.30986C2.28158 8.29368 3.08957 7.46222 4.08121 7.42528V5.24508C1.89595 5.28201 0.133057 7.07423 0.133057 9.30986C0.133057 11.564 1.93267 13.3747 4.15466 13.3747C6.37661 13.3747 8.17622 11.5455 8.17622 9.30986V4.85706C8.98422 5.44831 9.97584 5.79936 11.0226 5.81785V3.63763C9.4066 3.5822 8.13951 2.2519 8.13951 0.625977Z'
      fill='currentColor'
    ></path>
  </svg>
);

export const RTMPIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/signal-01.b47fac5188ef6d1d39b8.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M13.5359 6.46444C15.4885 8.41707 15.4885 11.5829 13.5359 13.5355M6.46479 13.5355C4.51217 11.5829 4.51217 8.41704 6.46479 6.46442M4.10777 15.8925C0.8534 12.6382 0.8534 7.36179 4.10777 4.10742M15.8929 4.10746C19.1473 7.36183 19.1473 12.6382 15.8929 15.8926M11.667 9.99998C11.667 10.9205 10.9208 11.6666 10.0003 11.6666C9.07985 11.6666 8.33366 10.9205 8.33366 9.99998C8.33366 9.0795 9.07985 8.33331 10.0003 8.33331C10.9208 8.33331 11.667 9.0795 11.667 9.99998Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
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

export const InfoIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    data-src='https://app.riverside.fm/6.72.10/static/media/film-02.b7704551e33e59b7cfc0.svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M10.0003 18.3333V1.66663M5.83366 18.3333V14.1666M5.83366 5.83329V1.66663M14.167 18.3333V14.1666M14.167 5.83329V1.66663M1.66699 5.83329H18.3337M1.66699 14.1666H18.3337M18.3337 14.3333V5.66663C18.3337 4.26649 18.3337 3.56643 18.0612 3.03165C17.8215 2.56124 17.439 2.17879 16.9686 1.93911C16.4339 1.66663 15.7338 1.66663 14.3337 1.66663L5.66699 1.66663C4.26686 1.66663 3.5668 1.66663 3.03202 1.93911C2.56161 2.17879 2.17916 2.56124 1.93948 3.03165C1.66699 3.56643 1.66699 4.2665 1.66699 5.66663L1.66699 14.3333C1.66699 15.7334 1.66699 16.4335 1.93948 16.9683C2.17916 17.4387 2.56161 17.8211 3.03202 18.0608C3.5668 18.3333 4.26686 18.3333 5.66699 18.3333H14.3337C15.7338 18.3333 16.4339 18.3333 16.9686 18.0608C17.439 17.8211 17.8215 17.4387 18.0612 16.9683C18.3337 16.4335 18.3337 15.7334 18.3337 14.3333Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);
