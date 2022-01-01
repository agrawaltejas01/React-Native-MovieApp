import React, { useEffect, useState, Fragment } from 'react';
import {
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import StarRating from 'react-native-star-rating';

import { getMovieDetails } from '../services/movieApis';
import * as theMovieDBConfig from '../config/TheMovieDB';
import Error from '../components/Error';
import PlayButton from '../components/PlayButton';
const posterPlaceHolder = require('../../assets/images/place-holders/movie-poster.png');

const screenDimensons = Dimensions.get('screen');
async function getData(id) {
    return Promise.all([getMovieDetails(id)]);
}

const Details = ({ route, navigation }) => {
    const [movieDetails, setMovieDetails] = useState({});
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const movieId = route.params.movieId;

    useEffect(
        () => {
            getData(movieId)
                .then(([details]) => {
                    setMovieDetails(details);

                    setLoaded(true);
                })
                .catch(err => {
                    console.log(err);
                    setError(err.message);
                    setMovieDetails({});
                });
        },
        // This array contains all the vars which useEffect function is gonna use/update.
        // Basically all the variables that useEffect depends on
        // Even if its a state/prop
        [movieId],
    );

    return (
        <Fragment>
            {loaded && !error && (
                <ScrollView>
                    {/* Poster */}
                    <Image
                        style={styles.image}
                        source={
                            movieDetails.poster_path
                                ? {
                                      uri: `${theMovieDBConfig.baseUrl.poster}${movieDetails.poster_path}`,
                                  }
                                : posterPlaceHolder
                        }
                    />
                    <View style={styles.container}>
                        <View style={styles.playButton}>
                            <PlayButton />
                        </View>

                        <View style={styles.container}>
                            {/* Title */}
                            <Text style={styles.movieTitle}>
                                {movieDetails.original_title}
                            </Text>
                        </View>

                        {/* Genres */}
                        <View style={styles.container}>
                            {movieDetails.genres && (
                                <View style={styles.genresContainer}>
                                    {movieDetails.genres.map(genre => {
                                        return (
                                            <Text
                                                key={genre.id}
                                                style={styles.genre}>
                                                {genre.name}
                                            </Text>
                                        );
                                    })}
                                </View>
                            )}
                        </View>

                        {/* Rating */}
                        <View style={styles.container}>
                            {movieDetails.vote_average && (
                                <StarRating
                                    rating={movieDetails.vote_average / 2}
                                    disabled={true}
                                    fullStarColor={'gold'}
                                    starSize={20}
                                    maxStars={5}
                                />
                            )}
                        </View>

                        {/* Overview */}
                        <View style={styles.container}>
                            {movieDetails.overview && (
                                <Text style={styles.overview}>
                                    {movieDetails.overview}
                                </Text>
                            )}
                        </View>

                        {/* Release Date */}
                        <View style={styles.container}>
                            {movieDetails.release_date && (
                                <Text
                                    style={
                                        styles.releaseDate
                                    }>{`Release Date: ${movieDetails.release_date}`}</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            )}
            {!loaded && !error && (
                <ActivityIndicator size="large" color="dodgerblue" />
            )}
            {error && (
                <Error error="Error in Getting Movie Details" detail={error} />
            )}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        height: screenDimensons.height / 2,
        borderRadius: 10,
    },

    playButton: {
        position: 'absolute',
        top: -30,
        right: 20,
    },

    movieTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },

    genresContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        marginBottom: 10,
    },

    genre: {
        marginRight: 10,
        marginLeft: 10,
        fontWeight: 'bold',
    },

    overview: {
        padding: 10,
    },

    releaseDate: {
        fontWeight: 'bold',
    },
});

export default Details;
