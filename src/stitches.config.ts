import { createCss } from '@stitches/react';
import color from 'color';

const primaryColor = 'rgb(87, 164, 235)';

export const { theme, styled, getCssString, global, css } = createCss({
  theme: {
    colors: {
      textColor: '#fff',
      secondaryTextColor: 'rgba(255, 255, 255, 0.5)',
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
      primaryLink: color(primaryColor).darken(0.2).string(),
    },
    fonts: {
      primary: 'iA Writer Mono S',
      secondary: 'GT Walsheim Pro',
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
  media: {
    bp1: '(max-width: 640px)',
    bp2: '(max-width: 768px)',
    bp3: '(max-width: 1024px)',
  },
});

export const lightTheme = theme({
  colors: {
    textColor: '#000',
    secondaryTextColor: 'rgba(0, 0, 0, 0.4)',
    background: '#fff',
    backgroundShapes: `radial-gradient(circle at 15% 50%, rgb(241, 238, 254), rgba(255, 255, 255, 0) 25%), radial-gradient(circle at 85% 30%, rgb(225, 248, 250), rgba(255, 255, 255, 0) 25%)`,
    btnColor: '#0F0F0F',
    btnBackground: 'rgba(86, 86, 86, 0.3)',
    btnHovered: 'rgba(86, 86, 86, 0.4)',
  },
});

export const applyGlobalStyles = global({
  body: {
    margin: 0,
    overflow: 'hidden',
  },
});
