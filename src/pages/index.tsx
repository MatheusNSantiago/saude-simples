import {
    Center,
    CircularProgress,
    HStack,
    Text,
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
    Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import Overview from "./overview";
import { BsArchive, BsBell, BsFileBarGraph, BsHouseDoor } from "react-icons/bs";
import {AiOutlineUser } from "react-icons/ai";
import AdicionarExames from "./adicionarExames";

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
            <Container size={"lg"} p={0} bgColor="white">
                <HStack p={8} shadow="sm">
                    <Avatar src={user.foto ?? ""} boxSize={16} />
                    <VStack
                        w="full"
                        pl={2}
                        alignItems="flex-start"
                        justify={"center"}
                        spacing={1}
                    >
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            {user.nome}
                        </Text>
                        <Text fontSize={"sm"}>{user.idade} anos</Text>
                    </VStack>
                    <IconButton
                        aria-label=""
                        variant={"outline"}
                        icon={<BsBell />}
                        onClick={() => console.log(user)}
                    />
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
                    </TabPanels>
                    <Box h={20} />
                    <Container
                        pos="fixed"
                        bottom={0}
                        px={0}
                        shadow="0 -8px 4px -4px rgba(0, 0, 0, 0.15)"
                        size="lg"
                        zIndex="overlay"
                    >
                        <TabList
                            bgColor="white"
                            display="flex"
                            flexDirection={"row"}
                            justifyContent="space-around"
                            w="100%"
                        >
                            <AdicionarExames />
                            <CustomTab
                                label="Geral"
                                icon={BsHouseDoor}
                                isSelected={index === 0}
                            />
                            <CustomTab
                                label="Arquivados"
                                icon={BsArchive}
                                isSelected={index === 1}
                            />
                            <CustomTab
                                label="Resultados"
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
