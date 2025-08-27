import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import * as LabelService from "../src/services/labelService";
import * as MemoService from "../src/services/memoService";
import { getDbFilePath } from '../src/database/dbService';
import { get } from '@gluestack-style/react';

/**
 * App起動時の処理
 * @returns 
 */

export default function InitialScreen() {

    useEffect(() => {
        initApp();
    }, []);

    /**
     * アプリ初期化処理
     */
    const initApp = async () => {
        try {
            //テーブル作成処理
            await LabelService.createTable();
            await MemoService.createTable();
            console.log(getDbFilePath());
            router.replace("/home");
        }catch(error) {
            console.error("アプリ起動エラー：", error);
            Alert.alert("エラー", "アプリの起動に失敗しました。", [
                {
                    text: "再起動",
                    onPress: () => {
                        initApp();
                    }
                }
            ])
            throw error;
        }
    };

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