import { useTheme } from '../hooks/useTheme';
import { lightTheme, styled } from '../stitches.config';
import { Footer } from './Footer';
import { IconsBackground } from './IconsBackground';
import Head from 'next/head';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title: string;
};

const Layout = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<HTMLDivElement>) => {
    const { children, title } = props;
    const { isDark } = useTheme();
    return (
      <Container ref={ref} className={isDark ? '' : lightTheme.toString()}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </Head>
        <Background />
        <IconsBackground />
        {children}
        <Footer />
      </Container>
    );
  },
);

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
