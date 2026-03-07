import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../../types';
import { getCategoryColor } from '../../utils/helpers';
import { useUser } from '../../context/UserContext';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { user, toggleFavorite } = useUser();
  const isFavorite = user.favoriteTools.includes(tool.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.id);
  };

  return (
    <Link to={tool.pagePath} className="block">
      <div className="tool-card group relative">
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10"
        >
          <span className={`text-lg transition-transform ${isFavorite ? 'scale-125' : 'scale-100'}`}>
            {isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Icon */}
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {tool.icon}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-display font-semibold text-lg text-dark-900 group-hover:text-primary-600 transition-colors">
              {tool.name}
            </h3>
          </div>

          <p className="text-dark-600 text-sm line-clamp-2">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex items-center space-x-2 pt-2">
            <span className={`category-badge border ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
            {tool.premium ? (
              <span className="badge badge-premium">
                👑 Premium
              </span>
            ) : (
              <span className="badge badge-free">
                Free
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
