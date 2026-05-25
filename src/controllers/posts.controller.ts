import express, { Request, Response } from 'express';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'public/posts');

export const getAllPosts = (req: Request, res: Response): void => {
  try {
    const fileNames: string[] = fs.readdirSync(POSTS_DIR);

    const posts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace('.md', '');
        const fullPath = path.join(POSTS_DIR, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data, content } = matter(fileContents);

        return {
          slug,
          frontmatter: data,
          content,
        };
      });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read posts directory' });
  }
};

export const getPost = (req: Request, res: Response): void => {
  try {
    const { slug } = req.params;
    const fullPath = path.join(POSTS_DIR, `${slug}`);

    if (!fs.existsSync(fullPath)) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    res.json({ slug, frontmatter: data, content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read post' });
  }
};
