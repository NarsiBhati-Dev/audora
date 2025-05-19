import React from 'react';
import RegisterPageWrapper from '@/components/auth/register/register-page-wrapper';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Register',
  description: 'Register to your Audora account',
});

const RegisterPage = () => {
  return <RegisterPageWrapper />;
};

export default RegisterPage;
