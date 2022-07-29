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
} from "@chakra-ui/react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Pie from "./charts/Pie";
import HeadingDetalhes from "./HeadingDetalhes";
import { User } from "../models/User";

function BioImpedancia({ user }: { user: User }) {
    var { exames, altura } = user;

    exames = exames.filter((exame) => exame.group == "bio-impedancia");
    const labels = exames.map((exame) => exame.name);
    const values = exames.map((exame) => exame.value);

    return (
        <Box w="full">
            <HeadingDetalhes title="Bio Impedância" />
            <VStack alignItems="flex-start" width="full" spacing={5}>
                <HStack
                    rounded="2xl"
                    shadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
                    w="full"
                >
                    <Data labels={labels} values={values} userAltura={altura} />
                    <Pie
                        data={values}
                        labels={labels}
                        props={{
                            flex: 0.9,
                            pt: 4,
                            rounded: "md",
                            alignSelf: "stretch",
                            shadow: "-6px 0px 4px -3.5px rgba(0, 0, 0, 0.25)",
                        }}
                    />
                </HStack>
            </VStack>
        </Box>
    );
}

export default BioImpedancia;

function Data({
    labels,
    values,
    userAltura,
}: {
    labels: string[];
    values: number[];
    userAltura: number;
}) {
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
                            <Text fontSize={"sm"}>{label}:</Text>

                            <Spacer />
                            <Text fontSize={"sm"}>{values[index]}kg</Text>
                            <Box w="1" />
                            <Icon
                                as={rand < 0 ? AiFillCaretDown : AiFillCaretUp}
                                color="gray.500"
                            />

                            <Text fontSize={"sm"} suppressHydrationWarning>
                                {Math.abs(rand).toFixed(0)}%
                            </Text>
                        </HStack>

                        <Divider />
                    </Box>
                );
            })}
            <HStack w="full" justify={"space-between"}>
                <Heading size="lg">IMC:</Heading>
                <Heading size="lg">{calcularIMC()}</Heading>
            </HStack>
            <Alert status="success" p="1" rounded={"sm"}>
                <AlertIcon />
                Peso Normal
            </Alert>
        </VStack>
    );
}
