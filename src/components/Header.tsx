import { useTheme } from '../hooks/useTheme';
import { useThemeCircularReveal } from '../hooks/useThemeCircularReveal';
import { styled } from '../stitches.config';
import { Button } from './Button';
import { CustomProvider, useRouter } from './CustomProvider';
import Link from 'next/link';
import React from 'react';

type Props = {
  containerRef: React.MutableRefObject<HTMLElement>;
  rootElement: JSX.Element;
  className?: string;
};

export const Header = (props: Props) => {
  const { containerRef, rootElement, className } = props;
  const buttonRef = React.useRef<HTMLAnchorElement>();

  const router = useRouter();
  const { isDark, toggle } = useTheme();
  const themeRef = React.useRef(isDark);

  themeRef.current = isDark;

  useThemeCircularReveal({
    buttonRef,
    containerRef,
    reactElement: () => (
      <CustomProvider
        isDark={themeRef.current}
        toggle={() => {}}
        router={router}
      >
        {rootElement}
      </CustomProvider>
    ),
    config: {
      startRadius: '7%',
      endRadius: '150%',
      toggleTheme: toggle,
    },
  });

  return (
    <header className={className}>
      <Nav>
        <Logo />
        <Spacer />
        <Link href="/blog" passHref>
          <StyledButton
            color={router.pathname.includes('/blog') ? 'primary' : undefined}
          >
            blog
          </StyledButton>
        </Link>
        <Link href="/library" passHref>
          <StyledButton
            color={router.pathname.includes('/library') ? 'violet' : undefined}
          >
            library
          </StyledButton>
        </Link>
        <Link href="/projects" passHref>
          <StyledButton
            color={router.pathname.includes('/projects') ? 'pink' : undefined}
          >
            projects
          </StyledButton>
        </Link>

        <StyledButton ref={buttonRef}>
          <span>{isDark ? '🌃' : '🌇'}</span>
        </StyledButton>
      </Nav>
    </header>
  );
};

const Logo = () => {
  const { isDark } = useTheme();

  return (
    <Link href="/" passHref>
      <LogoContainer>
        <Bracket theme={isDark ? undefined : 'light'}>{'<'}</Bracket>
        <ALetter>A</ALetter>
        <Bracket theme={isDark ? undefined : 'light'}>{'/>'}</Bracket>
      </LogoContainer>
    </Link>
  );
};

const Spacer = styled('div', {
  flex: 1,
});

const Nav = styled('nav', {
  display: 'flex',
  padding: 24,
  alignItems: 'center',
  fontFamily: '$primary',
});

const StyledButton = styled(Button, {
  marginX: 6,
  fontSize: 18,
});

const LogoContainer = styled('a', {
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'pre-wrap',
  textDecoration: 'none',
  fontFamily: '$secondary',
});

const ALetter = styled('h1', {
  margin: 0,
  fontWeight: 'bold',
  color: '$textColor',
  fontSize: 28,
  marginLeft: 2,
  marginRight: 4,
});

const Bracket = styled('span', {
  fontSize: 20,
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
