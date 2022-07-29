import {
    VStack,
    Text,
    Heading,
    IconButton,
    Image,
    Box,
    HStack,
    useDisclosure,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Input,
    FormLabel,
    Button,
    ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";

import { User } from "../models/User";
import BioImpedancia from "../components/BioImpedancia";
import Hemograma from "../components/Hemograma";
import { FaUserEdit } from "react-icons/fa";

const Overview = () => {
    const user = User.getFakeUser();

    return (
        <VStack alignItems="flex-start" width="full" px={10} pt={6} spacing={6}>
            <Heading size="xl">Visão Geral</Heading>
            <BioImpedancia user={user} />
            <Hemograma user={user} />

            {/* <HStack overflowX="auto" w="100%" pr="4" className="hide-scroll">
                <Card label="Coração" imgSrc="coracao.png" caption="3 exames" />
                <Card
                    label="Vitaminas"
                    imgSrc="coracao.png"
                    caption="2 exames"
                />
                <Card label="Sei lá" imgSrc="coracao.png" caption="12 exames" />
                <Card
                    label="Outra parada"
                    imgSrc="coracao.png"
                    caption="12 exames"
                />
            </HStack> */}
        </VStack>
    );
};

export default Overview;

type CardProps = {
    label: string;
    caption: string;
    imgSrc: string;
};

const Card = ({ label, caption, imgSrc }: CardProps) => {
    return (
        <Box>
            <IconButton
                aria-label={label}
                w="140px"
                h="200px"
                bgGradient='linear(-45deg, red, #FF0080) rounded="2xl"'
                rounded="2xl"
                shadow="2xl"
                _focus={{ bgColor: "white" }}
            >
                <VStack pb="7" align={"flex-start"} w="55%">
                    <Image
                        aria-label="Coração"
                        rounded="2xl"
                        bgColor={"white"}
                        h={"fit-content"}
                        mt="6"
                        shadow="2xl"
                        p="4"
                        src={imgSrc}
                    />
                    <Text color="white" fontWeight={"bold"}>
                        {label}
                    </Text>
                    <Text color="white">{caption}</Text>
                </VStack>
            </IconButton>
        </Box>
    );
};

export function DebugUser() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [altura, setAltura] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [foto, setFoto] = useState("");

    const alertValues = () => {
        alert(
            JSON.stringify({
                nome: nome,
                cpf: cpf,
                nascimento: nascimento,
                altura: altura,
                email: email,
                foto: foto,
            })
        );
    };

    return (
        <>
            <IconButton
                aria-label="Ver exames"
                shadow="base"
                colorScheme="primary"
                onClick={onOpen}
            >
                <FaUserEdit size={"60%"} />
            </IconButton>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Debug criar user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input
                            placeholder="Nome"
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Input
                            placeholder="CPF"
                            mt={4}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                        <FormLabel mt={4}>Data de Nascimento</FormLabel>
                        <Input
                            type="date"
                            onChange={(e) => setNascimento(e.target.value)}
                        />
                        <Input
                            placeholder="Altura (cm)"
                            type="number"
                            mt={4}
                            onChange={(e) =>
                                setAltura(Number.parseInt(e.target.value))
                            }
                        />
                        <Input
                            placeholder="Email (opcional)"
                            type="email"
                            mt={4}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="Foto (opcional)"
                            mt={4}
                            onChange={(e) => setFoto(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={alertValues}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
