import { Button } from '../components/Button';
import Layout from '../components/Layout';
import { ThemeContext } from '../hooks/useTheme';
import { styled } from '../stitches.config';
import { animate, easeInOut } from 'popmotion';
import React from 'react';
import ReactDOM from 'react-dom';

const IndexPage = ({
  defaultTheme = 'dark',
}: {
  defaultTheme: 'dark' | 'light';
}) => {
  const ref = React.useRef<Element>(null);
  const animating = React.useRef(false);

  React.useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      if (ref.current) {
        (ref.current as any).style.clipPath = `circle(7% at ${e.clientX}px ${e.clientY}px)`;
      }
    });
    document.addEventListener('mouseup', (e) => {
      if (ref.current) {
        animating.current = true;
        animate({
          from: 70,
          to: 1200,
          duration: 500,
          ease: easeInOut,
          onUpdate: (val) => {
            if (ref.current)
              (ref.current as any).style.clipPath = `circle(${val}px at ${e.clientX}px ${e.clientY}px)`;
          },
          onComplete: () => {
            const hamaza = ref.current;
            ref.current = null;

            if (hamaza) hamaza.style.clipPath = 'none';
            document
              .querySelector('#hamada')
              .parentElement.removeChild(document.querySelector('#hamada'));
            animating.current = false;
          },
        });
        // ref.current.classList.add('hamada');
      }
    });
  }, []);
  return (
    <Layout defaultTheme={defaultTheme} title="Welcome to my blog">
      <ThemeContext.Consumer>
        {({ toggle, isDark }) => {
          const theme = isDark ? undefined : 'light';
          return (
            <Container>
              <style jsx>{``}</style>
              <Wrapper>
                <Title>
                  <HeaderBracket theme={theme}>{'<'}</HeaderBracket>
                  AhmedElhanafy
                </Title>
                <Button
                  color="primary"
                  // onClick={toggle}
                >
                  blog
                </Button>
                <Button color="violet">library</Button>
                <Button color="pink">projects</Button>
                <Button>
                  worksAt
                  <ButtonBracket theme={theme}>{'={'}</ButtonBracket>
                  <MsLogo
                    src="https://pngimg.com/uploads/microsoft/microsoft_PNG13.png"
                    alt="Microsoft Logo"
                  />
                  <ButtonBracket theme={theme}>{'}'}</ButtonBracket>
                </Button>

                <Button>
                  social
                  <ButtonBracket theme={theme}>{'=['}</ButtonBracket>
                  <ButtonBracket theme={theme}>{']'}</ButtonBracket>
                </Button>
                <Button
                  onMouseLeave={() => {
                    if (!ref.current || animating.current) return;
                    document
                      .querySelector('#hamada')
                      .parentElement.removeChild(
                        document.querySelector('#hamada'),
                      );
                    const hamaza = ref.current;
                    ref.current = null;

                    if (hamaza) hamaza.style.clipPath = 'none';
                    toggle();
                  }}
                  onMouseEnter={(e) => {
                    if (ref.current || animating.current) return;
                    const containerEl = document.querySelector('#container');
                    // const newContainer = containerEl?.cloneNode(
                    //   true,
                    // ) as Element;
                    // newContainer?.classList.add(lightTheme.toString());
                    // containerEl?.parentElement?.appendChild(newContainer);
                    (containerEl as any).style.clipPath = `circle(7% at ${e.clientX}px ${e.clientY}px)`;
                    const newElem = document.createElement('div');
                    newElem.id = 'hamada';
                    containerEl?.parentElement?.insertBefore(
                      newElem,
                      containerEl,
                    );
                    newElem.style.position = 'absolute';
                    newElem.style.top = '0';
                    newElem.style.left = '0';
                    newElem.style.bottom = '0';
                    newElem.style.right = '0';
                    newElem.style.zIndex = '-1';
                    newElem.style.pointerEvents = 'none';

                    ReactDOM.render(
                      <IndexPage defaultTheme={isDark ? 'dark' : 'light'} />,
                      newElem,
                      () => {
                        toggle();
                        ref.current = containerEl;
                      },
                    );
                  }}
                >
                  theme
                  <ButtonBracket theme={theme}>{'={'}</ButtonBracket>
                  <span>{isDark ? '🌃' : '🌇'}</span>
                  <ButtonBracket theme={theme}>{'}'}</ButtonBracket>
                </Button>
                <HeaderBracket theme={theme}>{'/>'}</HeaderBracket>
              </Wrapper>
            </Container>
          );
        }}
      </ThemeContext.Consumer>
      <svg width="0" height="0">
        <defs>
          <clipPath id="mask">
            <path d="M 40 0 L 0 40, 60 100, 0 160, 40 200, 100 140, 160 200, 200 160, 140 100, 200 40, 160 0, 100 60" />
          </clipPath>
        </defs>
      </svg>
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

export default IndexPage;
