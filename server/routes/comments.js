import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createComment, deleteComment } from '../controllers/comments.js';

const router = new Router();

// Create Comment
// http://localhost:3002/api/comments/:postId
router.post('/:postId', checkAuth, createComment);

// Delete Comment
// http://localhost:3002/api/comments/:postId/:commentId
router.delete('/:postId/:commentId', deleteComment);

export default router;