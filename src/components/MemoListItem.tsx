import { ListItem, Button } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import LabelTag from "./LabelTag";

type MemoListItemProps = {
    name: string;
    content: string;
    onPress: () => void;
    onLongPress?: () => void;
    onDeletePress?: () => void;
    label?: {
        color: string;
        name: string;
    }
}

/**
 * メモリストアイテム
 * @param  name, content, onPress, onLongPress, onDeletePress, label
 * @returns メモリストアイテム
 */
const MemoListItem: React.FC<MemoListItemProps> = ({
    name, content, onPress, onLongPress, onDeletePress, label
}) => {
    return (
        
        <ListItem.Swipeable 
        bottomDivider
            onPress={onPress}
            onLongPress={() => onLongPress?.()}
            rightContent={reset => (
                <Button
                    title="削除"
                    onPress={() => {
                        if(onDeletePress){
                            onDeletePress();
                        }
                        reset();
                    }}
                    icon={{name: "delete", color: "white"}}
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                />
            )}
        >
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{name}</ListItem.Title>
                <ListItem.Subtitle style={styles.subTitle} numberOfLines={4}>{content}</ListItem.Subtitle>
                {label 
                ? <LabelTag color={label.color} name={label.name} />
                : <></>
                }
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem.Swipeable>
        
    );
}

const styles = StyleSheet.create({
    swipeable: {
        flex: 1,
        flexDirection: "row"
    },
    title: {
        color: "#4a5054",
        fontWeight: "bold",
        fontSize: 20,
    },
    subTitle: {
        color: "#95a2ac",
        fontSize: 14,
        padding: 4,
        maxHeight: 100
    }
})

export default MemoListItem;