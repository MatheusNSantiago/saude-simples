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
import { ExameGroup, ExameName, IExame } from "../models/Exame";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";

const AdicionarExames = () => {
    const user = useAppSelector(selectUser);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [exameGroup, setExameGroup] = useState<ExameGroup>("bio-impedancia");
    const [entries, setEntries] = useState<IExame[]>([]);

    const onSave = async () => {
        if (entries.length > 0) {
            const res = await axios.post("/api/addExame", {
                cpf: user?.cpf,
                exames: entries,
            });

            onClose();
        }
    };

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
                onClose={() => {
                    setEntries([]);
                    setExameGroup("bio-impedancia");

                    onClose();
                }}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={"3xl"}>Cadastrar Exames</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"grid"} rowGap={3}>
                        <Heading size={"md"}>Tipo do Exame</Heading>
                        <HStack overflowX={"auto"} className="hide-scroll">
                            <Card
                                label="Bio Impedância"
                                imgSrc="bio-impedancia.svg"
                                isSelected={exameGroup === "bio-impedancia"}
                                bgColor="#ffc61b"
                                onClick={() => setExameGroup("bio-impedancia")}
                            />
                            <Card
                                label="Hemograma"
                                imgSrc="blood.svg"
                                isSelected={exameGroup === "hemograma"}
                                bgColor="#fa6e51"
                                onClick={() => setExameGroup("hemograma")}
                            />
                            <Card
                                label="Coiso"
                                isSelected={false}
                                imgSrc="blood.svg"
                                onClick={() => {}}
                            />
                            <Card
                                label="Sangue"
                                isSelected={false}
                                imgSrc="blood.svg"
                                onClick={() => {}}
                            />
                        </HStack>
                        <Divider mt="3" />
                        {Object.entries(examesInfo[exameGroup]).map(
                            ([exameName, { unidade }]) => {
                                const entry = entries.find(
                                    ({ name }) => name === exameName
                                );

                                return (
                                    <CustomInput
                                        label={exameName}
                                        rightElement={unidade}
                                        value={entry?.value.toString()}
                                        type="number"
                                        onChange={(v: string) => {
                                            if (v === "") {
                                                setEntries(
                                                    entries.filter(
                                                        (e) =>
                                                            e.name !== exameName
                                                    )
                                                );
                                                return;
                                            }

                                            const value = Number.parseFloat(v);
                                            if (!entry) {
                                                setEntries([
                                                    ...entries,
                                                    {
                                                        group: exameGroup,
                                                        name: exameName as ExameName<ExameGroup>,
                                                        value: value,
                                                    },
                                                ]);
                                                return;
                                            }

                                            setEntries(
                                                entries.map((entry): IExame => {
                                                    if (
                                                        entry.name === exameName
                                                    )
                                                        entry.value = value;

                                                    return entry;
                                                })
                                            );
                                        }}
                                        key={exameName}
                                    />
                                );
                            }
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button w="full" onClick={onSave}>
                            Salvar
                        </Button>
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
    isSelected: boolean;
    onClick: MouseEventHandler;
    bgColor?: string;
    size?: number;
};

const Card = ({
    label,
    imgSrc,
    isSelected,
    bgColor = "#ffc61b",
    onClick,
    size = 28,
}: CardProps) => {
    const getBgGradient = (opacity1: number, opacity2: number) =>
        `linear(-45deg, ${hex2rgba(bgColor!, opacity1)}, ${hex2rgba(
            bgColor!,
            opacity2
        )})`;

    return (
        <Box boxSize={size} transform="auto" shadow={"lg"}>
            <Button
                whiteSpace={"normal"}
                variant={"outline"}
                onClick={onClick}
                px={2}
                pt="4"
                boxSize={size}
                borderColor={hex2rgba(bgColor!, 0.6)}
                bgColor={isSelected ? hex2rgba(bgColor!, 0.3) : ""}
                _hover={{ bgGradient: getBgGradient(0.15, 0.2) }}
                _active={{ bgGradient: getBgGradient(0.3, 0.4) }}
            >
                <VStack boxSize="full">
                    <Image
                        alt={label}
                        w="50%"
                        shadow="2px 2px 4px rgba(0, 0, 0, 0.25)"
                        rounded="full"
                        src={imgSrc}
                    />
                    <Text
                        color="black"
                        w="full"
                        fontSize={"sm"}
                        fontWeight={"normal"}
                        fontFamily="mono"
                    >
                        {label}
                    </Text>
                </VStack>
            </Button>
        </Box>
    );
};
