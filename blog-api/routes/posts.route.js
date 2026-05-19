import { Router } from 'express';
import { authenticateKey, authorizePost, authorizeUser } from '../middlewares/auth.middleware.js';
import { getPosts, getPostsByUserId, addPost, updatePost, deletePost } from '../services/posts.service.js';

const router = Router();

router.use(authenticateKey);

// GET POSTS
router.get('/', async (req, res, next) => {
    const result = await getPosts();
    if(result.success) {
        res.json({
            success : true,
            posts : result.posts
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

// GET post by userId
router.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const result = await getPostsByUserId(userId);

    if(result.success) {
        res.json({
            success : true,
            posts : result.posts
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

// POST new post
router.post('/', authorizeUser, async (req, res, next) => {
    const post = req.body;
    if(!post) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await addPost({
        postId : crypto.randomUUID().substring(0, 5),
        ...post,
        userId : global.user.userId,
        author : global.user.username
    });

    if(result.success) {
        res.status(201).json({
            success : true,
            post : result.post
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

// PUT new post
router.put('/:postId', authorizePost, async (req, res, next) => {
    const { postId } = req.params;
    const post = req.body;
    if(!post) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }
    const result = await updatePost(postId, {
        postId,
        ...post,
        userId : global.user.userId,
        author : global.user.username
    });

    if(result.success) {
        res.json({
            success :true,
            message : 'Post updated successfully',
            post : result.post
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

// DELETE post
router.delete('/:postId', authorizePost, async (req, res, next) => {
    const { postId } = req.params;
    const result = await deletePost(postId);

    if(result.success) {
        res.json({
            success : true,
            post : result.post
        });
    } else {
        next({
            status : 404,
            message : result.message
        });
    }
});

export default router;