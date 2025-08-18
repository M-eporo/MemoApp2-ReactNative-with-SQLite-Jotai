import { StyleSheet, View, Text, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';

/**
 * ホーム画面
 * @returns 
 */

export default function HomeScreen() {
    const navigation = useNavigation();

    /**
     * ナビゲーションバーのカスタマイズ
     */
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress} />
            }
        })
    }, []);

    /**
     * 「すべてのメモ」が押されたときの処理
     */
    const handleAllMemoPress = () => {
        router.push({
            pathname: "/memos"
        });
    };

    /**
     * ラベルが押されたときの処理
     * @param labelId 
     */
    const handleLabelPress = (labelId: number) => {
        const params = { labelId: labelId };
        router.push({
            pathname: "/memos", params: params
        })

    };

    /**
     * 「ラベル追加」が押されたときの処理
     */
    const handleAddLabelPress = () => {
        router.push({
            pathname: "/labels/create"
        });
    };

    /**
     * 「ラベル修正」が押されたときの処理
     * @param labelId 
     */
    const handleEditLabelPress = (labelId: number) => {
        router.push({
            pathname: `/labels/${labelId}`
        })
    };

    return (
        <View style={styles.container}>
            <Button title="すべてのメモ" onPress={handleAllMemoPress} />
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Button title="ラベル1" onPress={() => handleLabelPress(1)} />
                <MaterialIcons name="edit" size={24} color="black" onPress={() => handleEditLabelPress(1)} />
            </View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Button title="ラベル2" onPress={() => handleLabelPress(2)} />
                <MaterialIcons name="edit" size={24} color="black" onPress={() => handleEditLabelPress(2)} />
            </View>
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