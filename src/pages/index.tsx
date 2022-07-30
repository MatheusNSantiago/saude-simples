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
    Icon,
} from "@chakra-ui/react";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import Overview from "./overview";
import {
    BsArchive,
    BsFileBarGraph,
    BsHouseDoor,
} from "react-icons/bs";
import {
    AiOutlineFileAdd,
    AiOutlineUser,
} from "react-icons/ai";

const Home = () => {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [index, setIndex] = useState(0);

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
                <Tabs
                    variant={"unstyled"}
                    index={index}
                    onChange={(newIndex) => setIndex(newIndex)}
                >
                    <TabPanels>
                        <TabPanel p={0}>
                            <Overview />
                        </TabPanel>
                        <TabPanel>{/* <Pagina2 /> */}</TabPanel>
                    </TabPanels>
                    <Container
                        pos="fixed"
                        bottom={0}
                        shadow="0 -8px 4px -4px rgba(0, 0, 0, 0.15)"
                        size="lg"
                        zIndex="overlay"
                    >
                        <TabList
                            bgColor="white"
                            display="flex"
                            flexDirection={"row"}
                            justifyContent="space-around"
                        >
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
                            />
                            <CustomTab
                                label="Geral"
                                icon={BsHouseDoor}
                                isSelected={index === 0}
                            />
                            <CustomTab
                                label="Geral"
                                icon={BsArchive}
                                isSelected={index === 1}
                            />
                            <CustomTab
                                label="Geral"
                                icon={BsFileBarGraph}
                                isSelected={index === 2}
                            />
                            <CustomTab
                                label="Perfil"
                                icon={AiOutlineUser}
                                isSelected={index === 3}
                            />
                        </TabList>
                    </Container>
                </Tabs>
            </Container>
        </Box>
    );
};

export default Home;

// Make an icon buttons component
type CustomTabProps = {
    label: string;
    icon: any;
    isSelected?: boolean;
};

const CustomTab = ({ label, icon, isSelected = false }: CustomTabProps) => {
    return (
        <Tab>
            <VStack spacing={1.5} pt={1.5}>
                <Icon
                    as={icon}
                    boxSize="7"
                    color={isSelected ? "primary.500" : "gray.500"}
                />
                <Text
                    color={isSelected ? "primary.500" : "gray.500"}
                    fontWeight={isSelected ? "bold" : "normal"}
                >
                    {label}
                </Text>
            </VStack>
        </Tab>
    );
};
