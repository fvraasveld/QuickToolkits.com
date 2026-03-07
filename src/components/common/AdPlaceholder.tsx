import React from 'react';
import { useUser } from '../../context/UserContext';

interface AdPlaceholderProps {
  slot: string;
  height?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ slot, height = '90px' }) => {
  const { isPremium } = useUser();

  // Don't show ads to premium users
  if (isPremium) {
    return null;
  }

  return (
    <div
      className="bg-gradient-to-r from-dark-100 to-dark-50 rounded-xl border-2 border-dashed border-dark-200 flex items-center justify-center text-dark-400 text-sm font-medium my-4"
      style={{ height }}
    >
      <div className="text-center">
        <p>📢 Advertisement Space</p>
        <p className="text-xs mt-1">Google AdSense: {slot}</p>
        <p className="text-xs text-dark-300 mt-2">
          Upgrade to Premium to remove ads
        </p>
      </div>
    </div>
  );
};

export default AdPlaceholder;
