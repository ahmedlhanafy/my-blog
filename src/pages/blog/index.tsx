import { BlogRow } from '../../components/BlogRow';
import Layout from '../../components/Layout';
import { useTheme } from '../../hooks/useTheme';
import { BlogPost, getAll } from '../../repos/blogs';
import { styled } from '../../stitches.config';
import { GetStaticProps } from 'next';
import React from 'react';

type Props = {
  blogs: BlogPost[];
};

const IndexPage = (props: Props) => {
  const { blogs } = props;
  const { isDark } = useTheme();

  return (
    <Layout
      title="Welcome to my blog!"
      addHeader={{
        rootElement: <IndexPage {...props} />,
      }}
    >
      <BlogsContainer>
        {[...blogs, ...blogs].map((blog) => (
          <React.Fragment key={blog.slug}>
            <BlogRow key={blog.slug} blog={blog} />
            <Separator theme={isDark ? undefined : 'light'} />
          </React.Fragment>
        ))}
      </BlogsContainer>
    </Layout>
  );
};

const BlogsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 715,
  width: 560,
  marginX: 'auto',
  flex: 1,
  paddingTop: 40,
  fontFamily: '$secondary',
});

const Separator = styled('div', {
  // backgroundColor: 'rgba(255, 255, 255, 0.06)',
  height: 1,
  marginTop: 15,
  marginBottom: 15,
  width: '20%',
  alignSelf: 'center',
  variants: {
    theme: {
      light: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
});

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: { blogs: await getAll() } };
};
