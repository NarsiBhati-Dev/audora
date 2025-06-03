import React from 'react';

interface IconProps {
  className?: string;
}

export const DashboardSidebarIcon: React.FC<IconProps> = ({
  className = 'w-6 h-6',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='22'
    height='22'
    viewBox='0 0 24 24'
    fill='none'
    className={className}
  >
    <g id='Collapse'>
      <rect
        id='Rectangle 1014'
        x='2'
        y='3'
        width='20'
        height='18'
        rx='4'
        stroke='#FAFAFA'
        strokeWidth='1.5'
      ></rect>
      <path
        id='Rectangle 1016-129'
        d='M10 3L10 12L10 21'
        stroke='#FAFAFA'
        strokeWidth='1.5'
      ></path>
      <path
        id='Rectangle 1017-130'
        d='M5 8L6 8L7 8'
        stroke='#FAFAFA'
        strokeWidth='1.5'
        strokeLinecap='round'
      ></path>
      <path
        id='Rectangle 1018-131'
        d='M5 11L6 11L7 11'
        stroke='#FAFAFA'
        strokeWidth='1.5'
        strokeLinecap='round'
      ></path>
    </g>
  </svg>
);

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

export const StreamingResolutionIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M2.5 6.66669L12.5 6.66669M12.5 6.66669C12.5 8.0474 13.6193 9.16669 15 9.16669C16.3807 9.16669 17.5 8.0474 17.5 6.66669C17.5 5.28598 16.3807 4.16669 15 4.16669C13.6193 4.16669 12.5 5.28598 12.5 6.66669ZM7.5 13.3334L17.5 13.3334M7.5 13.3334C7.5 14.7141 6.38071 15.8334 5 15.8334C3.61929 15.8334 2.5 14.7141 2.5 13.3334C2.5 11.9526 3.61929 10.8334 5 10.8334C6.38071 10.8334 7.5 11.9526 7.5 13.3334Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const AudienceInfoIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M15.0004 13.1974C16.2136 13.8069 17.2538 14.785 18.0131 16.008C18.1634 16.2502 18.2386 16.3713 18.2646 16.539C18.3174 16.8798 18.0844 17.2988 17.767 17.4336C17.6108 17.5 17.4351 17.5 17.0837 17.5M13.3337 9.6102C14.5685 8.99657 15.417 7.72238 15.417 6.25C15.417 4.77762 14.5685 3.50343 13.3337 2.8898M11.667 6.25C11.667 8.32107 9.98809 10 7.91702 10C5.84595 10 4.16702 8.32107 4.16702 6.25C4.16702 4.77893 5.84595 2.5 7.91702 2.5C9.98809 2.5 11.667 4.17893 11.667 6.25ZM2.13304 15.782C3.46163 13.7871 5.55816 12.5 7.91702 12.5C10.2759 12.5 12.3724 13.7871 13.701 15.782C13.9921 16.219 14.1376 16.4375 14.1208 16.7166C14.1078 16.9339 13.9653 17.2 13.7917 17.3313C13.5686 17.5 13.2619 17.5 12.6484 17.5H3.18565C2.57216 17.5 2.26542 17.5 2.04238 17.3313C1.86873 17.2 1.72626 16.9339 1.71321 16.7166C1.69646 16.4375 1.84199 16.219 2.13304 15.782Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M4.16699 8.33331V13.3426C4.16699 13.6417 4.16699 13.7913 4.21254 13.9233C4.25281 14.0401 4.31855 14.1465 4.40498 14.2347C4.50271 14.3345 4.63649 14.4014 4.90404 14.5352L9.40404 16.7852C9.62267 16.8945 9.732 16.9491 9.84666 16.9707C9.94822 16.9897 10.0524 16.9897 10.154 16.9707C10.2687 16.9491 10.378 16.8945 10.5966 16.7852L15.0966 14.5352C15.3642 14.4014 15.4979 14.3345 15.5957 14.2347C15.6821 14.1465 15.7478 14.0401 15.7881 13.9233C15.8337 13.7913 15.8337 13.6417 15.8337 13.3426V8.33331M1.66699 7.08331L9.70218 3.06571C9.8115 3.01105 9.86616 2.98372 9.92349 2.97297C9.97427 2.96344 10.0264 2.96344 10.0772 2.97297C10.1345 2.98372 10.1891 3.01105 10.2985 3.06571L18.3337 7.08331L10.2985 11.1009C10.1891 11.1556 10.1345 11.1829 10.0772 11.1936C10.0264 11.2032 9.97427 11.2032 9.92349 11.1936C9.86616 11.1829 9.8115 11.1556 9.70218 11.1009L1.66699 7.08331Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const SupportIcon2: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M12.5 3.33341V1.66675M12.5 13.3334V11.6667M6.66667 7.50008H8.33333M16.6667 7.50008H18.3333M14.8333 9.83341L15.8333 10.8334M14.8333 5.16675L15.8333 4.16675M2.5 17.5001L10 10.0001M10.1667 5.16675L9.16667 4.16675'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const SupportIcon3: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M2.5 6.5C2.5 5.09987 2.5 4.3998 2.77248 3.86502C3.01217 3.39462 3.39462 3.01217 3.86502 2.77248C4.3998 2.5 5.09987 2.5 6.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V11C17.5 12.4001 17.5 13.1002 17.2275 13.635C16.9878 14.1054 16.6054 14.4878 16.135 14.7275C15.6002 15 14.9001 15 13.5 15H8.06979C7.54975 15 7.28972 15 7.04101 15.051C6.82036 15.0963 6.60683 15.1712 6.40624 15.2737C6.18014 15.3892 5.9771 15.5517 5.57101 15.8765L3.58313 17.4668C3.23639 17.7442 3.06302 17.8829 2.91712 17.8831C2.79022 17.8832 2.67019 17.8255 2.59102 17.7263C2.5 17.6123 2.5 17.3903 2.5 16.9463V6.5Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const ZapIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <path
      d='M10.625 3.75L4.375 11.25H9.99999L9.37499 16.25L15.625 8.74999H9.99999L10.625 3.75Z'
      fill='currentColor'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const CameraIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M18.3337 7.44277C18.3337 6.93792 18.3337 6.6855 18.2338 6.56861C18.1472 6.46719 18.0173 6.41337 17.8843 6.42383C17.7311 6.43589 17.5526 6.61438 17.1956 6.97136L14.167 9.99996L17.1956 13.0286C17.5526 13.3855 17.7311 13.564 17.8843 13.5761C18.0173 13.5866 18.1472 13.5327 18.2338 13.4313C18.3337 13.3144 18.3337 13.062 18.3337 12.5572V7.44277Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
    <path
      d='M1.66699 8.16663C1.66699 6.76649 1.66699 6.06643 1.93948 5.53165C2.17916 5.06124 2.56161 4.67879 3.03202 4.43911C3.5668 4.16663 4.26686 4.16663 5.66699 4.16663H10.167C11.5671 4.16663 12.2672 4.16663 12.802 4.43911C13.2724 4.67879 13.6548 5.06124 13.8945 5.53165C14.167 6.06643 14.167 6.76649 14.167 8.16663V11.8333C14.167 13.2334 14.167 13.9335 13.8945 14.4683C13.6548 14.9387 13.2724 15.3211 12.802 15.5608C12.2672 15.8333 11.5671 15.8333 10.167 15.8333H5.66699C4.26686 15.8333 3.5668 15.8333 3.03202 15.5608C2.56161 15.3211 2.17916 14.9387 1.93948 14.4683C1.66699 13.9335 1.66699 13.2334 1.66699 11.8333V8.16663Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const MicrophoneIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    stroke='currentColor'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M16.6663 10V10.8333C16.6663 14.5152 13.6816 17.5 9.99967 17.5C6.31778 17.5 3.33301 14.5152 3.33301 10.8333V10M9.99967 14.1667C8.15873 14.1667 6.66634 12.6743 6.66634 10.8333V5.83333C6.66634 3.99238 8.15873 2.5 9.99967 2.5C11.8406 2.5 13.333 3.99238 13.333 5.83333V10.8333C13.333 12.6743 11.8406 14.1667 9.99967 14.1667Z'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const SpeakerIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path
      d='M16.4569 4.16669C17.638 5.80855 18.3337 7.82305 18.3337 10C18.3337 12.177 17.638 14.1915 16.4569 15.8334M13.1214 6.66669C13.7805 7.61155 14.167 8.76065 14.167 10C14.167 11.2394 13.7805 12.3885 13.1214 13.3334M8.02892 4.47142L5.39085 7.1095C5.24672 7.25362 5.17466 7.32569 5.09056 7.37722C5.016 7.42291 4.93472 7.45658 4.84969 7.477C4.75378 7.50002 4.65187 7.50002 4.44804 7.50002H3.00033C2.53362 7.50002 2.30026 7.50002 2.122 7.59085C1.9652 7.67074 1.83771 7.79823 1.75782 7.95503C1.66699 8.13329 1.66699 8.36664 1.66699 8.83335V11.1667C1.66699 11.6334 1.66699 11.8668 1.75782 12.045C1.83771 12.2018 1.9652 12.3293 2.122 12.4092C2.30026 12.5 2.53362 12.5 3.00033 12.5H4.44804C4.65187 12.5 4.75378 12.5 4.84969 12.523C4.93472 12.5435 5.016 12.5771 5.09056 12.6228C5.17466 12.6744 5.24672 12.7464 5.39085 12.8905L8.02892 15.5286C8.3859 15.8856 8.56439 16.0641 8.71763 16.0761C8.8506 16.0866 8.98054 16.0328 9.06716 15.9314C9.16699 15.8145 9.16699 15.5621 9.16699 15.0572V4.94283C9.16699 4.43798 9.16699 4.18556 9.06716 4.06867C8.98054 3.96725 8.8506 3.91343 8.71763 3.92389C8.56439 3.93595 8.3859 4.11444 8.02892 4.47142Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const MicOffIcon: React.FC<IconProps> = ({ className = 'w-8 h-8' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    stroke='currentColor'
    className={className}
  >
    <path
      d='M3.33366 9.99996V10.8333C3.33366 14.5152 6.31843 17.5 10.0003 17.5C12.0547 17.5 13.8921 16.5707 15.115 15.1096M1.66699 1.66663L18.3337 18.3333M13.3337 8.66663V5.83329C13.3337 3.99234 11.8413 2.49996 10.0003 2.49996C9.20081 2.49996 8.46704 2.78144 7.89271 3.25071M10.0003 14.1666C8.15938 14.1666 6.66699 12.6742 6.66699 10.8333V6.66663L12.7349 12.7399C12.1324 13.6024 11.1322 14.1666 10.0003 14.1666Z'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);

