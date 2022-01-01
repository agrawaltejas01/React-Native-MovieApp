import * as movieApi from './movieApis';
import * as movieApiConfig from '../config/TheMovieDB';

export async function getUpcomingMovieImages() {
    const response = await movieApi.getUpcomingMovies();
    let toReturn = [];
    response.forEach(movie => {
        toReturn.push(`${movieApiConfig.baseUrl.poster}${movie?.poster_path}`);
    });
    return toReturn;
}

export async function getPopularMovies() {
    return await movieApi.getPopularMovies();
}

export async function getPopularTvShows() {
    return await movieApi.getPopularTvShows();
}

export async function getFamilyMovies() {
    return await movieApi.getFamilyMovies();
}

export async function getDocumentryMovies() {
    return await movieApi.getDocumentryMovies();
}

export async function getMovieDetails(id) {
    return await movieApi.getMovieDetails(id);
}
