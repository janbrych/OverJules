import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppId = 'home' | 'docs' | 'instagram' | 'whatsapp' | 'settings' | 'overlay-settings';

interface PhoneContextType {
  currentApp: AppId;
  setCurrentApp: (app: AppId) => void;
  isAiMode: boolean;
  setIsAiMode: (active: boolean) => void;
  colorScheme: 'rainbow' | 'grey' | 'pastel' | 'custom';
  setColorScheme: (scheme: 'rainbow' | 'grey' | 'pastel' | 'custom') => void;
  customColors: string[];
  setCustomColors: (colors: string[]) => void;
}

const PhoneContext = createContext<PhoneContextType | undefined>(undefined);

export const PhoneProvider = ({ children }: { children: ReactNode }) => {
  const [currentApp, setCurrentApp] = useState<AppId>('home');
  const [isAiMode, setIsAiMode] = useState(false);
  const [colorScheme, setColorScheme] = useState<'rainbow' | 'grey' | 'pastel' | 'custom'>('rainbow');
  const [customColors, setCustomColors] = useState<string[]>(['#ff0000', '#00ff00', '#0000ff']);

  return (
    <PhoneContext.Provider
      value={{
        currentApp,
        setCurrentApp,
        isAiMode,
        setIsAiMode,
        colorScheme,
        setColorScheme,
        customColors,
        setCustomColors
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) throw new Error('usePhone must be used within a PhoneProvider');
  return context;
};
