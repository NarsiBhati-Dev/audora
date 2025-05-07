import React from "react";

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="prose prose-slate max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-500">Last Updated: May 7, 2025</p>
        </div>

        <div className="space-y-16">
          <section>
            <p className="text-xl text-gray-700 leading-relaxed">
              Welcome to Audora. These Terms and Conditions govern your use of
              our platform and services. By accessing or using Audora, you agree
              to be bound by these terms.
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
                    href="#acceptance"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">1.</span>
                    <span className="ml-3 text-gray-700">
                      Acceptance of Terms
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">2.</span>
                    <span className="ml-3 text-gray-700">
                      Services and Features
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#accounts"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">3.</span>
                    <span className="ml-3 text-gray-700">User Accounts</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#content"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">4.</span>
                    <span className="ml-3 text-gray-700">User Content</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#payments"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">5.</span>
                    <span className="ml-3 text-gray-700">
                      Payments and Subscriptions
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#prohibited"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">6.</span>
                    <span className="ml-3 text-gray-700">
                      Prohibited Activities
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#intellectual"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">7.</span>
                    <span className="ml-3 text-gray-700">
                      Intellectual Property
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#termination"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">8.</span>
                    <span className="ml-3 text-gray-700">Termination</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#liability"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">9.</span>
                    <span className="ml-3 text-gray-700">
                      Limitation of Liability
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#changes"
                    className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  >
                    <span className="text-blue-600 font-medium">10.</span>
                    <span className="ml-3 text-gray-700">Changes to Terms</span>
                  </a>
                </li>
              </ul>
            </nav>
          </section>

          <section id="acceptance" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              1. Acceptance of Terms
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                By accessing or using Audora, you agree to be bound by these
                Terms and Conditions. If you do not agree to these terms, please
                do not use our services.
              </p>
              <p className="text-gray-700 text-lg">
                We reserve the right to modify these terms at any time.
                Continued use of our services after such modifications
                constitutes acceptance of the updated terms.
              </p>
            </div>
          </section>

          <section id="services" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              2. Services and Features
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                Audora provides the following services:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Audio recording and sharing platform</li>
                <li>User profile management</li>
                <li>Content creation and distribution</li>
                <li>Community interaction features</li>
                <li>Premium subscription services</li>
              </ul>
              <p className="text-gray-700 text-lg mt-4">
                We reserve the right to modify, suspend, or discontinue any
                aspect of our services at any time without prior notice.
              </p>
            </div>
          </section>

          <section id="accounts" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              3. User Accounts
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                To use certain features of Audora, you must:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Be at least 13 years old</li>
                <li>Register for an account with accurate information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
              <p className="text-gray-700 text-lg mt-4">
                We reserve the right to suspend or terminate accounts that
                violate these terms or engage in fraudulent activity.
              </p>
            </div>
          </section>

          <section id="content" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              4. User Content
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                You retain ownership of content you create and share on Audora.
                However, you grant us a license to use, modify, and distribute
                your content for the purpose of providing our services.
              </p>
              <p className="text-gray-700 text-lg">
                You are responsible for ensuring your content:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Does not violate any laws or third-party rights</li>
                <li>Is not defamatory or harmful</li>
                <li>Does not contain unauthorized copyrighted material</li>
                <li>Complies with our content guidelines</li>
              </ul>
            </div>
          </section>

          <section id="payments" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              5. Payments and Subscriptions
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                Premium features and subscriptions are subject to the following
                terms:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>All fees are non-refundable unless required by law</li>
                <li>Subscriptions automatically renew unless cancelled</li>
                <li>We may change subscription fees with notice</li>
                <li>Payment information must be accurate and current</li>
              </ul>
            </div>
          </section>

          <section id="prohibited" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              6. Prohibited Activities
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                Users are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating others or providing false information</li>
                <li>Harassing, threatening, or abusing other users</li>
                <li>Uploading malicious code or engaging in hacking</li>
                <li>Attempting to access restricted areas of the service</li>
                <li>Using automated systems to access the service</li>
              </ul>
            </div>
          </section>

          <section id="intellectual" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              7. Intellectual Property
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                All content, features, and functionality of Audora are owned by
                us or our licensors and are protected by intellectual property
                laws. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Copy or modify our platform or services</li>
                <li>Use our trademarks or branding without permission</li>
                <li>Reverse engineer our technology</li>
                <li>Remove any copyright or proprietary notices</li>
              </ul>
            </div>
          </section>

          <section id="termination" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">8. Termination</h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                We may terminate or suspend your access to Audora:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>For violations of these terms</li>
                <li>For fraudulent or illegal activity</li>
                <li>At our sole discretion, with or without cause</li>
                <li>Upon your request to delete your account</li>
              </ul>
            </div>
          </section>

          <section id="liability" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              9. Limitation of Liability
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                To the maximum extent permitted by law, Audora shall not be
                liable for:
              </p>
              <ul className="list-disc pl-6 space-y-3 text-gray-700 text-lg">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits or data</li>
                <li>Service interruptions or errors</li>
                <li>User content or third-party actions</li>
              </ul>
            </div>
          </section>

          <section id="changes" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              10. Changes to Terms
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                We may update these terms from time to time. We will notify you
                of significant changes through our website or email. Continued
                use of our services after such changes constitutes acceptance of
                the updated terms.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-700 text-lg">
              If you have any questions about these Terms and Conditions, please
              contact us at: <br />
              <a
                href="mailto:legal@audora.xyz"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                legal@audora.xyz
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
