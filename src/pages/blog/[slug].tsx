import Layout from '../../components/Layout';
import { components } from '../../components/mdxComponents';
import { BlogPost, getAllBlogSlugs, getBySlug } from '../../repos/blogs';
import { GetStaticPaths, GetStaticProps } from 'next';
import hydrate from 'next-mdx-remote/hydrate';

export type BlogProps = { blog: BlogPost };

const Blog = (props: BlogProps) => {
  const { blog } = props;

  const content = hydrate(blog.content, { components });

  return (
    <Layout title={blog.title}>
      <h1>{blog.title}</h1>
      <div>{content}</div>
    </Layout>
  );
};

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
