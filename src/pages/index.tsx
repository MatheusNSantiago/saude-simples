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
import {
    BsArchive,
    BsBell,
    BsFileBarGraph,
    BsHouseDoor,
    BsSearch,
} from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import AdicionarExames from "./adicionarExames";
import CustomInput from "../components/CustomInput";
import { UserPage } from "../components/UserPage";

const Home = () => {
    const router = useRouter();
    const user = useAppSelector(selectUser);
    const [tabIndex, setIndex] = useState(0);

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
            <Container size={"lg"} p={0} bg="white" minH={"100vh"}>
                <Box
                    p={8}
                    shadow="md"
                    roundedBottom={30}
                    bgGradient={"linear(130deg, primary.400, primary.300)"}
                >
                    <HStack>
                        <Avatar
                            src={user.foto ?? ""}
                            boxSize={16}
                            shadow={"md"}
                        />
                        <VStack
                            w="full"
                            pl={2}
                            alignItems="flex-start"
                            justify={"center"}
                            spacing={1}
                        >
                            <Text
                                fontWeight={"bold"}
                                color="white"
                                fontSize={"22"}
                                textShadow={"0px 0px 3px rgba(0, 0, 0, 0.2)"}
                            >
                                {user.nome}
                            </Text>
                            <Text
                                fontSize={"sm"}
                                color="white"
                                textShadow={"0px 0px 3px rgba(0, 0, 0, 0.2)"}
                            >
                                {user.idade} anos
                            </Text>
                        </VStack>
                        <IconButton
                            aria-label=""
                            variant={"ghost"}
                            rounded="full"
                            shadow={"md"}
                            bg="white"
                            _hover={{ bg: "whiteAlpha.900" }}
                            _active={{ shadow: "none" }}
                            icon={<BsBell />}
                            onClick={() => console.log(user)}
                        />
                    </HStack>
                    <Box h="8" />
                    <CustomInput
                        onChange={() => {}}
                        leftElement={<BsSearch size={"55%"} />}
                        inputProps={{ bgColor: "white", py: "5", shadow: "md" }}
                    />
                </Box>
                <Tabs
                    variant={"unstyled"}
                    index={tabIndex}
                    onChange={(newIndex) => setIndex(newIndex)}
                >
                    <TabPanels px={8} pt={3}>
                        <TabPanel p={0}>
                            <Overview />
                        </TabPanel>
                        <TabPanel p={0}></TabPanel>
                        <TabPanel p={0}></TabPanel>
                        <TabPanel p={0}>
                            <UserPage />
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
                                isSelected={tabIndex === 0}
                            />
                            <CustomTab
                                label="Arquivados"
                                icon={BsArchive}
                                isSelected={tabIndex === 1}
                            />
                            <CustomTab
                                label="Resultados"
                                icon={BsFileBarGraph}
                                isSelected={tabIndex === 2}
                            />
                            <CustomTab
                                label="Perfil"
                                icon={AiOutlineUser}
                                isSelected={tabIndex === 3}
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
