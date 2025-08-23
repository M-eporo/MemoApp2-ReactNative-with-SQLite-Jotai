import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View,FlatList } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MemoListItem from '../../src/components/MemoListItem';
import LabelTag from '../../src/components/LabelTag';
import LabelListModal from '../../src/components/LabelListModal';
import { useAppSelector } from '../../src/app/hooks';

/**
 * ダミーデータ
 */
const MEMO_DATA = [
  {
    id: "ABC",
    name: "useStateについて",
    content: "useStateの説明",
    label: {
      name: "プログラミング", color: "blue"
    },
  },
  {
    id: "DEF",
    name: "アカウント",
    content: "メールアドレス：abc123@mail.com\nパスワード：abc123",
  },
  {
    id: "GHI",
    name: "オムライスレシピ",
    content: "卵：2個\nごはん：200g\n玉ねぎ：1/4個\nケチャップ",
  }
];

const LABEL_DATA = [
    {
        id: 1,
        name: "Programming",
        color: "blue"
    },
    {
        id: 2,
        name: "Password",
        color: "green"
    },
    {
        id: 3,
        name: "User Name",
        color: "red"
    }
];
/**
 *  メモ一覧画面
 */
export default function MemoListScreen(): React.JSX.Element {
  const navigation = useNavigation();
  //const { labelId } = useLocalSearchParams();
  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false);
  //選択されているラベルID
  const selectedLabelId = useAppSelector((state) => state.label.id);
  const selectedLabel = LABEL_DATA.find(label => label.id === selectedLabelId);
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

  // ラベルリストモーダルを表示
  const handleMemoLongPress = (memoId: string) => {
    console.log("メモが長押しされました。", memoId);
    setIsLabelListModalVisible(true);
  };

  const handleMemoDeletePress = (memoId: string) => {
    console.log("メモが削除されました。", memoId);
  };

  /**
   * ラベルが押された時の処理
   * @param labelId 
   */
  const handleLabelPress = (labelId?: number) => {
    console.log("ラベルが押されました", labelId);
    setIsLabelListModalVisible(false)
  };
  /**
   * ラベル閉じるボタンの処理
   */
  const handleLabelListModalClose = () => {
    setIsLabelListModalVisible(false);
  }

  return (
    <View style={styles.container}>

      <FlatList
        ListHeaderComponent={
          selectedLabel ? (
            <View style={{margin: 10}}>
              <LabelTag color={selectedLabel.color} name={selectedLabel.name} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={{paddingBottom: 100}}
        data={MEMO_DATA}
        renderItem={({item}) => (
          <MemoListItem
            name={item.name}
            content={item.content}
            onPress={() => handleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={item.label}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <LabelListModal
        visible={isLabelListModalVisible}
        title="ラベル設定"
        data={LABEL_DATA}
        onPress={handleLabelPress}
        onClose={handleLabelListModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
