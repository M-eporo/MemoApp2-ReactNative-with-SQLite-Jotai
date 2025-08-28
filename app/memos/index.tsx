import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation, useFocusEffect } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import LabelListModal from '../../src/components/LabelListModal';
import LabelTag from '../../src/components/LabelTag';
import MemoListItem from '../../src/components/MemoListItem';
import { useAppSelector } from '../../src/store/hooks';
import { LABEL_DATA } from '../../src/dummy_data/labelData';
import { MEMO_DATA } from '../../src/dummy_data/memoData';
import { Label } from '../../src/types/label';
import { Memo } from '../../src/types/memo';
import * as MemoService from "../../src/services/memoService";

/**
 *  メモ一覧画面
 */
export default function MemoListScreen(): React.JSX.Element {
  const navigation = useNavigation();
  //const { labelId } = useLocalSearchParams();
  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false);
  //選択されているラベルID
  const selectedLabelId = useAppSelector(state => state.label.id);

  const [labels, setLabels] = useState<Label[]>([]);  //Label List
  const [memos, setMemos] = useState<Memo[]>([]); //Memo List

  const selectedLabel = labels.find(label => label.id === selectedLabelId);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress} />;
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadData = async(labelId: number | null) => {
        try {
          const labels = LABEL_DATA;
          setLabels(labels);

          const memos = await MemoService.getMemos();
          const filteredMemos = labelId ? memos.filter(memo => memo.labelId === selectedLabelId) : memos;
          setMemos(filteredMemos);
        } catch(error) {
          Alert.alert("エラー", "データの取得に失敗しました。", [{
            text: "OK",
            onPress: () => router.back()
          }])
        }
      };
      loadData(selectedLabelId);
    },[selectedLabelId])
  )


  /**
   * 「メモ作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.push({
      pathname: 'memos/create'
    });
  };

  /**
   * メモが押されたときの処理
   * @param memoId
   */
  const handleMemoPress = (memoId: string) => {
    router.push({
      pathname: `/memos/${memoId}`
    });
  };

  // ラベルリストモーダルを表示
  const handleMemoLongPress = (memoId: string) => {
    console.log('メモが長押しされました。', memoId);
    setIsLabelListModalVisible(true);
  };

  const handleMemoDeletePress = (memoId: string) => {
    console.log('メモが削除されました。', memoId);
  };

  /**
   * ラベルが押された時の処理
   * @param labelId
   */
  const handleLabelPress = (labelId?: number) => {
    console.log('ラベルが押されました', labelId);
    setIsLabelListModalVisible(false);
  };
  /**
   * ラベル閉じるボタンの処理
   */
  const handleLabelListModalClose = () => {
    setIsLabelListModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          selectedLabel ? (
            <View style={{ margin: 10 }}>
              <LabelTag color={selectedLabel.color} name={selectedLabel.name} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        data={memos}
        renderItem={({ item }) => (
          <MemoListItem
            name={item.title}
            content={item.content}
            onPress={() => handleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={selectedLabelId ? undefined : labels.find(label => label.id === item.labelId)}
          />
        )}
        keyExtractor={item => item.id}
      />
      <LabelListModal
        visible={isLabelListModalVisible}
        title="ラベル設定"
        data={labels}
        onPress={handleLabelPress}
        onClose={handleLabelListModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
