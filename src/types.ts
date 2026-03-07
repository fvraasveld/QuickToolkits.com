export type ToolCategory = 'Text' | 'File' | 'Developer' | 'Calculator' | 'Creative';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
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
  favoriteTools: string[];
}

export interface ToolHistory {
  toolId: string;
  timestamp: string;
  input?: string;
  output?: string;
}
