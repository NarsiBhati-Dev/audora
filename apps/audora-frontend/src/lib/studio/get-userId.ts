'use client';

import { getServerSession } from 'next-auth';
import { nanoid } from 'nanoid';
import authOptions from '../auth/auth-options';

export const getGuestUserId = () => {
  const guestIdKey = 'audora_guest_id';
  let guestId = localStorage.getItem(guestIdKey);

  if (!guestId) {
    guestId = nanoid(10);
    localStorage.setItem(guestIdKey, guestId);
  }

  return guestId;
};

export const getServerUserId = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    return session.user.id;
  }

  return null;
};
