import React, { Fragment, useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native';

import {
    getUpcomingMovieImages,
    getPopularMovies,
    getPopularTvShows,
    getFamilyMovies,
    getDocumentryMovies,
} from '../services/getMovies';
import List from '../components/List';
import Error from '../components/Error';

const screenDimensons = Dimensions.get('screen');

const getData = async function () {
    return Promise.all([
        getUpcomingMovieImages(),
        getPopularMovies(),
        getPopularTvShows(),
        getFamilyMovies(),
        getDocumentryMovies(),
    ]);
};

const Home = () => {
    const [movieImages, setMovieImages] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTvShows, setPopularTvShows] = useState([]);
    const [familyMovies, setFamilyMovies] = useState([]);
    const [documentryMovies, setDocumentryMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {
        getData()
            .then(
                ([
                    imageListData,
                    popularMoviesData,
                    popularTvShowsData,
                    familyMoviesData,
                    documentryMoviesData,
                ]) => {
                    setMovieImages(imageListData);
                    setPopularMovies(popularMoviesData);
                    setPopularTvShows(popularTvShowsData);
                    setFamilyMovies(familyMoviesData);
                    setDocumentryMovies(documentryMoviesData);

                    setLoaded(true);
                    // setError('Test');
                },
            )
            .catch(err => {
                console.log(err);
                setError(err.message);
                setMovieImages('');
            });
    }, []);

    return (
        <Fragment>
            {loaded && !error && (
                <ScrollView>
                    {movieImages && (
                        <View style={styles.sliderContainer}>
                            <SliderBox
                                autoplay={true}
                                circleLoop={true}
                                sliderBoxHeight={screenDimensons.height / 2}
                                images={movieImages}
                                dotStyle={styles.sliderDots}
                            />
                        </View>
                    )}
                    {popularMovies && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Popular Movies"
                                content={popularMovies}></List>
                        </View>
                    )}
                    {popularTvShows && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Popular Tv Shows"
                                content={popularTvShows}></List>
                        </View>
                    )}
                    {familyMovies && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Family Movies"
                                content={familyMovies}></List>
                        </View>
                    )}
                    {documentryMovies && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Documentry Movies"
                                content={documentryMovies}></List>
                        </View>
                    )}
                </ScrollView>
            )}
            {!loaded && !error && (
                <ActivityIndicator size="large" color="dodgerblue" />
            )}
            {error && (
                <Error error="Error in Getting Home Page Data" detail={error} />
            )}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10
    },

    sliderDots: {
        height: 0,
    },
});

export default Home;
