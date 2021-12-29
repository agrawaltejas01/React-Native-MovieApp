import React, { useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';

import { Text, View } from 'react-native';

import { getUpcomingMovieImages } from '../services/getMovies';

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
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <SliderBox images={movieImages} />
        </View>
    );
};

export default Home;
