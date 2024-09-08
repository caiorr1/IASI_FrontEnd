import React, { createContext, useContext, useState, ReactNode } from 'react';

// Adicione 'PasswordReset' ao tipo de tela possível
type ScreenName = 'Home' | 'Register' | 'Login' | 'Dashboard' | 'PasswordReset';

interface NavigationContextType {
  currentScreen: ScreenName;
  navigateTo: (screen: ScreenName) => void;
  lastRegisteredEmail: string | null;
  setLastRegisteredEmail: (email: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState<string | null>(null);

  const navigateTo = (screen: ScreenName) => {
    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigateTo, lastRegisteredEmail, setLastRegisteredEmail }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de um NavigationProvider');
  }
  return context;
};
