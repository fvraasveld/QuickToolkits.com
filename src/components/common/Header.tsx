import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { SITE_NAME } from '../../utils/constants';

const Header: React.FC = () => {
  const { isPremium, upgradeToPremium } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpgrade = () => {
    // Demo upgrade - in production, this would open a payment modal
    upgradeToPremium();
    alert('🎉 Upgraded to Premium! You now have access to all tools.');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-dark-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/quicktoolkits.png" 
                alt={SITE_NAME}
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="text-xl font-display font-bold text-dark-900 hidden sm:block">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/tools"
              className="text-dark-600 hover:text-primary-600 font-medium transition-colors"
            >
              All Tools
            </Link>
            {!isPremium && (
              <button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                ⭐ Upgrade to Premium
              </button>
            )}
            {isPremium && (
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1">
                <span>👑</span>
                <span>Premium</span>
              </span>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-dark-100 animate-slide-up">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-dark-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tools"
                className="text-dark-600 hover:text-primary-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-dark-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Tools
              </Link>
              {!isPremium && (
                <button
                  onClick={() => {
                    handleUpgrade();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-2 rounded-lg font-medium text-left"
                >
                  ⭐ Upgrade to Premium
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
