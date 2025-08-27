import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LabelListItem from '../../src/components/LabelListItem';
import { setLabelId } from '../../src/features/label/labelSlice';
import { useAppDispatch } from '../../src/store/hooks';
import { LABEL_DATA } from '../../src/dummy_data/labelData';

/**
 * ホーム画面
 */
export default function HomeScreen() {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  // const reduxLabelId = useAppSelector((state) => state.label);
  /**
   * ナビゲーションバーのカスタマイズ
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress} />;
      }
    });
  }, []);

  /**
   * 「すべてのメモ」が押されたときの処理
   */
  const handleAllMemoPress = () => {
    dispatch(setLabelId(null));
    router.push({
      pathname: '/memos'
    });
  };

  /**
   * ラベルが押されたときの処理
   * @param labelId
   */
  const handleLabelPress = (labelId: number) => {
    //クエリパラメーターでlabelIdを渡す。
    //遷移先では、useLocalSearchparams()フックで取得する
    //const params = { labelId: labelId };
    // router.push({
    //     pathname: "/memos", params: params
    // })
    dispatch(setLabelId(labelId));
    router.push({ pathname: 'memos' });
  };

  /**
   * 「ラベル追加」が押されたときの処理
   */
  const handleAddLabelPress = () => {
    router.push({
      pathname: '/labels/create'
    });
  };

  /**
   * 「ラベル修正」が押されたときの処理
   * @param labelId
   */
  const handleEditLabelPress = (labelId: number) => {
    router.push({
      pathname: `/labels/${labelId}`
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 36 }}>
        {/* すべてのメモ */}
        <ListItem bottomDivider onPress={handleAllMemoPress}>
          <ListItem.Content>
            <ListItem.Title>すべてのメモ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Text style={styles.sectionText}>ラベル</Text>

        {/* ラベルリスト */}
        {LABEL_DATA.map(item => (
          <LabelListItem
            key={item.id}
            color={item.color}
            name={item.name}
            onPress={() => handleLabelPress(item.id)}
            onEditPress={() => handleEditLabelPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#efeff4'
  },
  sectionText: {
    marginTop: 32,
    marginBottom: 8,
    marginLeft: 16,
    fontSize: 14,
    color: '#707070'
  }
});
