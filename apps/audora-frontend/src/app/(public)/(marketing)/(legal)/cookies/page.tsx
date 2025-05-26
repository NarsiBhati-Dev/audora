import React from 'react';
import TableOfContents from '@/components/Legal/table-of-contents';
import getPageMetadata from '@/lib/seo/getPageMetadata';

export const metadata = getPageMetadata({
  title: 'Audora Cookie Policy',
  description:
    'This Cookie Policy explains how Audora uses cookies and similar technologies to recognize you when you visit our website.',
});

const cookieSections = [
  { id: 'what-are-cookies', title: 'What Are Cookies' },
  { id: 'types-of-cookies', title: 'Types of Cookies We Use' },
  { id: 'how-we-use', title: 'How We Use Cookies' },
  { id: 'third-party', title: 'Third-Party Cookies' },
  { id: 'cookie-controls', title: 'Cookie Controls' },
  { id: 'updates', title: 'Updates to This Policy' },
  { id: 'contact', title: 'Contact Us' },
];

const CookiesPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='prose prose-slate mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-5xl font-bold text-gray-900'>
            Cookie Policy
          </h1>
          <p className='text-sm text-gray-500'>Last Updated: May 7, 2025</p>
        </div>

        <div className='space-y-16'>
          <section>
            <p className='text-xl leading-relaxed text-gray-700'>
              This Cookie Policy explains how Audora uses cookies and similar
              technologies to recognize you when you visit our website. It
              explains what these technologies are and why we use them, as well
              as your rights to control our use of them.
            </p>
          </section>

          {/* Table of Contents */}
          <TableOfContents sections={cookieSections} />

          <section id='what-are-cookies' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              1. What Are Cookies
            </h2>
            <p className='text-lg text-gray-700'>
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide useful information
              to website owners.
            </p>
            <p className='text-lg text-gray-700'>
              {`Cookies can be "persistent" or "session" cookies. Persistent
              cookies remain on your device when you go offline, while session
              cookies are deleted as soon as you close your web browser.`}
            </p>
          </section>

          <section id='types-of-cookies' className='space-y-8'>
            <h2 className='text-3xl font-bold text-gray-900'>
              2. Types of Cookies We Use
            </h2>
            <div className='space-y-8'>
              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  2.1 Essential Cookies
                </h3>
                <p className='text-lg text-gray-700'>
                  These cookies are necessary for the website to function
                  properly. They enable basic functions like page navigation and
                  access to secure areas of the website.
                </p>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  2.2 Performance Cookies
                </h3>
                <p className='text-lg text-gray-700'>
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously.
                </p>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  2.3 Functionality Cookies
                </h3>
                <p className='text-lg text-gray-700'>
                  These cookies enable enhanced functionality and
                  personalization, such as remembering your preferences and
                  settings.
                </p>
              </div>

              <div>
                <h3 className='mb-3 text-xl font-semibold text-gray-800'>
                  2.4 Targeting Cookies
                </h3>
                <p className='text-lg text-gray-700'>
                  These cookies are used to track visitors across websites to
                  display relevant advertisements.
                </p>
              </div>
            </div>
          </section>

          <section id='how-we-use' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              3. How We Use Cookies
            </h2>
            <div className='space-y-4'>
              <p className='text-lg text-gray-700'>
                We use cookies for the following purposes:
              </p>
              <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                <li>To provide you with a better user experience</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how our website is used</li>
                <li>To personalize content and advertisements</li>
                <li>{`To improve our website's performance`}</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section id='third-party' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              4. Third-Party Cookies
            </h2>
            <p className='text-lg text-gray-700'>
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics of the website,
              deliver advertisements on and through the website, and so on.
            </p>
            <p className='text-lg text-gray-700'>
              These third-party cookies are subject to their respective privacy
              policies. We recommend reviewing the privacy policies of these
              third parties for more information.
            </p>
          </section>

          <section id='cookie-controls' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              5. Cookie Controls
            </h2>
            <div className='space-y-4'>
              <p className='text-lg text-gray-700'>
                You can control and/or delete cookies as you wish. You can
                delete all cookies that are already on your computer and you can
                set most browsers to prevent them from being placed.
              </p>
              <p className='text-lg text-gray-700'>
                To manage your cookie preferences, you can:
              </p>
              <ul className='list-disc space-y-3 pl-6 text-lg text-gray-700'>
                <li>Use our cookie consent tool</li>
                <li>Adjust your browser settings</li>
                <li>Use privacy-focused browser extensions</li>
                <li>Clear your browser cookies regularly</li>
              </ul>
            </div>
          </section>

          <section id='updates' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>
              6. Updates to This Policy
            </h2>
            <p className='text-lg text-gray-700'>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. Please visit this Cookie Policy regularly to
              stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section id='contact' className='space-y-6'>
            <h2 className='text-3xl font-bold text-gray-900'>7. Contact Us</h2>
            <p className='text-lg text-gray-700'>
              If you have any questions about our use of cookies or other
              technologies, please contact us at: <br />
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

export default CookiesPage;
