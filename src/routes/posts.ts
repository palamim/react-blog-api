import express from 'express';
import { getAllPosts, getPost } from '../controllers/posts.controller';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:slug', getPost);

export default router;
