import fs from 'fs';
import matter from 'gray-matter';
import { MdxRemote } from 'next-mdx-remote/types';
import path from 'path';
import renderToString from 'next-mdx-remote/render-to-string';
import { components } from '../components/mdxComponents';

export type BlogPost = {
  title: string;
  tags: string[];
  createdAt: string;
  content: MdxRemote.Source;
  type: 'book' | 'blog';
  slug: string;
  excerpt: string;
};

type MatterBlogPost = {
  data: {
    title: string;
    type: 'blog' | 'book';
    tags: string;
    createdAt: string;
  };
  excerpt: string;
  content: string;
};

const MDX_PATH = './src/mdx';

const fromMatterToBlogPost = async (
  matterBlog: MatterBlogPost,
  slug: string,
): Promise<BlogPost> => {
  const {
    content,
    data: { title, createdAt, tags, type },
    excerpt,
  } = matterBlog;

  const mdxContent = await renderToString(content, {
    components,
  });

  return {
    title,
    type,
    content: mdxContent,
    createdAt,
    slug,
    excerpt,
    tags: tags.split(','),
  };
};

export function getAllBlogSlugs(): string[] {
  const fileNames = fs.readdirSync(path.resolve(process.cwd(), MDX_PATH));

  return fileNames.map((name) => name.split('.')[0]);
}

export async function getAll(): Promise<BlogPost[]> {
  const results: BlogPost[] = [];

  const fileNames = getAllBlogSlugs();
  const filesContents = fileNames.map((fileName) =>
    fs.readFileSync(path.resolve(process.cwd(), MDX_PATH, `${fileName}.mdx`), {
      encoding: 'utf8',
    }),
  );

  const fileContentsWithMetadata = filesContents.map<MatterBlogPost>(
    (content) => matter(content, { excerpt: true }) as any,
  );

  for (let index = 0; index < fileContentsWithMetadata.length; index++) {
    const content = fileContentsWithMetadata[index];
    results.push(await fromMatterToBlogPost(content, fileNames[index]));
  }

  return results;
}

export async function getBySlug(slug: string): Promise<BlogPost> {
  const content = fs.readFileSync(
    path.resolve(process.cwd(), MDX_PATH, `${slug}.mdx`),
    {
      encoding: 'utf8',
    },
  );

  const fileContentWithMetadata: MatterBlogPost = matter(content) as any;

  return fromMatterToBlogPost(fileContentWithMetadata, slug);
}

export async function getByTag(tag: string): Promise<BlogPost[]> {
  return (await getAll()).filter(({ tags }) => tags.includes(tag));
}