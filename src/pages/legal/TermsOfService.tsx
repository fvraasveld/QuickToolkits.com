import React from 'react';
import { SITE_CONFIG } from '../../utils/constants';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing {SITE_CONFIG.NAME}, you accept and agree to be bound by these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
          <p>
            Permission is granted to use the tools on {SITE_CONFIG.NAME} for personal, 
            non-commercial use only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
          <p>
            The tools are provided "as is". {SITE_CONFIG.NAME} makes no warranties, 
            expressed or implied.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
          <p>
            {SITE_CONFIG.NAME} shall not be liable for any damages arising from the use 
            or inability to use our tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Contact</h2>
          <p>
            Questions? Email us at{' '}
            <a href={`mailto:${SITE_CONFIG.SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
              {SITE_CONFIG.SUPPORT_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
