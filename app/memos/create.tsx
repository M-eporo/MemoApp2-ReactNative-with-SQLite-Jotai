import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import MemoInputForm  from "../../src/components/MemoInputForm";

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
    const navigation = useNavigation();
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

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
        <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
            <MemoInputForm 
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
            />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
})