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
    AlertStatus,
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Pie from "./charts/Pie";
import HeadingDetalhes from "./HeadingDetalhes";
import { BsExclamationCircleFill, BsFileBarGraph } from "react-icons/bs";
import { Exame } from "../models/Exame";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import { getKeys } from "../utils";

function BioImpedancia() {
    var { altura, exames } = useAppSelector(selectUser)!;

    const examesRecentesBioImpedancia = Exame.getExamesRecentes(
        exames,
        "bio-impedancia",
        2
    );
    const twoMostRecentValues = Object.values(examesRecentesBioImpedancia).map(
        (v) => v.map(({ value }) => value)
    );

    const lastValues = twoMostRecentValues.map((v) => v[0]);
    const labels = getKeys(examesRecentesBioImpedancia);

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
                    <Data
                        labels={labels}
                        ultimosDoisValores={twoMostRecentValues}
                        userAltura={altura}
                    />
                    <Pie
                        labels={labels}
                        data={lastValues}
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
    ultimosDoisValores: number[][];
    userAltura: number;
};

function Data({ labels, ultimosDoisValores, userAltura }: DataProps) {
    const calcularIMC = () => {
        const peso = ultimosDoisValores.reduce((prev, cur) => prev + cur[0], 0);
        const altura = userAltura / 100;

        const imc = peso / (altura * altura);

        return Math.round(imc * 100) / 100;
    };

    const imc = calcularIMC();

    const Feedback = () => {
        const base = (status: AlertStatus, title: string) => (
            <Alert status={status} p="2" rounded={"sm"}>
                <AlertIcon />
                {title}
            </Alert>
        );

        if (imc < 18.5) return base("warning", "Abaixo do Peso");
        if (imc < 25) return base("success", "Peso Normal");
        if (imc < 30) return base("warning", "Sobrepeso");
        if (imc < 35) return base("error", "Obesidade");

        return base("error", "Obesidade Grave");
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
                const ultimosValores = ultimosDoisValores[index];
                const [newValue, oldValue] = ultimosValores;

                return (
                    <Box key={index} w="full">
                        <HStack justify={"start"} spacing={0}>
                            <Text fontSize={["smaller", "sm"]}>{label}:</Text>
                            <Spacer />
                            <Text fontSize={["smaller", "sm"]}>
                                {newValue}kg
                            </Text>
                            <Box w="1" />
                            {oldValue && (
                                <>
                                    <Icon
                                        as={
                                            newValue - oldValue < 0
                                                ? AiFillCaretDown
                                                : AiFillCaretUp
                                        }
                                        color="gray.500"
                                        boxSize={[3, 4]}
                                    />

                                    <Text
                                        fontSize={["smaller", "sm"]}
                                        suppressHydrationWarning
                                    >
                                        {(
                                            ((newValue - oldValue) * 100) /
                                            oldValue
                                        ).toFixed(0)}
                                        %
                                    </Text>
                                </>
                            )}
                        </HStack>

                        <Divider h={1.5} />
                    </Box>
                );
            })}
            <HStack w="full" justify={"space-between"}>
                <Heading fontSize="22">IMC:</Heading>
                <Heading fontSize="22">{imc}</Heading>
            </HStack>
            {Feedback()}
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
