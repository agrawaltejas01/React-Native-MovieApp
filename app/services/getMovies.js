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
