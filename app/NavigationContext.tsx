import React, { createContext, useContext, useState, ReactNode } from 'react';

type ScreenName = 'Home' | 'Register' | 'Login' | 'Dashboard' | 'PasswordReset' | 'AddIndustry' | 'EditIndustry';

interface NavigationContextType {
  currentScreen: ScreenName;
  navigateTo: (screen: ScreenName, params?: any) => void;
  lastRegisteredEmail: string | null;
  setLastRegisteredEmail: (email: string) => void;
  authToken: string | null;
  setAuthToken: (token: string) => void;
  screenParams: any;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Home');
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [screenParams, setScreenParams] = useState<any>(null);

  const navigateTo = (screen: ScreenName, params?: any) => {
    setCurrentScreen(screen);
    setScreenParams(params || null);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigateTo,
        lastRegisteredEmail,
        setLastRegisteredEmail,
        authToken,
        setAuthToken,
        screenParams,
      }}
    >
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
