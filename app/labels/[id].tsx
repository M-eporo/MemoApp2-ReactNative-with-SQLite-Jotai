import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * ラベル修正画面
 * @returns 
 */
export default function LabelEditScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();

  /**
   * 「修正」が押されたときの処理
   */
  const handleEditPress = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ラベル修正: {id}</Text>
      <Button title="ラベル修正" onPress={handleEditPress} />
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
