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

export async function getPopularTvShows() {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/tv/popular?${theMovieDb.key}`,
    );
    return response.data.results;
}

export async function getFamilyMovies() {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/discover/movie?${theMovieDb.key}&with_genres=${theMovieDb.movieIds.family}`,
    );
    return response.data.results;
}

export async function getDocumentryMovies() {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/discover/movie?${theMovieDb.key}&with_genres=${theMovieDb.movieIds.documentry}`,
    );
    return response.data.results;
}

export async function getMovieDetails(id) {
    const response = await axios.get(
        `${theMovieDb.baseUrl.api}/movie/${id}?${theMovieDb.key}`,
    );
    return response.data;
}
