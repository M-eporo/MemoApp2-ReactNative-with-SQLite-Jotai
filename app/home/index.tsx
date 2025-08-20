import { StyleSheet, View, Text, Button, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ListItem } from "@rneui/themed";
import LabelListItem from '../../src/components/LabelListItem';

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
]

/**
 * ホーム画面
 */
export default function HomeScreen() {
    const navigation = useNavigation();

    /**
     * ナビゲーションバーのカスタマイズ
     */
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress} />
            }
        })
    }, []);

    /**
     * 「すべてのメモ」が押されたときの処理
     */
    const handleAllMemoPress = () => {
        router.push({
            pathname: "/memos"
        });
    };

    /**
     * ラベルが押されたときの処理
     * @param labelId 
     */
    const handleLabelPress = (labelId: number) => {
        const params = { labelId: labelId };
        router.push({
            pathname: "/memos", params: params
        })

    };

    /**
     * 「ラベル追加」が押されたときの処理
     */
    const handleAddLabelPress = () => {
        router.push({
            pathname: "/labels/create"
        });
    };

    /**
     * 「ラベル修正」が押されたときの処理
     * @param labelId 
     */
    const handleEditLabelPress = (labelId: number) => {
        router.push({
            pathname: `/labels/${labelId}`
        })
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingVertical: 36}}>
                {/* すべてのメモ */}
                <ListItem bottomDivider onPress={handleAllMemoPress}>
                    <ListItem.Content>
                        <ListItem.Title>すべてのメモ</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>

                <Text style={styles.sectionText}>ラベル</Text>

                {/* ラベルリスト */}
                {LABEL_DATA.map((item) => (
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
        
        backgroundColor: "#efeff4",
    },
    sectionText: {
        marginTop: 32,
        marginBottom: 8,
        marginLeft: 16,
        fontSize: 14,
        color: "#707070"
    }
})