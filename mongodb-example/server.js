import express from 'express';
import dotenv from 'dotenv';
import movieRouter from './routes/movies.route.js';
import mongoose from 'mongoose';

// Config
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8081;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;
// console.log(database);


// Middlewares
app.use(express.json());

// Routes
app.use('/api/movies', movieRouter);

// Server
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
