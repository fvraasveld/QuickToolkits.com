import React from 'react';
import { SITE_CONFIG } from '../../utils/constants';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
          <p>
            Welcome to {SITE_CONFIG.NAME}. We respect your privacy and are committed to 
            protecting your personal data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
          <p className="mb-2">We may collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>IP address (anonymized)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide and maintain our services</li>
            <li>To improve user experience</li>
            <li>To analyze usage and improve our website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Data Storage</h2>
          <p>
            Most data (tool history, favorites) is stored locally in your browser using 
            localStorage. This data never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Contact Us</h2>
          <p>
            Questions about this Privacy Policy? Contact us at{' '}
            <a href={`mailto:${SITE_CONFIG.SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
              {SITE_CONFIG.SUPPORT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
