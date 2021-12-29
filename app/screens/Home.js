import React, { useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';

import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { getUpcomingMovieImages } from '../services/getMovies';

const screenDimensons = Dimensions.get('screen');
const Home = () => {
    const [movieImages, setMovieImages] = useState('');
    const [err, setError] = useState(null);
    useEffect(() => {
        getUpcomingMovieImages()
            .then(imageList => {
                setMovieImages(imageList);
            })
            .catch(err => {
                console.log(err);
                setError(err.message);
                setMovieImages('');
            });
    }, []);
    return (
        <View style={styles.sliderContainer}>
            <SliderBox
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={screenDimensons.height / 1.5}
                images={movieImages}
                dotStyle={styles.slider}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    slider: {
        height: 0,
    },
});

export default Home;
