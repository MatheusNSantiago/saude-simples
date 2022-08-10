import {
    Box,
    HStack,
    Text,
    Heading,
    Image,
    Spacer,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    AccordionIcon,
    Accordion,
    Divider,
    Badge,
    LinkBox,
    Link,
    LinkOverlay,
    Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import { Exame } from "../models/Exame";
import { getItems, getKeys } from "../utils";
import HeadingDetalhes from "./HeadingDetalhes";

function Hemograma() {
    const user = useAppSelector(selectUser)!;
    const exames = Exame.getExamesRecentes(user.exames, "hemograma", 1);

    var globulosVermelhos = getItems(exames)
        .filter(([k, v]) => getKeys(exames).slice(0, 7).includes(k) && v.length)
        .map(([_, v]) => v[0]);

    var globulosBrancos = getItems(exames)
        .filter(
            ([k, v]) => getKeys(exames).slice(7, -2).includes(k) && v.length
        )
        .map(([_, v]) => v[0]);

    var plaquetas = getItems(exames)
        .filter(([k, v]) => getKeys(exames).at(-1) === k && v.length)
        .map(([_, v]) => v[0]);

    return (
        <Box w="full">
            <HeadingDetalhes title="Hemograma" />
            <Accordion
                defaultIndex={[0]}
                allowMultiple
                rounded="2xl"
                shadow="1px 1px 4px rgba(0, 0, 0, 0.2)"
                p={4}
                w="full"
            >
                <ExameGroup
                    title="Glóbulos Vermelhos"
                    // iconSrc="red-blood-cell.svg"
                    exames={globulosVermelhos}
                />
                <Divider my={2} />
                <ExameGroup title="Glóbulos Brancos" exames={globulosBrancos} />
                <Divider my={2} />
                <ExameGroup title="Plaquetas" exames={plaquetas} />
                <Divider my={2} />
            </Accordion>
        </Box>
    );
}

type ExameGroupProp = {
    title: string;
    iconSrc?: string;
    exames: Exame[];
};

function ExameGroup({ title, iconSrc, exames }: ExameGroupProp) {
    function renderizaExame({ name, value, faixa, unidade }: Exame) {
        return (
            <ExamePannel
                title={name}
                valor={value}
                faixa={faixa}
                units={unidade}
                key={name}
            />
        );
    }

    return (
        <AccordionItem border="none">
            {/* TODO Fazer alguma coisa com esse isExpanded */}
            {({ isExpanded }) => (
                <Box>
                    <AccordionButton
                        w={"full"}
                        pl={0}
                        _hover={{ bg: "transparent" }}
                    >
                        <HStack w="full" align={"end"}>
                            <Heading fontSize={["17", "xl"]}>{title}</Heading>
                            <Image src={iconSrc} alt="" w={8} />
                            <Spacer />
                            <AccordionIcon />
                        </HStack>
                    </AccordionButton>
                    {exames.map((exame) => renderizaExame(exame))}
                </Box>
            )}
        </AccordionItem>
    );
}

type ExamePannelProps = {
    title: string;
    valor: number;
    units: string;
    faixa: [low: number, high: number];
};

function ExamePannel({ title, valor, faixa, units }: ExamePannelProps) {
    const [low, high] = faixa;
    const parsedTitle = new RegExp(/\((\w+)\)/g).exec(title)?.[1] ?? title;
    const curColor = valor < low || valor > high ? "red.300" : "green.300";

    const router = useRouter();

    return (
        <a href="#">
            <AccordionPanel
                my={2}
                pl={0}
                borderBottom={"1px solid lightgray"}
                _hover={{ backgroundColor: "gray.50" }}
                onClick={() => router.push(`/exame/${title}`)}
            >
                <HStack pos="relative" align="baseline">
                    <Heading fontSize={["lg", "larger"]} fontFamily={"mono"}>
                        {parsedTitle}
                    </Heading>
                    <Spacer />
                    <Text
                        fontSize={["lg", "larger"]}
                        fontWeight="bold"
                        fontFamily={"mono"}
                    >
                        {valor}
                    </Text>
                    <Text fontSize={"sm"} fontFamily={"mono"}>
                        {units}
                    </Text>
                </HStack>
                <HStack spacing={0}>
                    <Text fontSize="12" fontFamily={"mono"} textAlign="start">
                        Referência: {low} a {high} {units}
                    </Text>
                    <Spacer />
                    {curColor == "green.300" ? (
                        <Badge colorScheme="green">Normal</Badge>
                    ) : (
                        <Badge colorScheme="red">Risco</Badge>
                    )}
                </HStack>
            </AccordionPanel>
        </a>
    );
}

export default Hemograma;
