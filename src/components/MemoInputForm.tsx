import { Input, InputField, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { Button, InputAccessoryView, Keyboard, Platform, View } from "react-native";

type MemoInputFormProps = {
    title: string;
    content: string;
    onTitleChange: (text: string) => void;
    onContentChange: (text: string) => void;
}

const inputAccessoryViewID = "INPUT_ACCESSORY_VIEW_ID";

const MemoInputForm: React.FC<MemoInputFormProps> = ({
    title, content, onTitleChange, onContentChange
}) => {
    return (
        <View style={{ flex: 1, paddingBottom: 100}}>
            <Textarea borderWidth={0} minWidth={"$full"} minHeight={"$full"}>
                {/* タイトル入力 */}
                    <Input borderWidth={0} minWidth={"$full"} marginTop={"$4"} marginBottom={"$1"} paddingHorizontal={"$1"}>
                        <InputField defaultValue={title} onChangeText={onTitleChange} fontSize={"$2xl"} fontWeight={"$bold"} placeholder="タイトル" />
                    </Input>
                {/* 内容入力 */}
                    <TextareaInput 
                        scrollEnabled={true}
                        paddingHorizontal={"$5"}
                        defaultValue={content}
                        onChangeText={onContentChange}
                        fontSize={"$md"}
                        placeholder="メモを入力"
                        inputAccessoryViewID={inputAccessoryViewID}
                    />
            </Textarea>
            {/* iosのみキーボードの上に閉じるボタン */}
            {Platform.OS === "ios" && (
                <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={"#f1f1f1"} style={{ alignContent: "flex-end" }} >
                    <View style={{alignItems: "flex-end"}}>
                        <Button title="閉じる" onPress={() => Keyboard.dismiss()} />
                    </View>
                </InputAccessoryView>
            )}
        </View>
    );
}

export default MemoInputForm;