export const CameraOffIcon: React.FC<IconProps> = ({
  className = 'w-8 h-8',
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    className={className}
  >
    <path
      d='M4.16699 4.16663C2.78628 4.16663 1.66699 5.28591 1.66699 6.66663V13.3333C1.66699 14.714 2.78628 15.8333 4.16699 15.8333H11.667C12.7942 15.8333 13.7472 15.0873 14.0591 14.062M14.167 9.99996L17.1956 6.97136C17.5526 6.61438 17.7311 6.43589 17.8843 6.42383C18.0173 6.41337 18.1472 6.46719 18.2338 6.56861C18.3337 6.6855 18.3337 6.93792 18.3337 7.44277V12.5572C18.3337 13.062 18.3337 13.3144 18.2338 13.4313C18.1472 13.5327 18.0173 13.5866 17.8843 13.5761C17.7311 13.564 17.5526 13.3855 17.1956 13.0286L14.167 9.99996ZM14.167 9.99996V8.16663C14.167 6.76649 14.167 6.06643 13.8945 5.53165C13.6548 5.06124 13.2724 4.67879 12.802 4.43911C12.2672 4.16663 11.5671 4.16663 10.167 4.16663H7.91699M1.66699 1.66663L18.3337 18.3333'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></path>
  </svg>
);
