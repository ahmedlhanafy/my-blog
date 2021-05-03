import { useTheme } from '../hooks/useTheme';
import { useThemeCircularReveal } from '../hooks/useThemeCircularReveal';
import { styled, theme } from '../stitches.config';
import { Button } from './Button';
import { CustomProvider, useRouter } from './CustomProvider';
import { CloseIcon, MenuIcon } from './Icons';
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

  const [isHeaderHidden, setIsHeaderHidden] = React.useState(true);
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
    <HeaderElem className={className}>
      <Logo />
      <Spacer />
      <Nav mode={isHeaderHidden ? 'hidden' : 'displayed'}>
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
      <MenuButton onClick={() => setIsHeaderHidden((state) => !state)}>
        {isHeaderHidden ? (
          <MenuIcon color={theme.colors.textColor} size={24} />
        ) : (
          <CloseIcon color={theme.colors.textColor} size={24} />
        )}
      </MenuButton>
    </HeaderElem>
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

const HeaderElem = styled('header', {
  display: 'flex',
  padding: 24,
  alignItems: 'center',
});

const Nav = styled('nav', {
  display: 'flex',
  alignItems: 'center',
  fontFamily: '$primary',
  variants: {
    mode: {
      hidden: {
        '@bp1': {
          display: 'none',
        },
      },
      displayed: {
        '@bp1': {
          display: 'flex',
        },
      },
    },
  },
  '@bp1': {
    background: '$background',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    paddingY: 6,
    paddingTop: 22,
    borderBottom: '1px solid $btnBackground',
  },
});

const StyledButton = styled(Button, {
  marginX: 6,
  fontSize: 18,
  '@bp1': {
    marginY: 10,
  },
});

const MenuButton = styled(Button, {
  marginX: 6,
  alignItems: 'center',
  justifyContent: 'center',
  color: '$textColor',
  display: 'none',
  zIndex: 1,
  '@bp1': {
    display: 'flex',
  },
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
