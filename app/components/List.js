import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

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
                        renderItem={({ item }) => <Text>{item.title}</Text>}
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
