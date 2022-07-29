import {
    Center,
    CircularProgress,
    HStack,
    Text,
    Image,
    Button,
    TabPanel,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    Container,
    VStack,
    Box,
    IconButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import Overview from "./overview";
import { FaPlus } from "react-icons/fa";

const Home = () => {
    const router = useRouter();
    const user = useAppSelector(selectUser);

    useEffect(() => {
        if (!user) router.push("/login");
    });

    if (!user) {
        return (
            <Center h="100vh">
                <CircularProgress isIndeterminate color="primary.500" />
            </Center>
        );
    }

    return (
        <Box bg="gray.50" minH={"100vh"}>
            <Container size={"lg"} p={0} py={5} bgColor="white">
                <HStack mx={10}>
                    <Image
                        src={user.foto ?? ""}
                        alt="Profile Picture"
                        height={16}
                        rounded={14}
                    />
                    <VStack
                        w="full"
                        pl={5}
                        alignItems="flex-start"
                        justify={"center"}
                        spacing={1.5}
                    >
                        <Text fontWeight={"bold"} fontSize={"xl"} m={0}>
                            {user.nome}
                        </Text>
                        <Text fontSize={"sm"}>{user.idade} anos</Text>
                    </VStack>
                    <Button onClick={() => console.log(user)}></Button>
                </HStack>
                <Tabs isFitted>
                    <TabList shadow="lg">
                        <Tab>Tela 1</Tab>
                        <Tab>Tela 2</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p={0}>
                            <Overview />
                        </TabPanel>
                        <TabPanel>{/* <Pagina2 /> */}</TabPanel>
                    </TabPanels>
                </Tabs>
                <Container pos="fixed" bottom={10}>
                    <IconButton
                        aria-label="Adicionar Exames"
                        icon={<FaPlus />}
                        pos="absolute"
                        right={10}
                        bottom={4}
                        transform="auto"
                        scale={2}
                        rounded="full"
                        shadow="2px 2px 3px rgba(0, 0, 0, 0.25)"
                    />
                </Container>
            </Container>
        </Box>
    );
};

export default Home;
