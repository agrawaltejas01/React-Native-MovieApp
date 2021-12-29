import React, { Fragment, useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import {
    getUpcomingMovieImages,
    getPopularMovies,
} from '../services/getMovies';
import List from '../components/List';

const screenDimensons = Dimensions.get('screen');
const Home = () => {
    const [movieImages, setMovieImages] = useState('');
    const [popularMovies, setPopularMovies] = useState('');
    const [err, setError] = useState(null);
    useEffect(() => {
        getUpcomingMovieImages()
            .then(imageList => {
                // console.log(imageList);
                setMovieImages(imageList);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setMovieImages('');
            });

        getPopularMovies()
            .then(movies => {
                // console.log(movies);
                setPopularMovies(movies);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setMovieImages('');
            });
    }, []);
    return (
        <Fragment>
            <View style={styles.sliderContainer}>
                <SliderBox
                    autoplay={true}
                    circleLoop={true}
                    sliderBoxHeight={screenDimensons.height / 1.5}
                    images={movieImages}
                    dotStyle={styles.sliderDots}
                />
            </View>
            <View style={styles.sliderContainer}>
                <List title="Popular Movies" content={popularMovies}></List>
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderDots: {
        height: 0,
    },
});

export default Home;
