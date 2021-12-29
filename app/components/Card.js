import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';

import * as theMovieDBConfig from '../config/TheMovieDB';
const posterPlaceHolder = require('../../assets/images/place-holders/movie-poster.png');

const screenDimensons = Dimensions.get('screen');

class Card extends React.PureComponent {
    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                {/* <Text>{item.title}</Text> */}
                <Image
                    style={styles.image}
                    source={
                        item.poster_path
                            ? {
                                  uri: `${theMovieDBConfig.baseUrl.poster}${item.poster_path}`,
                              }
                            : posterPlaceHolder
                    }
                />
                {!item.poster_path && (
                    <Text style={styles.movieName}>{item.title}</Text>
                )}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        position: 'relative',
        height: screenDimensons.height / 3,
        // width: screenDimensons.width / 5,
    },

    image: {
        height: 200,
        width: 120,
        borderRadius: 20,
    },

    movieName: {
        position: 'absolute',
        width: 100,
        textAlign: 'center',
    },
});

export default Card;
