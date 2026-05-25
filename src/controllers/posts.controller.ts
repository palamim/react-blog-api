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

export const createPost = (req: Request, res: Response): void => {
  try {
    const { title, description, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const fullPath = path.join(POSTS_DIR, `${slug}.md`);

    if (fs.existsSync(fullPath)) {
      res.status(409).json({ error: 'Post with this title already exists' });
      return;
    }

    const date = new Date().toISOString().split('T')[0];

    const fileContent = `---
title: '${title}'
description: '${description || ''}'
pubDate: ${date}
---

${content}`;

    fs.writeFileSync(fullPath, fileContent, 'utf8');

    res.status(201).json({ slug, message: 'Post created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};
