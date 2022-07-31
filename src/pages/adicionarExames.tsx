import {
    HStack,
    Text,
    VStack,
    IconButton,
    Button,
    useDisclosure,
    Image,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalFooter,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Heading,
    Divider,
} from "@chakra-ui/react";
import { AiOutlineFileAdd } from "react-icons/ai";
import CustomInput from "../components/CustomInput";
import { hex2rgba } from "../utils";
import examesInfo from "../exames.json";
import { MouseEventHandler, useState } from "react";
import { ExameGroup } from "../models/Exame";

const AdicionarExames = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <IconButton
                aria-label="Adicionar Exames"
                icon={<AiOutlineFileAdd size={20.75} />}
                pos="absolute"
                transform="auto"
                margin={"auto"}
                top={-4}
                scale={1.5}
                rounded="full"
                border={"1.5px solid white"}
                shadow="2px 2px 3px rgba(0, 0, 0, 0.25)"
                onClick={onOpen}
            />
            <Modal
                size="sm"
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"3xl"}>Cadastrar Exame</ModalHeader>
                    <ModalCloseButton />
                    <ModalBodyForm />
                    <ModalFooter>
                        <Button w="full">Salvar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdicionarExames;

type CardProps = {
    label: string;
    imgSrc: string;
    onClick: MouseEventHandler;
    bgColor?: string;
    size?: number;
};

const Card = ({
    label,
    imgSrc,
    bgColor = "#ffc61b",
    onClick,
    size = 24,
}: CardProps) => {
    return (
        <Box boxSize={size + 4} transform="auto" shadow={"lg"}>
            <Button
                whiteSpace={"normal"}
                colorScheme="gray"
                onClick={onClick}
                pt="4"
                width={size}
                height={size + 4}
                bgGradient={`linear(-45deg, ${bgColor}, ${hex2rgba(
                    bgColor!,
                    0.75
                )})`}
                _hover={{ bgColor: bgColor }}
            >
                <VStack boxSize="full">
                    <Image
                        alt={label}
                        w="65%"
                        shadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
                        rounded="full"
                        src={imgSrc}
                    />
                    <Text color="white" fontWeight={"bold"} children={label} />
                </VStack>
            </Button>
        </Box>
    );
};

function ModalBodyForm({}) {
    const [exameGroup, setExameGroup] = useState<ExameGroup>("bio-impedancia");

    return (
        <ModalBody display={"grid"} rowGap={3}>
            <Heading size={"md"}>Tipo do Exame</Heading>
            <HStack overflowX={"auto"} className="hide-scroll">
                <Card
                    label="Bio Impedância"
                    imgSrc="bio-impedancia.svg"
                    bgColor="#ffc61b"
                    onClick={() => setExameGroup("bio-impedancia")}
                />
                <Card
                    label="Sangue"
                    imgSrc="blood.svg"
                    bgColor="#fa6e51"
                    onClick={() => setExameGroup("hemograma")}
                />
                <Card label="Sangue" imgSrc="blood.svg" onClick={() => {}} />
                <Card label="Sangue" imgSrc="blood.svg" onClick={() => {}} />
            </HStack>
            <Divider mt="3" />
            {Object.entries(examesInfo[exameGroup]).map(
                ([nomeExame, { unidade }]) => {
                    return (
                        <CustomInput
                            label={nomeExame}
                            rightElement={unidade}
                            onChange={() => {}}
                        />
                    );
                }
            )}
        </ModalBody>
    );
}
