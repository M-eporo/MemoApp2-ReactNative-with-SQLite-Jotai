import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

/**
 * 
 * @returns ラベル作成画面
 */
export default function LabelCreateScreen() {

    /**
     * 「作成」が押されたときの処理
     */
    const handleCreatePress = () => {
        router.dismiss();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ラベル作成</Text>
            <Button title="ラベル作成" onPress={handleCreatePress} />
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