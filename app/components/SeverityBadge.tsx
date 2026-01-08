import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SeverityBadge = () => {
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>Severity Badge</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 12,
    },
});

export default SeverityBadge;
