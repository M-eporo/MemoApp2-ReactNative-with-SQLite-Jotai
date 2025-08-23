import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody} from "@gluestack-ui/themed";
import { Heading, ModalCloseButton, Icon, CloseIcon } from "@gluestack-ui/themed";
import LabelTag from "./LabelTag";
import { DrawerLayoutAndroid, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type Props = {
    visible: boolean;
    title: string;
    data: {
        id: number;
        name: string;
        color: string;
    }[];
    onPress: (labelId?: number) => void;
    onClose: () => void;
}

const LabelListModal: React.FC<Props> = ({
    visible, title, data, onPress, onClose
}) => {
    return (
        <Modal isOpen={visible} onClose={onClose}>
            <ModalBackdrop />
            <ModalContent width={"85%"} backgroundColor="#fff">
                <ModalHeader>
                    <Heading size="lg">{title}</Heading>
                    {/* ラベル閉じるボタン */}
                    <ModalCloseButton>
                        <Icon size="lg" as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    {/* ラベル解除 */}
                    <TouchableOpacity style={{flexDirection: "row" , alignItems: "center", marginVertical: 5}} onPress={() => onPress(undefined)}>
                        <MaterialCommunityIcons name="label-off" size={24} color="gray" />
                        <Text style={{marginLeft: 5 }}>ラベル解除</Text>
                    </TouchableOpacity>
                    {/* ラベルリスト */}
                    {data.map(label => (
                        <TouchableOpacity key={label.id} style={{marginVertical: 5}} onPress={() => onPress(label.id)}>
                            <LabelTag color={label.color} name={label.name} />;
                        </TouchableOpacity>
                    ))}
                </ModalBody>
            </ModalContent>

        </Modal>
    );
}

export default LabelListModal;