import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/quicktoolkits.png" 
                alt={SITE_NAME}
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-display font-bold">{SITE_NAME}</span>
            </div>
            <p className="text-dark-300 text-sm">
              Your all-in-one platform for free online tools and utilities.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tools</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li>
                <Link to="/tools" className="hover:text-white transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/?category=Text" className="hover:text-white transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link to="/?category=Developer" className="hover:text-white transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link to="/?category=Calculator" className="hover:text-white transition-colors">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400 text-sm">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved. Made with ❤️ for developers and creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
