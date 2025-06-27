'use client';

import { ReactNode } from 'react';
import { useInitMeeting } from '@/modules/webrtc/hooks/useInitMeeting';

interface StudioProviderProps {
  studioSlug: string;
  token: string | null;
  children: ReactNode;
  selfId: string;
}

export const StudioProvider = ({
  studioSlug,
  token,
  children,
  selfId,
}: StudioProviderProps) => {
  useInitMeeting({ studioSlug, token, selfId });

  return <>{children}</>;
};
