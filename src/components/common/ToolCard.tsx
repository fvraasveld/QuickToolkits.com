import React from 'react';
import { Link } from 'react-router-dom';
import { Tool } from '../../types';
import { getCategoryColor } from '../../utils/helpers';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <Link to={tool.pagePath} className="block">
      <div className="tool-card group relative">
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

          {/* Category Badge */}
          <div className="flex items-center space-x-2 pt-2">
            <span className={`category-badge border ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
