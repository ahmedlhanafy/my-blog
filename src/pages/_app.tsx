import './index.css';
import { ThemeContext } from '../hooks/useTheme';
import { applyGlobalStyles } from '../stitches.config';
import { AppProps } from 'next/app';
import React from 'react';

applyGlobalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = React.useState(true);
  return (
    <ThemeContext.Provider
      value={{ isDark, toggle: () => setIsDark((state) => !state) }}
    >
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
