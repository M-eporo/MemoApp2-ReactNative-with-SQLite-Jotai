import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * 
 * @returns メモ修正画面
 */
export default function MemoEditScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
      const navigation = useNavigation();
  
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
    <View style={styles.container}>
      <Text style={styles.title}>メモ修正: {id}</Text>
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
