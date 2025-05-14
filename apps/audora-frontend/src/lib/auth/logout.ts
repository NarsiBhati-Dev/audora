import { signOut } from 'next-auth/react';

const HandleLogout = async () => {
  try {
    await signOut();
  } catch {}
};

export default HandleLogout;
