import { getAll } from './repos/blogs';
import { Author, Feed } from 'feed';
import fs from 'fs';

const baseUrl = 'https://www.ahmedelhanafy.com';
const date = new Date();

const generateRSS = async () => {
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
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author,
  });

  const blogs = (await getAll()).filter((blog) => blog.type === 'blog');

  blogs.forEach((blog) => {
    const url = `${baseUrl}/blog/${blog.slug}`;

    feed.addItem({
      title: blog.title,
      id: url,
      link: url,
      description: blog.excerpt,
      content: blog.content.renderedOutput,
      author: [author],
      contributor: [author],
      date: new Date(blog.createdAt),
      image: `${baseUrl}/image.png`,
    });
  });

  try {
    fs.mkdirSync('./public/rss', { recursive: true });
    fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
    fs.writeFileSync(`./public/rss/atom.xml`, feed.atom1());
    fs.writeFileSync(`./public/rss/feed.json`, feed.json1());
    console.log('RSS Feed generated!');
  } catch (e) {
    console.error(e);
  }
};

generateRSS();
