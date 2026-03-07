import React, { useState } from 'react';
import { SITE_CONFIG } from '../../utils/constants';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <a href={`mailto:${SITE_CONFIG.SUPPORT_EMAIL}`} className="text-blue-600 hover:underline">
                {SITE_CONFIG.SUPPORT_EMAIL}
              </a>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Response Time</h3>
              <p className="text-gray-600">We typically respond within 24-48 hours</p>
            </div>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Send Message
            </button>
            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                Thank you! We'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
