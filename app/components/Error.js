import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
    error: PropTypes.string,
    detail: PropTypes.string,
};

class Error extends React.PureComponent {
    render() {
        const { error, detail } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
                <Text style={styles.error}>{detail}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    error: {
        color: 'red',
        fontWeight: 'bold',
    },

    detail: {
        color: 'orange',
    },
});

Error.propTypes = propTypes;
export default Error;
