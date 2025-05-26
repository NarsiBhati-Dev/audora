import React from 'react';
import TableOfContents from '@/components/Legal/table-of-contents';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Privacy Policy',
  description:
    'This Privacy Policy explains how Audora collects, uses, and protects your personal data when you use our platform.',
});

const privacyPolicySections = [
  { id: 'information-we-collect', title: 'Information We Collect' },
  { id: 'how-we-use', title: 'How We Use Your Information' },
  { id: 'data-sharing', title: 'Data Sharing and Disclosure' },
  { id: 'your-rights', title: 'Your Rights and Choices' },
  { id: 'data-security', title: 'Data Security' },
  { id: 'international-transfers', title: 'International Data Transfers' },
  { id: 'children-privacy', title: `Children's Privacy` },
  { id: 'policy-changes', title: 'Changes to This Policy' },
  { id: 'contact-us', title: 'Contact Us' },
];

const PrivacyPolicyPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='prose prose-slate mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-5xl font-bold text-gray-900'>
            Privacy Policy
          </h1>
          <p className='text-sm text-gray-500'>Last Updated: May 7, 2025</p>
        </div>

        <div className='space-y-16'>
          <section>
            <p className='text-xl leading-relaxed text-gray-700'>
              Welcome to Audora. We are committed to protecting your personal
              data and your privacy rights. This Privacy Policy explains how we
              collect, use, share, and protect your information when you use our
              platform.
            </p>
          </section>

          {/* Table of Contents */}
          <TableOfContents sections={privacyPolicySections} />

          <section id='information-we-collect' className='space-y-8'>
            <h2 className='text-3xl font-bold text-gray-900'>
              1. Information We Collect
            </h2>
            <div className='space-y-8'>
              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  1.1 Information You Provide
                </h3>
                <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                  <li>Account information (name, email, password)</li>
                  <li>Profile information (profile picture, bio)</li>
                  <li>
                    Payment information (credit card details, billing address)
                  </li>
                  <li>
                    Content you create or upload (audio recordings, comments)
                  </li>
                  <li>Communications with us (support tickets, feedback)</li>
                </ul>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  1.2 Automatically Collected Information
                </h3>
                <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                  <li>
                    Device information (IP address, browser type, operating
                    system)
                  </li>
                  <li>Usage data (pages visited, features used, time spent)</li>
                  <li>Location data (if permitted by your device settings)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section id='how-we-use' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              2. How We Use Your Information
            </h2>
            <div className='space-y-4'>
              <p className='text-lg text-gray-700'>
                We use your data for the following purposes:
              </p>
              <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and manage your account</li>
                <li>Send you important service updates and notifications</li>
                <li>Respond to your comments and support requests</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Prevent fraud and enhance security</li>
                <li>Comply with legal obligations</li>
                <li>{`Analyze and improve our platform's performance`}</li>
              </ul>
            </div>
          </section>

          <section id='data-sharing' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              3. Data Sharing and Disclosure
            </h2>
            <div className='space-y-4'>
              <p className='text-lg text-gray-700'>
                We may share your information with:
              </p>
              <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                <li>
                  Service providers (hosting, payment processing, analytics)
                </li>
                <li>Business partners (with your consent)</li>
                <li>Legal authorities (when required by law)</li>
                <li>Other users (based on your privacy settings)</li>
              </ul>
              <p className='mt-4 text-sm text-gray-600'>
                All third parties are contractually bound to protect your data
                and use it only for specified purposes.
              </p>
            </div>
          </section>

          <section id='your-rights' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              4. Your Rights and Choices
            </h2>
            <div className='space-y-4'>
              <p className='text-lg text-gray-700'>
                You have the following rights regarding your data:
              </p>
              <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p className='mt-4 text-lg'>
                To exercise these rights, contact us at{' '}
                <a
                  href='mailto:privacy@audora.xyz'
                  className='font-medium text-blue-600 transition-colors hover:text-blue-800'
                >
                  privacy@audora.xyz
                </a>
              </p>
            </div>
          </section>

          <section id='data-security' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              5. Data Security
            </h2>
            <p className='mb-4 text-lg text-gray-700'>
              We implement industry-standard security measures to protect your
              data, including:
            </p>
            <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and backup systems</li>
            </ul>
          </section>

          <section id='international-transfers' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              6. International Data Transfers
            </h2>
            <p className='text-lg text-gray-700'>
              Your data may be transferred and processed in countries other than
              your own. We ensure appropriate safeguards are in place for such
              transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section id='children-privacy' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              7. {` Children's Privacy`}
            </h2>
            <p className='text-lg text-gray-700'>
              Our services are not intended for children under 13. We do not
              knowingly collect or maintain information from children under 13.
              If we learn we have collected such information, we will promptly
              delete it.
            </p>
          </section>

          <section id='policy-changes' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              8. Changes to This Policy
            </h2>
            <p className='text-lg text-gray-700'>
              We may update this Privacy Policy periodically. We will notify you
              of significant changes through our website or email. Continued use
              of our services after such changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section id='contact-us' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>9. Contact Us</h2>
            <p className='text-lg text-gray-700'>
              For any questions about this Privacy Policy or your data, please
              contact us at: <br />
              <a
                href='mailto:privacy@audora.xyz'
                className='font-medium text-blue-600 transition-colors hover:text-blue-800'
              >
                privacy@audora.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
