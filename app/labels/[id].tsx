import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Input, InputField, VStack } from "@gluestack-ui/themed";
import {  useState } from 'react';
import { ColorPicker } from '../../src/components/ColorPicker';
import { Button, ButtonText } from "@gluestack-ui/themed";


/**
 * ラベル修正画面
 * @returns 
 */
export default function LabelEditScreen(): React.JSX.Element {
  const { id } = useLocalSearchParams();
  const [labelName, setLabelName] = useState<string>("");
  const [color, setColor] = useState<string | undefined>(undefined);

  const handleColorPress = (color: string) => {
        setColor(color);
  };
  
  /**
   * 「修正」が押されたときの処理
   */
  const handleEditPress = () => {
    router.dismiss();
  };

  const handleDeletePress = () => {
    router.dismiss();
  };


  return (
    <View style={styles.container}>
      <VStack space="lg">
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField paddingLeft={"$2"} placeholder="ラベル名" onChangeText={setLabelName} />
        </Input>
        <ColorPicker onPress={handleColorPress} />
        <VStack space="md">
          <Button size="md" action="primary" marginHorizontal={"$4"} onPress={handleEditPress} >
            <ButtonText>修正</ButtonText>
          </Button>
          <Button size="md" action="negative" marginHorizontal={"$4"} onPress={handleDeletePress} >
            <ButtonText>修正</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff4'
  },
});
