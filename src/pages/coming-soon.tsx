import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';
import { styled } from '../stitches.config';
import React from 'react';

const ComingSoon = () => {
  const { isDark } = useTheme();
  const bracketsTheme = isDark ? undefined : 'light';

  return (
    <Layout title="Coming Soon!">
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
  flexDirection: 'column',
  textAlign: 'start',
  margin: '0 auto',
  transition: 'clip-path 100ms ease-in',
});

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const Title = styled('h1', {
  margin: 0,
  fontWeight: 'bold',
  fontSize: 56,
  color: '$textColor',
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
