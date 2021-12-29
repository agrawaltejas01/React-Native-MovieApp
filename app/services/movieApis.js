import axios from 'axios';
import * as theMovieDb from '../config/TheMovieDB';

export async function getPopularMovies() {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/movie/popular?${theMovieDb.key}`,
    );
    return response.data.results;
}

export async function getUpcomingMovies() {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/movie/upcoming?${theMovieDb.key}`,
    );
    return response.data.results;
}
