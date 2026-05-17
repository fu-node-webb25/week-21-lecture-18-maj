import express from 'express';
import dotenv from 'dotenv';
import movieRouter from './routes/movies.route.js';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;

// Middlewares
app.use(express.json());

// Routes
app.use('/api/movies', movieRouter);

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});