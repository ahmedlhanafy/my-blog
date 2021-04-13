import { createCss } from '@stitches/react';
import color from 'color';

const primaryColor = 'rgb(87, 164, 235)';

export const { theme, styled, getCssString, global, css } = createCss({
  theme: {
    colors: {
      textColor: '#fff',
      background: '#141414',
      btnColor: '#e6e6e6',
      btnBackground: 'rgba(167, 167, 167, 0.2)',
      btnHovered: 'rgba(167, 167, 167, 0.3)',
      backgroundShapes: `radial-gradient(
        circle at 15% 50%,
        rgb(32, 27, 55),
        rgba(255, 255, 255, 0) 25%
      ),
      radial-gradient(
        circle at 85% 30%,
        rgb(8, 38, 44),
        rgba(255, 255, 255, 0) 25%
      )`,
      primary: primaryColor,
      primaryBackground: color(primaryColor).alpha(0.3).string(),
      primaryBackgroundHovered: color(primaryColor).alpha(0.4).string(),
    },
  },
  utils: {
    absoluteFill: () => (val) => ({
      position: 'absolute',
      top: val,
      left: val,
      right: val,
      bottom: val,
    }),
    size: () => (val) => ({ width: val, height: val }),
    marginX: (config) => (
      value: keyof typeof config['theme']['colors'] | (string & {}),
    ) => ({
      marginLeft: value,
      marginRight: value,
    }),
  },
});

export const lightTheme = theme({
  colors: {
    textColor: '#000',
    background: '#fff',
    backgroundShapes: `radial-gradient(circle at 15% 50%, rgb(241, 238, 254), rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 85% 30%, rgb(225, 248, 250), rgba(255, 255, 255, 0) 25%)`,
    btnColor: '#0F0F0F',
    btnBackground: 'rgba(86, 86, 86, 0.3)',
    btnHovered: 'rgba(86, 86, 86, 0.4)',
  },
});

const globalStyles = global({
  body: {
    margin: 0,
    overflow: 'hidden',
  },
  // '*': {
  //   fontFamily: 'sans-serif',
  // },
});

// const globalFontFace1 = global({
//   '@font-face': {
//     fontFamily: 'iA Writer Mono S',
//     src: 'url("/fonts/iA Writer Mono S/iAWriterMonoS-Regular.ttf")',
//     fontStyle: 'normal',
//     fontWeight: '400',
//     fontDisplay: 'block',
//   },
// });

// const globalFontFace2 = global({
//   '@font-face': {
//     fontFamily: 'iA Writer Mono S',
//     src: 'url("/fonts/iA Writer Mono S/iAWriterMonoS-Bold.ttf")',
//     fontStyle: 'bold',
//     fontWeight: '500',
//     fontDisplay: 'block',
//   },
// });

export const applyGlobalStyles = () => {
  // globalFontFace1();
  // globalFontFace2();
  globalStyles();
};
