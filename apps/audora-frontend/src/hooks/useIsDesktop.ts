'use client';
import { useEffect, useState } from 'react';

export function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [breakpoint]);

  return isDesktop;
}
