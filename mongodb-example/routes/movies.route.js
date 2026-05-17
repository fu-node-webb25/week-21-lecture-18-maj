import { Router } from 'express';

const router = Router();

// GET all movies
router.get('/', (req, res) => {
    res.json({ message: 'List of movies' });
});

// POST new movie
router.post('/', (req, res) => {
    res.json({ message: 'Movie added successfully' });
});

export default router;