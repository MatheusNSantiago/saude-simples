import {
    Container,
    HStack,
    VStack,
    Image,
    Text,
    IconButton,
    TabList,
    Tabs,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    ModalOverlay,
    Modal,
    useDisclosure,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormLabel,
    Input,
    ModalFooter,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import { User } from "../models/User";

interface Prop {
    Pagina1: ({ user }: { user: User }) => JSX.Element;
    Pagina2: () => JSX.Element;
}

const Navbar = ({ Pagina1, Pagina2 }: Prop) => {
    const user = useAppSelector(selectUser)!;

    const tabStyle = { borderBottomWidth: 2, borderBottomColor: "primary.500" };

    return (
        <>
            <Tabs isFitted>
                <TabList bg={"white"} shadow="lg">
                    <Tab _selected={tabStyle}>Tela 1</Tab>
                    <Tab _selected={tabStyle}>Tela 2</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <Pagina1 user={user} />
                    </TabPanel>
                    <TabPanel>
                        <Pagina2 />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default Navbar;

function DebugUser() {
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
