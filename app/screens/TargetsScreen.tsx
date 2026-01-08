import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TargetsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Targets Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default TargetsScreen;
