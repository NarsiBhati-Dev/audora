import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen">
      <div className="prose prose-slate max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">Last Updated: May 7, 2025</p>
        </div>

        <div className="space-y-16">
          <section>
            <p className="text-xl text-gray-700 leading-relaxed">
              Welcome to Audora. We are committed to protecting your personal
              data and your privacy rights. This Privacy Policy explains how we
              collect, use, share, and protect your information when you use our
              platform.
            </p>
          </section>

          <section className="rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Table of Contents
            </h2>
            <nav>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li>
                  <a
                    href="#information-we-collect"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">1.</span>
                    <span className="ml-3 text-gray-700">
                      Information We Collect
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#how-we-use"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">2.</span>
                    <span className="ml-3 text-gray-700">
                      How We Use Your Information
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#data-sharing"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">3.</span>
                    <span className="ml-3 text-gray-700">
                      Data Sharing and Disclosure
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#your-rights"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">4.</span>
                    <span className="ml-3 text-gray-700">
                      Your Rights and Choices
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#data-security"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">5.</span>
                    <span className="ml-3 text-gray-700">Data Security</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#international-transfers"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">6.</span>
                    <span className="ml-3 text-gray-700">
                      International Data Transfers
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#children-privacy"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">7.</span>
                    <span className="ml-3 text-gray-700">
                      {`Children's Privacy`}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#policy-changes"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">8.</span>
                    <span className="ml-3 text-gray-700">
                      Changes to This Policy
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-us"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">9.</span>
                    <span className="ml-3 text-gray-700">Contact Us</span>
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          <section id="information-we-collect" className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">
              1. Information We Collect
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  1.1 Information You Provide
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
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
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  1.2 Automatically Collected Information
                </h3>
                <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
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

          <section id="how-we-use" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                We use your data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
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

          <section id="data-sharing" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              3. Data Sharing and Disclosure
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>
                  Service providers (hosting, payment processing, analytics)
                </li>
                <li>Business partners (with your consent)</li>
                <li>Legal authorities (when required by law)</li>
                <li>Other users (based on your privacy settings)</li>
              </ul>
              <p className="text-sm text-gray-600 mt-4">
                All third parties are contractually bound to protect your data
                and use it only for specified purposes.
              </p>
            </div>
          </section>

          <section id="your-rights" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              4. Your Rights and Choices
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request data deletion</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
              <p className="mt-4 text-lg">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@audora.xyz"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  privacy@audora.xyz
                </a>
              </p>
            </div>
          </section>

          <section id="data-security" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              5. Data Security
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              We implement industry-standard security measures to protect your
              data, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments</li>
              <li>Access controls and authentication</li>
              <li>Secure data storage and backup systems</li>
            </ul>
          </section>

          <section id="international-transfers" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              6. International Data Transfers
            </h2>
            <p className="text-gray-700 text-lg">
              Your data may be transferred and processed in countries other than
              your own. We ensure appropriate safeguards are in place for such
              transfers in compliance with applicable data protection laws.
            </p>
          </section>

          <section id="children-privacy" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              7. {` Children's Privacy`}
            </h2>
            <p className="text-gray-700 text-lg">
              Our services are not intended for children under 13. We do not
              knowingly collect or maintain information from children under 13.
              If we learn we have collected such information, we will promptly
              delete it.
            </p>
          </section>

          <section id="policy-changes" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 text-lg">
              We may update this Privacy Policy periodically. We will notify you
              of significant changes through our website or email. Continued use
              of our services after such changes constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <section id="contact-us" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">9. Contact Us</h2>
            <p className="text-gray-700 text-lg">
              For any questions about this Privacy Policy or your data, please
              contact us at: <br />
              <a
                href="mailto:privacy@audora.xyz"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
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
