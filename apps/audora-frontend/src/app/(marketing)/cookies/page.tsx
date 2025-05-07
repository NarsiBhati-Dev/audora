import React from "react";

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="prose prose-slate max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-500">Last Updated: May 7, 2025</p>
        </div>

        <div className="space-y-12">
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed">
              This Cookie Policy explains how Audora uses cookies and similar
              technologies to recognize you when you visit our website. It
              explains what these technologies are and why we use them, as well
              as your rights to control our use of them.
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Table of Contents
            </h2>
            <nav>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <a
                    href="#what-are-cookies"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">1.</span>
                    <span className="ml-2 text-gray-700">What Are Cookies</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#types-of-cookies"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">2.</span>
                    <span className="ml-2 text-gray-700">
                      Types of Cookies We Use
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#how-we-use"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">3.</span>
                    <span className="ml-2 text-gray-700">
                      How We Use Cookies
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#third-party"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">4.</span>
                    <span className="ml-2 text-gray-700">
                      Third-Party Cookies
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#cookie-controls"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">5.</span>
                    <span className="ml-2 text-gray-700">Cookie Controls</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#updates"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">6.</span>
                    <span className="ml-2 text-gray-700">
                      Updates to This Policy
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-blue-600 font-medium">7.</span>
                    <span className="ml-2 text-gray-700">Contact Us</span>
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          <section
            id="what-are-cookies"
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. What Are Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide useful information
              to website owners.
            </p>
            <p className="text-gray-700">
              {`Cookies can be "persistent" or "session" cookies. Persistent
              cookies remain on your device when you go offline, while session
              cookies are deleted as soon as you close your web browser.`}
            </p>
          </section>

          <section
            id="types-of-cookies"
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              2. Types of Cookies We Use
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2.1 Essential Cookies
                </h3>
                <p className="text-gray-700">
                  These cookies are necessary for the website to function
                  properly. They enable basic functions like page navigation and
                  access to secure areas of the website.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2.2 Performance Cookies
                </h3>
                <p className="text-gray-700">
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2.3 Functionality Cookies
                </h3>
                <p className="text-gray-700">
                  These cookies enable enhanced functionality and
                  personalization, such as remembering your preferences and
                  settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2.4 Targeting Cookies
                </h3>
                <p className="text-gray-700">
                  These cookies are used to track visitors across websites to
                  display relevant advertisements.
                </p>
              </div>
            </div>
          </section>

          <section
            id="how-we-use"
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              3. How We Use Cookies
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To provide you with a better user experience</li>
                <li>To remember your preferences and settings</li>
                <li>To analyze how our website is used</li>
                <li>To personalize content and advertisements</li>
                <li>{`To improve our website's performance`}</li>
                <li>To ensure security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section
            id="third-party"
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Third-Party Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              In addition to our own cookies, we may also use various
              third-party cookies to report usage statistics of the website,
              deliver advertisements on and through the website, and so on.
            </p>
            <p className="text-gray-700">
              These third-party cookies are subject to their respective privacy
              policies. We recommend reviewing the privacy policies of these
              third parties for more information.
            </p>
          </section>

          <section
            id="cookie-controls"
            className="bg-white rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              5. Cookie Controls
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                You can control and/or delete cookies as you wish. You can
                delete all cookies that are already on your computer and you can
                set most browsers to prevent them from being placed.
              </p>
              <p className="text-gray-700">
                To manage your cookie preferences, you can:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use our cookie consent tool</li>
                <li>Adjust your browser settings</li>
                <li>Use privacy-focused browser extensions</li>
                <li>Clear your browser cookies regularly</li>
              </ul>
            </div>
          </section>

          <section id="updates" className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Updates to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. Please visit this Cookie Policy regularly to
              stay informed about our use of cookies and related technologies.
            </p>
          </section>

          <section id="contact" className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies or other
              technologies, please contact us at: <br />
              <a
                href="mailto:privacy@audora.xyz"
                className="text-blue-600 hover:text-blue-800 transition-colors"
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
