import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

/**
 *  メモ一覧画面
 */
export default function MemoListScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { labelId } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress}/>
      }
    })
  }, [])

  /**
   * 「メモ作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.push({
        pathname: "memos/create"
    })
  };

  /**
   * メモが押されたときの処理
   * @param memoId 
   */
  const handleMemoPress = (memoId: string) => {
    router.push({
        pathname: `/memos/${memoId}`
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{labelId ? `ラベルID: ${labelId}` : "すべてのメモ"}</Text>

      <Button title="メモ1" onPress={() => handleMemoPress("A")} />
      <Button title="メモ2" onPress={() => handleMemoPress("B")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efeff4'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
