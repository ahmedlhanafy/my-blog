import { styled } from '../stitches.config';
import color from 'color';

const violetColor = 'rgb(90, 87, 235)';
const pinkColor = 'rgb(235, 87, 131)';

export const Button = styled('a', {
  display: 'flex',
  textDecoration: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$btnBackground',
  borderRadius: '30px',
  padding: '6px 16px',
  fontWeight: 'bold',
  fontSize: 20,
  height: 36,
  color: '$btnColor',
  margin: '4px 0px 6px 36px',
  transition: 'background 120ms ease-in-out',
  userSelect: 'none',
  '&:hover': {
    background: '$btnHovered',
  },
  '@bp1': {
    fontSize: 18,
  },
  variants: {
    color: {
      primary: {
        background: '$primaryBackground',
        color: '$primary',
        '&:hover': {
          background: '$primaryBackgroundHovered',
        },
      },
      violet: {
        background: color(violetColor).alpha(0.3).string(),
        color: violetColor,
        '&:hover': {
          background: color(violetColor).alpha(0.4).string(),
        },
      },
      pink: {
        background: color(pinkColor).alpha(0.3).string(),
        color: pinkColor,
        '&:hover': {
          background: color(pinkColor).alpha(0.4).string(),
        },
      },
    },
  },
});
