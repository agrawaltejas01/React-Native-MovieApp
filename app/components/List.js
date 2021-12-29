import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from './Card';

class List extends React.PureComponent {
    render() {
        const { title, content } = this.props;
        return (
            <View style={styles.list}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View>
                    <FlatList
                        data={content}
                        horizontal={true}
                        renderItem={({ item }) => <Card item={item} />}
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

export default List;
