import { signIn } from 'next-auth/react';
import siteMetadata from '../seo/siteMetadata';

export async function loginWithGoogle() {
  await signIn('google', { callbackUrl: siteMetadata.dashboard });
}
