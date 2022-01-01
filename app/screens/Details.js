import React, { useEffect, useState, Fragment } from 'react';
import {
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { getMovieDetails } from '../services/movieApis';
import * as theMovieDBConfig from '../config/TheMovieDB';
import Error from '../components/Error';
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
                    <Text>{movieDetails.original_title}</Text>
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
    image: {
        height: screenDimensons.height / 2,
        borderRadius: 20,
    },
});

export default Details;
