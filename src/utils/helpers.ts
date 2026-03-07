import { Tool } from '../types';

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

/**
 * Download text as a file
 */
export const downloadAsFile = (content: string, filename: string, type: string = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Get tool by ID
 */
export const getToolById = (tools: Tool[], id: string): Tool | undefined => {
  return tools.find(tool => tool.id === id);
};

/**
 * Filter tools by category
 */
export const filterToolsByCategory = (tools: Tool[], category: string): Tool[] => {
  if (category === 'All') return tools;
  return tools.filter(tool => tool.category === category);
};

/**
 * Search tools by query
 */
export const searchTools = (tools: Tool[], query: string): Tool[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return tools;
  
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery) ||
    tool.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get category color
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Text': 'bg-blue-100 text-blue-700 border-blue-200',
    'File': 'bg-purple-100 text-purple-700 border-purple-200',
    'Developer': 'bg-green-100 text-green-700 border-green-200',
    'Calculator': 'bg-orange-100 text-orange-700 border-orange-200',
    'Creative': 'bg-pink-100 text-pink-700 border-pink-200',
  };
  return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'Text': '📝',
    'File': '📁',
    'Developer': '💻',
    'Calculator': '🧮',
    'Creative': '🎨',
  };
  return icons[category] || '🔧';
};
