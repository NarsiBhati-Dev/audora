import React from "react";

interface GridBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

const GridBackground: React.FC<GridBackgroundProps> = ({
  className = "",
  style,
}) => (
  <div
    className={`absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none ${className}`}
    style={style}
    aria-hidden="true"
  />
);

export default GridBackground;
