import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME } from '../../utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🛠️</span>
              </div>
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
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-dark-300 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400 text-sm">
          <p>
            &copy; {currentYear} {SITE_NAME}. All rights reserved. Made with ❤️ for developers
            and creators.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
