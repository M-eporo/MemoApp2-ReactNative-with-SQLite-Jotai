import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <Button title="メモ作成" onPress={handleCreatePress} />;
            }
        })
    }, [])
    /**
     * 「作成」が押されたときの処理
     */
    const handleCreatePress = () => {
        router.back();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>メモ作成</Text>
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