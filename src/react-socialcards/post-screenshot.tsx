import { IconsBackground } from '../components/IconsBackground';
import { BlogPost } from '../repos/blogs';
import { lightTheme, styled } from '../stitches.config';
import Link from 'next/link';

type Props = { blog: BlogPost };

export const BlogScreenshot = (props: Props) => {
  const { blog } = props;

  return (
    <Container className={lightTheme.toString()} id="root">
      <Background />
      <StyledIconsBackground />
      {blog.cover && (
        <ImageContainer>
          <StyledImage src={blog.cover.src} alt={blog.cover.alt} />
          <ImageOverlay />
        </ImageContainer>
      )}
      <Link href={`/blog/${blog.slug}`} passHref>
        <Title>{blog.title}</Title>
      </Link>
      <Metadata>
        {blog.readableCreatedAt} • {blog.readTime}
      </Metadata>
      <TagsContainer style={{ marginBottom: blog.description ? 10 : 0 }}>
        {blog.tags.map((tag) => (
          <TagButton key={tag}>{tag}</TagButton>
        ))}
      </TagsContainer>
    </Container>
  );
};

const StyledIconsBackground = styled(IconsBackground, {
  transform: 'rotate(-35deg) translateY(-600px)',
});

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
    },
  },
});

const Container = styled('div', {
  fontFamily: '$secondary',
  display: 'flex',
  flexDirection: 'column',
  padding: 46,
  width: 380,
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
});

const Title = styled('a', {
  fontWeight: 'bold',
  fontSize: 26,
  color: '$textColor',
  margin: 0,
  marginBottom: 12,
  textDecoration: 'underline',
  textDecorationColor: '$primary',
  'text-underline-offset': 3,
  textAlign: 'center',
});

const Metadata = styled('span', {
  color: '$secondaryTextColor',
  fontSize: 14,
  marginBottom: 10,
});

const TagsContainer = styled('div', {
  display: 'flex',
  fontFamily: '$primary',
});

const TagButton = styled(Button, {
  fontSize: 12,
  marginX: 0,
  marginRight: 8,
  background: 'rgba(0,0,0,0.1)',
});

const ImageContainer = styled('div', {
  position: 'relative',
  borderRadius: 6,
  overflow: 'hidden',
  marginBottom: 16,
  display: 'flex',
});

const StyledImage = styled('img', {
  flex: 1,
  height: 200,
});

const ImageOverlay = styled('div', {
  absoluteFill: 0,
  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), transparent)',
});

const Background = styled('div', {
  absoluteFill: 0,
  zIndex: -1,
  backgroundColor: '$background',
  backgroundImage: '$backgroundShapes',
});
