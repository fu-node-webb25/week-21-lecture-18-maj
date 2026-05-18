import Movie from "../models/movie.model.js";

export const getMovies = async () => {
    try {
        const result = await Movie.find();
        return {
            success : true,
            movies : result
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}

export const createMovie = async (movie) => {
    try {
        await Movie.create(movie);
        return {
            success : true
        }
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}