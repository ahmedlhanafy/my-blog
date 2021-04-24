import { useTheme } from '../hooks/useTheme';
import { styled } from '../stitches.config';

export const Footer = () => {
  const { isDark } = useTheme();

  const theme = isDark ? undefined : 'light';

  return (
    <Container>
      <Text theme={theme}>
        Made with{' '}
        <SecondaryText>
          <Bracket theme={theme}>{'<'}</Bracket>
          Love
          <Bracket theme={theme}>{'/> '}</Bracket>
          && <Bracket theme={theme}>{'<'}</Bracket>Coffee
          <Bracket theme={theme}>{'/>'}</Bracket>
        </SecondaryText>
      </Text>
    </Container>
  );
};

const Container = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
  padding: 16,
});

const Text = styled('span', {
  color: 'rgba(221, 221, 221, 0.67)',
  fontSize: 12,
  fontFamily: '$secondary',

  variants: {
    theme: {
      light: {
        color: 'rgba(60, 60, 60, 0.67)',
      },
    },
  },
});

const SecondaryText = styled('span', {
  fontFamily: '$primary',
});

const Bracket = styled('span', {
  color: 'rgba(221, 221, 221, 0.32)',
  variants: {
    theme: {
      light: {
        color: 'rgba(106, 106, 106, 0.38)',
      },
    },
  },
});
