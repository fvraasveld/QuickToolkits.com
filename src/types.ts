export type ToolCategory = 'Text' | 'Developer' | 'Calculator' | 'Converter' | 'Creative' | 'Productivity' | 'Financial';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory; // Primary category
  categories?: ToolCategory[]; // Multiple categories support
  description: string;
  exampleInput?: string;
  free: boolean;
  premium?: boolean;
  pagePath: string;
  icon: string;
  createdAt: string;
  lastUpdated?: string;
  tags?: string[];
}

export interface User {
  id?: string;
  email?: string;
  isPremium: boolean;
  toolsUsed: string[];
}

export interface ToolHistory {
  toolId: string;
  timestamp: string;
  input?: string;
  output?: string;
}
