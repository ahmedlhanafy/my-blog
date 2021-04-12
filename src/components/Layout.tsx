import { ThemeContext } from '../hooks/useTheme';
import { lightTheme, styled } from '../stitches.config';
import { Footer } from './Footer';
import { IconsBackground } from './IconsBackground';
import Head from 'next/head';
import React, { createContext, ReactNode, useContext } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
  defaultTheme: 'dark' | 'light';
};

const Layout = ({
  children,
  title = 'This is the default title',
  defaultTheme,
}: Props) => {
  const [isDark, setIsDark] = React.useState(defaultTheme === 'dark');

  return (
    <ThemeContext.Provider
      value={{ isDark, toggle: () => setIsDark((state) => !state) }}
    >
      <ThemeContext.Consumer>
        {({ isDark }) => (
          <Container
            id="container"
            className={isDark ? '' : lightTheme.toString()}
          >
            <Head>
              <title>{title}</title>
            </Head>
            <Background />
            <IconsBackground />
            {children}
            <Footer />
          </Container>
        )}
      </ThemeContext.Consumer>
    </ThemeContext.Provider>
  );
};

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  transform: 'translateZ(0)',
  willChange: 'clip-path',
  backgroundClip: 'border-box',
  // maskClip: 'border-box',
  clipRule: 'nonzero',
  WebkitMaskClip: 'border-box',
});

const Background = styled('div', {
  absoluteFill: 0,
  zIndex: -1,
  backgroundColor: '$background',
  backgroundImage: '$backgroundShapes',
});

export default Layout;
