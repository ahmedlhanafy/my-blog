import { css, styled } from '../stitches.config';

export const components = {
  Code: ({ text }: { text: string }) => <code>{text}</code>,
  img: (props) => <img {...props} style={{ maxWidth: '100%' }} />,
  a: (props) => <StyledLink {...props} />,
  h1: (props) => <h1 {...props} className={headerClassName()} />,
  h2: (props) => <h2 {...props} className={headerClassName()} />,
  h3: (props) => <h3 {...props} className={headerClassName()} />,
  h4: (props) => <h4 {...props} className={headerClassName()} />,
};

const headerClassName = css({
  fontFamily: '$secondary',
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
