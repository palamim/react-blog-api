const express = require('express');
const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const POSTS_DIR = path.join(process.cwd(), 'public/posts');

router.get('/', (req, res) => {
  try {
    const fileNames = fs.readdirSync(POSTS_DIR);

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
});

module.exports = router;
