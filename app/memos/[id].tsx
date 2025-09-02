import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect,useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import MemoInputForm  from "../../src/components/MemoInputForm";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import * as MemoService from "../../src/services/memoService";
import { Indicator } from "../../src/components/Indicator";

/**
 * 
 * @returns メモ修正画面
 */
export default function MemoEditScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams() as { id: string };
  const navigation = useNavigation();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
      navigation.setOptions({
          headerRight: () => {
              return <Button title="保存" onPress={handleSavePress} />;
          }
      })
  }, [title, content]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async(memoId: string) => {
      try {
        const memo = await MemoService.getMemo(memoId);
        if(!memo) {
          Alert.alert("エラー", "メモが見つかりませんでした。", [
            {
              text: "OK",
              onPress: () => {
                router.back();
              }
            }
          ]);
          return;
        }
        
        setTitle(memo.title);
        setContent(memo.content);

      } catch(error) {
        Alert.alert("エラー", "データの取得に失敗しました。", [
          {
            text: "OK",
            onPress: () => {
              router.back()
            }
          }
        ]);
      }

      if(isMounted) {
        loadData(id)
      }

      return () => {
        isMounted = false;
      }
    }
  },[id]);
  /**
   * 「保存」が押されたときの処理
   */
  const handleSavePress = async () => {
    if(!title){
      Alert.alert("確認", "タイトルを入力してください。");
      return;
    }

    try {
      await MemoService.editMemo(id, title, content);
      router.back();
    } catch(error) {
      Alert.alert("エラー", "メモの修正に失敗しました。");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <MemoInputForm 
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
      />
      <Indicator visible={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});
