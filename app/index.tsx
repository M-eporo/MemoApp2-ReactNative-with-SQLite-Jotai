import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

/**
 * 
 * @returns 
 */

export default function InitialScreen() {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home");
        })
        return () => clearTimeout(timer);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>アプリ起動中...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#efeff4",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    }
})