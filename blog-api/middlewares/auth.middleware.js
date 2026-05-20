import { keyExists } from "../services/keys.service.js";
import { getPostById } from "../services/posts.service.js";
import { getCommentById } from "../services/comments.service.js";

export const authenticateKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if(!apiKey) {
        next({
            status : 401,
            message : 'No API key provided'
        });
    }

    const result = await keyExists(apiKey);

    if(!result.success) {
        next({
            status : 401,
            message : result.message
        });
    }
    next();
}

export const authorizePost = async (req, res, next) => {
    const user = global.user;
    const result = await getPostById(req.params.postId);
    if(result.post.userId !== user.userId) {
        next({
            status : 403,
            message : 'User not authorized to perform this action'
        });
    }
    next();
}

export const authorizeComment = async (req, res, next) => {
    const user = global.user;
    const result = await getCommentById(req.params.commentId);
    
    if(result.comment.userId !== user.userId) {
        next({
            status : 403,
            message : 'User not authorized to perform this action'
        });
    }
    next();
}

export const authorizeUser = (req, res, next) => {
    const user = global.user; 
    if(!user) {
        next({
            status : 401,
            message : 'User not logged in'
        });
    }
    next();
}