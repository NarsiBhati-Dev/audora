import React from 'react';

interface GridBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  className = '',
  style,
}) => (
  <div
    className={`pointer-events-none absolute inset-0 bg-[url('/grid.svg')] [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-center ${className}`}
    style={style}
    aria-hidden='true'
  />
);

export default GridBackground;
