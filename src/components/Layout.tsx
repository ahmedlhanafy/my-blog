import { baseUrl } from '../constants';
import { useTheme } from '../hooks/useTheme';
import { backgroundColor, lightTheme, styled } from '../stitches.config';
import { Footer } from './Footer';
import { Header } from './Header';
import { IconsBackground } from './IconsBackground';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import ReactGA from 'react-ga';

type Props = {
  children?: ReactNode;
  title: string;
  img?: string;
  description?: string;
  url?: string;
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
      description,
      img = `${baseUrl}/image.png`,
      url,
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
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <meta property="og:title" content={title} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />

          {description && (
            <meta property="og:description" content={description} />
          )}
          {img && (
            <>
              <meta property="og:image:width" content="1920" />
              <meta property="og:image:height" content="1080" />
              <meta property="og:image" content={img} />{' '}
            </>
          )}

          {url && <meta property="og:url" content={url} />}
          <meta name="twitter:site" content="@ahmedlhanafy" />
          <meta name="twitter:creator" content="@ahmedlhanafy" />
          <meta name="theme-color" content={backgroundColor} />

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
