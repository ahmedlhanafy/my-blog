import Layout from '../../components/Layout';
import { components } from '../../components/mdxComponents';
import { BlogPost, getAllBlogSlugs, getBySlug } from '../../repos/blogs';
import { GetStaticPaths, GetStaticProps } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import { styled } from '../../stitches.config';
import { Button } from '../../components/Button';
import { useTheme } from '../../hooks/useTheme';

export type BlogProps = { blog: BlogPost };

const Blog = (props: BlogProps) => {
  const { blog } = props;
  const { isDark } = useTheme();

  const content = hydrate(blog.content, { components });

  return (
    <Layout
      title={blog.title}
      addHeader={{
        rootElement: <Blog {...props} />,
      }}
    >
      <ContentContainer>
        <Title>{blog.title}</Title>
        <Metadata>
          {blog.readableCreatedAt} • {blog.readTime}
        </Metadata>
        <TagsContainer style={{ marginBottom: blog.excerpt ? 10 : 0 }}>
          {blog.tags.map((tag) => (
            <TagButton theme={isDark ? undefined : 'light'} key={tag}>
              {tag}
            </TagButton>
          ))}
        </TagsContainer>
        <Separator theme={isDark ? undefined : 'light'} />
        <BlogContent>{content}</BlogContent>
      </ContentContainer>
    </Layout>
  );
};

const ContentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 715,
  width: 560,
  marginX: 'auto',
  flex: 1,
  padding: '40px 0px',
  fontFamily: '$secondary',
  boxSizing: 'border-box',
  '@bp1': {
    width: '100%',
    padding: '40px 24px',
  },
});

const Title = styled('h1', {
  color: '$textColor',
  margin: 0,
  marginBottom: 4,
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
  background: 'rgba(255,255,255,0.1)',
  variants: {
    theme: {
      light: {
        background: 'rgba(0,0,0,0.1)',
      },
    },
  },
});

const Separator = styled('div', {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  height: 1,
  marginTop: 15,
  marginBottom: 15,
  width: '20%',
  alignSelf: 'center',
  variants: {
    theme: {
      light: {
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
      },
    },
  },
});

const BlogContent = styled('div', {
  fontFamily: 'body, sans-serif',
  color: '$textColor',
});

export const getStaticProps: GetStaticProps<
  BlogProps,
  { slug: string }
> = async function (context) {
  const slug = context.params?.slug;
  if (!slug) {
    throw new Error(`Slug shouldn't be null!`);
  }

  const blog = await getBySlug(slug);

  return { props: { blog } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllBlogSlugs().map((slug) => `/blog/${slug}`),
    fallback: false,
  };
};

export default Blog;
