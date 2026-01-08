import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../theme';

const HistoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>History</Text>
            <Text style={styles.subtitle}>Past workout sessions</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Theme.colors.text,
        marginBottom: Theme.spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: Theme.colors.textSecondary,
    },
});

export default HistoryScreen;
