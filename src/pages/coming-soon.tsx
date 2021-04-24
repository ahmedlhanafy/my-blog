import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';
import { styled } from '../stitches.config';
import React from 'react';

const ComingSoon = () => {
  const { isDark } = useTheme();
  const bracketsTheme = isDark ? undefined : 'light';

  return (
    <Layout title="Coming Soon!" addHeader={{ rootElement: <ComingSoon /> }}>
      <Container>
        <Wrapper>
          <Title>
            <HeaderBracket theme={bracketsTheme}>{'<'}</HeaderBracket>
            ComingSoon
            <HeaderBracket theme={bracketsTheme}>{' />'}</HeaderBracket>
          </Title>
        </Wrapper>
      </Container>
    </Layout>
  );
};

const Container = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'start',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const Title = styled('h1', {
  margin: 0,
  fontWeight: 'bold',
  color: '$textColor',
  fontSize: 56,
  '@bp1': {
    fontSize: 36,
  },
});

const HeaderBracket = styled('span', {
  fontSize: 34,
  fontWeight: 'bold',
  color: 'rgba(255, 255, 255, 0.48)',
  variants: {
    theme: {
      light: {
        color: 'rgba(53, 53, 53, 0.5)',
      },
    },
  },
});

export default ComingSoon;
