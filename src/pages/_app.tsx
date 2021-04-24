import './index.css';
import { CustomProvider } from '../components/CustomProvider';
import { applyGlobalStyles } from '../stitches.config';
import { AppProps } from 'next/app';
import React from 'react';

applyGlobalStyles();

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = React.useState(true);

  return (
    <CustomProvider isDark={isDark} toggle={() => setIsDark((state) => !state)}>
      <Component {...pageProps} />
    </CustomProvider>
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
