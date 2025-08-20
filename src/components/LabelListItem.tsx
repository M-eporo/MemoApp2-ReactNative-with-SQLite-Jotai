import { ListItem } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, Foundation } from "@expo/vector-icons";

type LabelListItemProps = {
    color: string;
    name: string;
    onPress: () => void;
    onEditPress: () => void;
}

/**
 * ラベルリストアイテム
 * @param color, name, onPress, onEditPress 
 * @returns ラベルリストアイテム
 */
const LabelListItem: React.FC<LabelListItemProps> = ({
    color, name, onPress, onEditPress
}) => {
    return (
        <View style={styles.container}>
            <ListItem bottomDivider style={styles.listItem} onPress={onPress}>
                {/* ラベルアイコン */}
                <MaterialCommunityIcons name="label" color={color} size={26} style={styles.labelIcon}/>
                {/* ラベル名 */}
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>{name}</ListItem.Title>
                </ListItem.Content>
                {/* 修正アイコン */}
                <Foundation name="pencil" color={"#818181"} size={26} style={styles.editIcon} onPress={onEditPress} />
            </ListItem>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelIcon: {
        marginLeft: 10
    },
    listItem: {
        flex: 1
    },
    title: {
        fontSize: 18,
    },
    editIcon: {
        marginRight: 12
    }
});

export default LabelListItem;