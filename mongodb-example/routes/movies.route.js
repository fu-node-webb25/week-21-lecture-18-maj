import { Router } from 'express';
import { createMovie, getMovies } from '../services/movie.service.js';

const router = Router();

// GET all movies
router.get('/', async (req, res) => {
    const result = await getMovies();
    if(result.success) {
        res.json({
            success : true,
            movies : result.movies
        });
    } else {
        res.status(404).json({
            success : false,
            message : result.message
        })
    }
});

// POST new movie
router.post('/', async (req, res) => {
    const result = await createMovie(req.body)
    if(result.success) {
        res.status(201).json({
            success: true,
            message : 'New movie added successfully'
        });
    } else {
        res.status(400).json({
            success : false,
            message : result.message
        });
    }
});

export default router;