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
            <Box
                // alignItems="flex-start"
                width="full"
                // spacing={5}
                shadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
                rounded="2xl"
            >
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

                        <Divider />
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
