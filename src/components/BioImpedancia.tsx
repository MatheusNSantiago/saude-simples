import {
    Divider,
    Heading,
    HStack,
    VStack,
    Text,
    Spacer,
    Alert,
    AlertIcon,
    Box,
    Icon,
    Center,
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Pie from "./charts/Pie";
import HeadingDetalhes from "./HeadingDetalhes";
import { BsExclamationCircleFill, BsFileBarGraph } from "react-icons/bs";
import { Exame } from "../models/Exame";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";

function BioImpedancia() {
    var { altura, exames } = useAppSelector(selectUser)!;

    exames = Exame.getMostRecentExamesForGroup(exames, "bio-impedancia");
    var labels = Exame.getNamesForGroup("bio-impedancia");

    const values = exames.map(({ value }) => value);


    return (
        <Box w="full">
            <HeadingDetalhes title="Bio Impedância" />
            <Box
                shadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
                rounded="2xl"
                pos="relative"
            >
                {exames.length === 0 && <NoDataFound />}
                <HStack w="full">
                    <Data labels={labels} values={values} userAltura={altura} />
                    <Pie
                        data={values}
                        labels={labels}
                        props={{
                            flex: [0.85, 0.7],
                            shadow: "-6px 0px 4px -3.5px rgba(0, 0, 0, 0.25)",
                        }}
                    />
                </HStack>
            </Box>
        </Box>
    );
}

export default BioImpedancia;

type DataProps = {
    labels: string[];
    values: number[];
    userAltura: number;
};

function Data({ labels, values, userAltura }: DataProps) {
    const calcularIMC = () => {
        const peso = values.reduce((acc, curr) => acc + curr, 0);
        const altura = userAltura / 100;

        const imc = peso / (altura * altura);

        return imc.toFixed(2);
    };

    return (
        <VStack
            w={"full"}
            flex={1}
            p={4}
            alignItems="flex-start"
            alignSelf="stretch"
            justify="center"
        >
            {labels.map((label, index) => {
                const rand = (Math.random() - 0.5) * 10;

                return (
                    <Box key={index} w="full">
                        <HStack justify={"start"} spacing={0}>
                            <Text fontSize={["smaller", "sm"]}>{label}:</Text>
                            <Spacer />
                            <Text fontSize={["smaller", "sm"]}>
                                {values[index]}kg
                            </Text>
                            <Box w="1" />
                            <Icon
                                as={rand < 0 ? AiFillCaretDown : AiFillCaretUp}
                                color="gray.500"
                                boxSize={[3, 4]}
                            />

                            <Text
                                fontSize={["smaller", "sm"]}
                                suppressHydrationWarning
                            >
                                {Math.abs(rand).toFixed(0)}%
                            </Text>
                        </HStack>

                        <Divider h={1.5} />
                    </Box>
                );
            })}
            <HStack w="full" justify={"space-between"}>
                <Heading fontSize="22">IMC:</Heading>
                <Heading fontSize="22">{calcularIMC()}</Heading>
            </HStack>
            <Alert status="success" p="1" rounded={"sm"}>
                <AlertIcon />
                Peso Normal
            </Alert>
        </VStack>
    );
}

function NoDataFound() {
    return (
        <Center
            bg="gray.100"
            rounded={"2xl"}
            zIndex={2}
            boxSize="full"
            pos="absolute"
        >
            <VStack pt={4}>
                <Box pos={"relative"}>
                    <Icon
                        as={BsFileBarGraph}
                        boxSize={24} // make a filter that lets the color with an alpha of 0.8
                        color="primary.500"
                        opacity={0.6}
                    />
                    <Box
                        bgColor="gray.100"
                        pos={"absolute"}
                        top={-4}
                        left={0}
                        boxSize={10}
                        rounded="full"
                    >
                        <Icon
                            as={BsExclamationCircleFill}
                            boxSize="full"
                            opacity={0.7}
                            color="primary.500"
                            rounded="full"
                            shadow="md"
                        />
                    </Box>
                </Box>
                <Text fontSize={"lg"} color="GrayText">
                    Nenhum exame encontrado
                </Text>
            </VStack>
        </Center>
    );
}
