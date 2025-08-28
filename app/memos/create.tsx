import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import MemoInputForm from '../../src/components/MemoInputForm';
import { useAppSelector } from '../../src/store/hooks';
import * as MemoService from "../../src/services/memoService";
import { Indicator } from "../../src/components/Indicator";

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedLabelId = useAppSelector(state => state.label.id);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress} />;
      }
    });
  }, [title, content]);
  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = async () => {
    //validation
    if(!title){
        Alert.alert("確認", "タイトルを入力してください");
        return;
    }
    setIsLoading(true);
    try {
      await MemoService.addMemo(title, content);
      router.back();
    } catch (error) {
      console.error("メモ作成エラー：", error);
      Alert.alert("エラー", "メモの作成に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <MemoInputForm title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />
      <Indicator visible={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
