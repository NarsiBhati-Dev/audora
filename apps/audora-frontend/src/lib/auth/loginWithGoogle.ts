import { signIn } from 'next-auth/react';

export async function loginWithGoogle() {
  await signIn('google', { callbackUrl: '/dashboard' });
}
