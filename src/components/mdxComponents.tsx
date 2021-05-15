import { useTheme } from '../hooks/useTheme';
import { css, styled } from '../stitches.config';
import Highlight, { defaultProps, PrismTheme } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';

const darkTheme: PrismTheme = {
  plain: {
    color: '#c9d1d9',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['prolog'],
      style: {
        color: 'rgb(0, 0, 128)',
      },
    },
    {
      types: ['comment'],
      style: {
        color: 'rgb(106, 153, 85)',
      },
    },
    {
      types: ['builtin', 'changed', 'keyword'],
      style: {
        color: '#e3116c',
      },
    },
    {
      types: ['inserted-sign', 'inserted'],
      style: {
        backgroundColor: 'rgb(240, 255, 244)',
        color: 'rgb(34, 134, 58)',
      },
    },
    {
      types: ['constant'],
      style: {
        color: 'rgb(100, 102, 149)',
      },
    },
    {
      types: ['attr-name', 'variable'],
      style: {
        color: 'rgb(156, 220, 254)',
      },
    },
    {
      types: ['deleted-sign', 'deleted'],
      style: {
        backgroundColor: 'rgb(255, 238, 240)',
        color: 'rgb(179, 29, 40)',
      },
    },
    {
      types: ['selector'],
      style: {
        color: 'rgb(215, 186, 125)',
      },
    },
    {
      types: ['tag'],
      style: {
        color: 'rgb(78, 201, 176)',
      },
    },
    {
      types: ['tag'],
      languages: ['markup'],
      style: {
        color: 'rgb(86, 156, 214)',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: 'rgb(104, 104, 104)',
      },
    },
    {
      types: ['operator'],
      style: {
        color: 'rgb(0, 92, 197)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(0, 92, 197)',
      },
    },
    {
      types: ['punctuation'],
      languages: ['markup'],
      style: {
        color: '#808080',
      },
    },
    {
      types: ['function'],
      style: {
        color: 'rgb(111, 66, 193)',
      },
    },
    {
      types: ['class-name'],
      style: {
        color: 'rgb(78, 201, 176)',
      },
    },
    {
      types: ['known-class-name', 'class-name'],
      style: {
        color: 'rgb(227, 129, 9)',
      },
    },
    {
      types: ['char'],
      style: {
        color: 'rgb(209, 105, 105)',
      },
    },
    {
      types: ['property-access'],
      style: {
        color: 'rgb(0, 92, 197)',
      },
    },
    {
      types: ['method', 'function', 'property-access'],
      style: {
        color: 'rgb(111, 66, 193)',
      },
    },
    {
      languages: ['json'],
      types: ['property'],
      style: {
        color: 'rgb(3, 47, 98)',
      },
    },
    {
      languages: ['json'],
      types: ['string'],
      style: {
        color: 'rgb(3, 47, 98)',
      },
    },
    {
      languages: ['json'],
      types: ['number'],
      style: {
        color: 'rgb(0, 92, 197)',
      },
    },
    {
      languages: ['json'],
      types: ['comment'],
      style: {
        backgroundColor: 'rgb(179, 29, 40)',
        color: 'rgb(250, 251, 252)',
      },
    },
  ],
};

export const components = {
  code: Code,
  img: (props) => <img {...props} style={{ maxWidth: '100%' }} />,
  a: (props) => <StyledLink {...props} />,
  h1: (props) => <h1 {...props} className={headerClassName()} />,
  h2: (props) => (
    <h2 {...props} className={`${headerClassName()} ${header2ClassName()}`} />
  ),
  h3: (props) => <h3 {...props} className={headerClassName()} />,
  h4: (props) => <h4 {...props} className={headerClassName()} />,
};

function Code({ children, className }) {
  const language = className.replace(/language-/, '');
  const { isDark } = useTheme();

  return (
    <Highlight
      {...defaultProps}
      theme={isDark ? darkTheme : theme}
      code={children.trim()}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre
          theme={isDark ? undefined : 'light'}
          className={className}
          style={{
            ...style,
            overflow: 'auto',
            marginTop: 20,
            marginBottom: 20,
            padding: 16,
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
}

const Pre = styled('pre', {
  fontFamily: '$primary, "Andale Mono", "Ubuntu Mono", monospace',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255,0.1)',
  borderRadius: 6,
  variants: {
    theme: {
      light: {
        borderColor: 'rgba(0,0,0,0.1)',
      },
    },
  },
});

const headerClassName = css({
  fontFamily: '$secondary',
});
const header2ClassName = css({
  color: '$primary',
});

const StyledLink = styled('a', {
  fontFamily: '$secondary',
  color: '$textColor',
  textDecoration: 'underline',
  textDecorationColor: '$primaryLink',
  'text-underline-offset': 1,
  'text-decoration-thickness': 2.5,
  transition: 'color 200ms ease-in-out',
  '&:hover': {
    color: '$primaryLink',
  },
});
