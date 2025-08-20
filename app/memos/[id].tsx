import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect,useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import MemoInputForm  from "../../src/components/MemoInputForm";
import { KeyboardAvoidingView } from '@gluestack-ui/themed';


/**
 * 
 * @returns メモ修正画面
 */
export default function MemoEditScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  useEffect(() => {
      navigation.setOptions({
          headerRight: () => {
              return <Button title="保存" onPress={handleSavePress} />;
          }
      })
  }, [])
  /**
   * 「保存」が押されたときの処理
   */
  const handleSavePress = () => {
    router.back();
  };

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
    backgroundColor: '#ffffff'
  },
});
