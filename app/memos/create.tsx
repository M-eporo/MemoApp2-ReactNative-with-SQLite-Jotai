import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import MemoInputForm from '../../src/components/MemoInputForm';
import { useAppSelector } from '../../src/store/hooks';
/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const selectedLabelId = useAppSelector(state => state.label.id);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress} />;
      }
    });
  }, []);
  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    console.log(`メモに、ラベル ${selectedLabelId}を設定`);
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <MemoInputForm title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
