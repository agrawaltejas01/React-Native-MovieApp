import React, { Fragment, useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
} from 'react-native';
// import TextInput from 'react-native-text-input-interactive';
import { AwesomeTextInput } from 'react-native-awesome-text-input';

import {
    getUpcomingMovieImages,
    getPopularMovies,
    getPopularTvShows,
    getFamilyMovies,
    getDocumentryMovies,
} from '../services/getMovies';
import List from '../components/List';
import Error from '../components/Error';
import Icon from 'react-native-vector-icons/Ionicons';

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

const Home = ({ navigation }) => {
    const [text, setText] = useState('');
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
                    <View
                    // style={styles.searchContainer}
                    >
                        <TextInput
                            style={styles.searchBar}
                            // underlineColorAndroid="transparent"
                            placeholder="Movie Name..."
                            keyboardType="default"
                            onChangeText={text => setText(text)}
                            value={text}
                            placeholderTextColor={'black'}
                            // customStyles={{
                            //     container: {
                            //         borderWidth: 1,
                            //         borderColor: 'grey',
                            //         borderRadius: 10,
                            //     },
                            //     title: {
                            //         backgroundColor: 'white',
                            //     },
                            // }}
                        />
                    </View>
                    {/* <Icon
                            style={styles.searchButton}
                            name={'search'}
                            size={50}
                            color={'#fff'}
                        /> */}
                    {/* </TextInput> */}

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
                                content={popularMovies}
                                navigation={navigation}></List>
                        </View>
                    )}
                    {popularTvShows && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Popular Tv Shows"
                                content={popularTvShows}
                                navigation={navigation}></List>
                        </View>
                    )}
                    {familyMovies && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Family Movies"
                                content={familyMovies}
                                navigation={navigation}></List>
                        </View>
                    )}
                    {documentryMovies && (
                        <View style={styles.sliderContainer}>
                            <List
                                title="Documentry Movies"
                                content={documentryMovies}
                                navigation={navigation}></List>
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

    searchContainer: {
        // position: 'absolute',
        // // top: 20,
        // right: 20,
        padding: 10,
    },

    searchButton: {
        fontWeight: 'bold',
        fontSize: 60,
    },

    searchBar: {
        height: 80,
        padding: 0,
        lineHeight: 14,
        color: 'white',
        // width: 100,
        // margin: 12,
        // borderWidth: 1,
        // padding: 10,
    },
});

export default Home;
