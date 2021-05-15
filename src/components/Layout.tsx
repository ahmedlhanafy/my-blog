import { useTheme } from '../hooks/useTheme';
import { lightTheme, styled } from '../stitches.config';
import { Footer } from './Footer';
import { Header } from './Header';
import { IconsBackground } from './IconsBackground';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import ReactGA from 'react-ga';

type Props = {
  children?: ReactNode;
  title: string;
  addBackgroundIcons?: boolean;
  addHeader?: false | { rootElement: JSX.Element };
  addFooter?: boolean;
};

const Layout = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<HTMLDivElement>) => {
    const {
      children,
      title,
      addHeader,
      addBackgroundIcons,
      addFooter = true,
    } = props;
    const { isDark } = useTheme();
    const containerRef = React.useRef<HTMLDivElement>();
    const actualRef = ref ?? containerRef;

    React.useEffect(() => {
      if (process.env.NODE_ENV === 'production')
        ReactGA.pageview(window.location.pathname);
    }, []);

    return (
      <Container
        ref={actualRef}
        className={isDark ? '' : lightTheme.toString()}
      >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
        </Head>

        <Background />
        {addBackgroundIcons && <IconsBackground />}
        {addHeader && (
          <Header
            containerRef={actualRef}
            rootElement={addHeader.rootElement}
          />
        )}
        <ContentContainer>{children}</ContentContainer>
        {addFooter && <Footer />}
      </Container>
    );
  },
);

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  willChange: 'clip-path',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
});

const ContentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const Background = styled('div', {
  absoluteFill: 0,
  zIndex: -1,
  backgroundColor: '$background',
  backgroundImage: '$backgroundShapes',
});

export default Layout;
