'use client';

import { useState } from 'react';
import RegisterWithForm from '@/components/auth/register/register-with-form';
import RegisterWithOAuth from './register-with-oauth';

export default function AuthSwitcher() {
  const [view, setView] = useState<'oauth' | 'email'>('oauth');

  return (
    <>
      {view === 'oauth' ? (
        <RegisterWithOAuth onEmailClick={() => setView('email')} />
      ) : (
        <RegisterWithForm onBack={() => setView('oauth')} />
      )}
    </>
  );
}
