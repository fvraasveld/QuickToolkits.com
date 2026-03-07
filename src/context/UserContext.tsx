import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, ToolHistory } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
  isPremium: boolean;
  addToolToHistory: (toolId: string) => void;
  toggleFavorite: (toolId: string) => void;
  history: ToolHistory[];
  upgradeToPremium: () => void;
}

const defaultUser: User = {
  isPremium: false,
  toolsUsed: [],
  favoriteTools: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useLocalStorage<User>(STORAGE_KEYS.USER, defaultUser);
  const [history, setHistory] = useLocalStorage<ToolHistory[]>(STORAGE_KEYS.HISTORY, []);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const addToolToHistory = (toolId: string) => {
    // Add to used tools if not already there
    if (!user.toolsUsed.includes(toolId)) {
      setUserState({
        ...user,
        toolsUsed: [...user.toolsUsed, toolId],
      });
    }

    // Add to history
    const newHistoryItem: ToolHistory = {
      toolId,
      timestamp: new Date().toISOString(),
    };
    setHistory([newHistoryItem, ...history.slice(0, 49)]); // Keep last 50 items
  };

  const toggleFavorite = (toolId: string) => {
    const isFavorite = user.favoriteTools.includes(toolId);
    const newFavorites = isFavorite
      ? user.favoriteTools.filter(id => id !== toolId)
      : [...user.favoriteTools, toolId];

    setUserState({
      ...user,
      favoriteTools: newFavorites,
    });
  };

  const upgradeToPremium = () => {
    setUserState({
      ...user,
      isPremium: true,
    });
  };

  const value: UserContextType = {
    user,
    setUser,
    isPremium: user.isPremium,
    addToolToHistory,
    toggleFavorite,
    history,
    upgradeToPremium,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
