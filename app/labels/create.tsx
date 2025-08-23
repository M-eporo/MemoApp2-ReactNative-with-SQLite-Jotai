import { router } from 'expo-router';
import {  useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, InputField, VStack } from "@gluestack-ui/themed";
import { ColorPicker } from '../../src/components/ColorPicker';
import { Button, ButtonText } from "@gluestack-ui/themed";

/**
 * 
 * @returns ラベル作成画面
 */
export default function LabelCreateScreen() {
    const [labelName, setLabelName] = useState<string>("");
    const [color, setColor] = useState<string | undefined>(undefined);

    const handleColorPress = (color: string) => {
        setColor(color);
    };

    /**
     * 「作成」が押されたときの処理
     */
    const handleCreatePress = () => {
        router.dismiss();
    }

    return (
        <View style={styles.container}>
            <VStack space="lg">
                <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
                    <InputField paddingLeft={"$2"} placeholder="ラベル名" onChangeText={setLabelName} />
                </Input>
                <ColorPicker onPress={handleColorPress} />
                <Button size="md" action="primary" marginHorizontal={"$4"} onPress={handleCreatePress} >
                    <ButtonText>作成</ButtonText>
                </Button>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efeff4",
    },
})