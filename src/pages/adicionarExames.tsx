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
    useToast,
} from "@chakra-ui/react";
import { AiOutlineFileAdd } from "react-icons/ai";
import CustomInput from "../components/CustomInput";
import { hex2rgba } from "../utils";
import examesInfo from "../exames.json";
import { MouseEventHandler, useState } from "react";
import { Exame, ExameGroup, ExameName, IExame } from "../models/Exame";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { addExames, selectUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

const AdicionarExames = () => {
    const user = useAppSelector(selectUser)!;
    const dispatch = useDispatch();
    const toast = useToast({
        isClosable: true,
        position: "top",
        status: "error",
    });

    const { isOpen, onOpen, onClose } = useDisclosure(); // parada que abre e fecha o modal

    const [exameGroup, setExameGroup] = useState<ExameGroup>("bio-impedancia");

    const [exames, setExames] = useState<IExame[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const onSave = async () => {
        if (exames.length === 0) return;

        setIsLoading(true);

        const res = await axios.post("/api/addExame", {
            cpf: user?.cpf,
            exames: exames,
        });

        if (res.status === 200) {
            dispatch(addExames(exames));
            setExames([]);
            onClose();
        } else {
            toast({ title: "Erro no servidor" });
        }

        setIsLoading(false);
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
                    setExames([]);
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
                                const entry = exames.find(
                                    ({ name }) => name === exameName
                                );

                                return (
                                    <CustomInput
                                        label={exameName}
                                        rightElement={unidade}
                                        value={entry?.value.toString() ?? ""}
                                        type="number"
                                        onChange={(v: string) => {
                                            if (v === "") {
                                                setExames(
                                                    exames.filter(
                                                        ({ name }) =>
                                                            name !== exameName
                                                    )
                                                );
                                                return;
                                            }

                                            const value = Number.parseFloat(v);
                                            if (!entry) {
                                                setExames([
                                                    ...exames,
                                                    {
                                                        group: exameGroup,
                                                        name: exameName as ExameName<ExameGroup>,
                                                        value: value,
                                                        date: new Date(),
                                                    },
                                                ]);
                                                return;
                                            }

                                            setExames(
                                                exames.map((entry): IExame => {
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
                        <Button w="full" onClick={onSave} isLoading={isLoading}>
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
