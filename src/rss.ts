import { baseUrl } from './constants';
import { getAll } from './repos/blogs';
import { Author, Feed } from 'feed';
import fs from 'fs';

const date = new Date();

export const generateRSS = async () => {
  const author: Author = {
    name: 'Ahmed Elhanafy',
    link: 'https://twitter.com/ahmedlhanafy',
  };
  const feed = new Feed({
    title: `Ahmed Elhanafy's Blog`,
    description: 'Welcome to my blog!',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Ahmed Elhanafy`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/feed.xml`,
    },
    author,
  });

  const blogs = (await getAll()).filter((blog) => blog.type === 'blog');

  blogs.forEach((blog) => {
    feed.addItem({
      title: blog.title,
      id: blog.seo.url,
      link: blog.seo.url,
      description: blog.description,
      content: blog.content.renderedOutput,
      author: [author],
      contributor: [author],
      date: new Date(blog.createdAt),
      image: blog.seo.image,
    });
  });

  try {
    fs.writeFileSync('./public/rss.xml', feed.rss2());
    console.log('RSS Feed generated!');
  } catch (e) {
    console.error(e);
  }
};
