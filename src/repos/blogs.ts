import { components } from '../components/mdxComponents';
import { baseUrl } from '../constants';
import fs from 'fs';
import matter from 'gray-matter';
import renderToString from 'next-mdx-remote/render-to-string';
import { MdxRemote } from 'next-mdx-remote/types';
import path from 'path';
import readingTime from 'reading-time';

export type BlogPost = {
  title: string;
  tags: string[];
  createdAt: string;
  readableCreatedAt: string;
  content: MdxRemote.Source;
  type: 'book' | 'blog';
  slug: string;
  readTime: string;
  description?: string;
  cover?: { src: string; alt: string };
  seo: { url: string; image: string };
};

type MatterBlogPost = {
  data: {
    title: string;
    description?: string;
    type: 'blog' | 'book';
    tags: string;
    createdAt: string;
    coverImg?: string;
    coverAlt?: string;
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
    data: {
      title,
      createdAt,
      tags,
      type,
      coverImg,
      coverAlt,
      description = null,
    },
  } = matterBlog;

  const mdxContent = await renderToString(content, {
    components,
  });

  const stats = readingTime(mdxContent.renderedOutput);

  const readableCreatedAt = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return {
    title,
    type,
    content: mdxContent,
    createdAt,
    readableCreatedAt,
    slug,
    description,
    tags: tags.split(','),
    readTime: stats.text,
    cover: coverImg && coverAlt ? { src: coverImg, alt: coverAlt } : null,
    seo: {
      image: `${baseUrl}/socialImages/${slug}.png`,
      url: `${baseUrl}/blog/${slug}`,
    },
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
    (content) => matter(content) as any,
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

  const fileContentWithMetadata: MatterBlogPost = matter(content, {
    excerpt: true,
  }) as any;

  return fromMatterToBlogPost(fileContentWithMetadata, slug);
}

export async function getByTag(tag: string): Promise<BlogPost[]> {
  return (await getAll()).filter(({ tags }) => tags.includes(tag));
}
