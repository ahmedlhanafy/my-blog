import { useTheme } from '../hooks/useTheme';
import { BlogPost } from '../repos/blogs';
import { styled } from '../stitches.config';
import { Button } from './Button';
import Link from 'next/link';

type Props = { blog: BlogPost };

export const BlogRow = (props: Props) => {
  const { blog } = props;
  const { isDark } = useTheme();

  return (
    <Container>
      {blog.cover && (
        <ImageContainer>
          <StyledImage src={blog.cover.src} alt={blog.cover.alt} />
          <ImageOverlay />
        </ImageContainer>
      )}
      <Link href={`/blog/${blog.slug}`} passHref>
        <Title theme={isDark ? undefined : 'light'}>{blog.title}</Title>
      </Link>
      <Metadata>
        {blog.readableCreatedAt} • {blog.readTime}
      </Metadata>
      <TagsContainer style={{ marginBottom: blog.excerpt ? 10 : 0 }}>
        {blog.tags.map((tag) => (
          <TagButton key={tag}>{tag}</TagButton>
        ))}
      </TagsContainer>
      <Excerpt>{blog.excerpt.trim()}</Excerpt>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Title = styled('a', {
  fontWeight: 'bold',
  fontSize: 26,
  color: '$textColor',
  margin: 0,
  marginBottom: 12,
  textDecoration: 'underline',
  textDecorationColor: 'rgba(255,255,255,0.1)',
  'text-underline-offset': 3,
  transition: 'text-decoration-color 200ms ease-in-out',
  '&:hover': {
    textDecorationColor: '$primary',
  },
  variants: {
    theme: {
      light: {
        textDecorationColor: 'rgba(0,0,0,0.1)',
      },
    },
  },
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
});

const Excerpt = styled('p', {
  fontSize: 12,
  color: '$textColor',
  margin: 0,
  whiteSpace: 'pre-wrap',
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
