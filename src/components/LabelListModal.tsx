import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalBody} from "@gluestack-ui/themed";
import { Heading, ModalCloseButton, Icon, CloseIcon } from "@gluestack-ui/themed";
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
        <Modal>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">{title}</Heading>
                    <ModalCloseButton>
                        <Icon size="lg" as={CloseIcon} />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    
                </ModalBody>
            </ModalContent>

        </Modal>
    );
}

export default LabelListModal;