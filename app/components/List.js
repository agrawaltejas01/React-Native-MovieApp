import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    content: PropTypes.array,
};

class List extends React.PureComponent {
    render() {
        const { title, content, navigation } = this.props;
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View>
                    <FlatList
                        data={content}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <Card navigation={navigation} item={item} />
                        )}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 20,
    },

    list: {
        marginTop: 25,
    },
});

List.propTypes = propTypes;
export default List;
