import { Button } from '../components/Button';
import { CustomProvider, useRouter } from '../components/CustomProvider';
import { GithubIcon, LinkedInIcon, TwitterIcon } from '../components/Icons';
import Layout from '../components/Layout';
import { useTheme } from '../hooks/useTheme';
import { useThemeCircularReveal } from '../hooks/useThemeCircularReveal';
import { css, styled } from '../stitches.config';
import Link from 'next/link';
import React from 'react';

type Props = { isClone: boolean };

const IndexPage = (props: Props) => {
  const { isClone = false } = props;
  const containerRef = React.useRef<HTMLDivElement>();
  const buttonRef = React.useRef<HTMLAnchorElement>();
  const { toggle, isDark } = useTheme();
  const themeRef = React.useRef(isDark);
  const bracketsTheme = isDark ? undefined : 'light';
  const router = useRouter();

  themeRef.current = isDark;

  // This is okay because isClone shouldn't change in the browser.
  if (!isClone) {
    useThemeCircularReveal({
      buttonRef,
      containerRef,
      reactElement: () => (
        <CustomProvider
          isDark={themeRef.current}
          toggle={() => {}}
          router={router}
        >
          <IndexPage isClone />
        </CustomProvider>
      ),
      config: {
        startRadius: '7%',
        endRadius: '150%',
        toggleTheme: toggle,
      },
    });
  }
  return (
    <Layout
      ref={containerRef}
      addBackgroundIcons
      title="Hi, I'm Ahmed Elhanafy 👋"
    >
      <Container>
        <Wrapper>
          <Title>
            <HeaderBracket theme={bracketsTheme}>{'<'}</HeaderBracket>
            AhmedElhanafy
          </Title>
          <Link href="/blog" passHref>
            <Button color="primary">blog</Button>
          </Link>
          <Link href="/library" passHref>
            <Button color="violet">library</Button>
          </Link>
          <Link href="/projects" passHref>
            <Button color="pink">projects</Button>
          </Link>
          <Button as="div">
            worksAt
            <ButtonBracket theme={bracketsTheme}>{'={'}</ButtonBracket>
            <MsLogo
              src={'https://pngimg.com/uploads/microsoft/microsoft_PNG13.png'}
              alt="Microsoft Logo"
            />
            <ButtonBracket theme={bracketsTheme}>{'}'}</ButtonBracket>
          </Button>

          <Button as="div">
            social
            <ButtonBracket theme={bracketsTheme}>{'=['}</ButtonBracket>
            <IconAnchor
              target="_blank"
              href="https://github.com/ahmedlhanafy"
              className={iconClassName()}
            >
              <GithubIcon
                color={isDark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)'}
                size={24}
              />
            </IconAnchor>
            <ButtonBracket theme={bracketsTheme}>{','}</ButtonBracket>
            <IconAnchor
              href="https://twitter.com/ahmedlhanafy"
              target="_blank"
              className={`${iconClassName()} `}
              style={{ marginBottom: -6 }}
            >
              <TwitterIcon
                size={24}
                color={isDark ? 'rgba(0,194,255,0.85)' : '#00C2FF'}
              />
            </IconAnchor>
            <ButtonBracket theme={bracketsTheme}>{','}</ButtonBracket>
            <IconAnchor
              target="_blank"
              className={iconClassName()}
              href="https://www.linkedin.com/in/ahmedlhanafy/"
            >
              <LinkedInIcon
                size={24}
                color={isDark ? 'rgb(20, 129, 241)' : '#0c66c2'}
              />
            </IconAnchor>
            <ButtonBracket theme={bracketsTheme}>{']'}</ButtonBracket>
          </Button>
          <Button ref={buttonRef}>
            theme
            <ButtonBracket theme={bracketsTheme}>{'={'}</ButtonBracket>
            <span>{isDark ? '🌃' : '🌇'}</span>
            <ButtonBracket theme={bracketsTheme}>{'}'}</ButtonBracket>
          </Button>
          <HeaderBracket theme={bracketsTheme}>{'/>'}</HeaderBracket>
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
  padding: 16,
  fontFamily: '$primary',
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

const ButtonBracket = styled('span', {
  color: 'rgba(230, 230, 230, 0.3)',
  variants: {
    theme: {
      light: {
        color: 'rgba(33, 33, 33, 0.44)',
      },
    },
  },
});

const HeaderBracket = styled('span', {
  fontSize: 34,
  fontWeight: 'bold',
  color: 'rgba(255, 255, 255, 0.48)',
  '@bp1': {
    fontSize: 28,
  },
  variants: {
    theme: {
      light: {
        color: 'rgba(53, 53, 53, 0.5)',
      },
    },
  },
});

const MsLogo = styled('img', {
  width: 20,
  height: 20,
  marginBottom: -3,
});

const iconClassName = css({
  marginBottom: -4,
  marginX: 2,
});

const IconAnchor = styled('a', {
  height: 24,
});

export default IndexPage;
