import { ThemeContext } from '../hooks/useTheme';
import { NextRouter, useRouter as useNextRouter } from 'next/dist/client/router';
import React, { useContext } from 'react';

const RouterContext = React.createContext<NextRouter>(null);

type Input = {
  isDark: boolean;
  toggle: () => void;
  router?: NextRouter;
  children: React.ReactNode;
};

export const CustomProvider = (input: Input) => {
  const { isDark, toggle, router, children } = input;
  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
    </ThemeContext.Provider>
  );
};

export const useRouter = () => {
  const router = useNextRouter();
  const mockRouter = useContext(RouterContext);

  return router ?? mockRouter;
};
