import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FindingCard = () => {
    return (
        <View style={styles.card}>
            <Text>Finding Card Component</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
});

export default FindingCard;
