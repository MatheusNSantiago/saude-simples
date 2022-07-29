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
    Slider,
    SliderMark,
    SliderThumb,
    Circle,
    Badge,
} from "@chakra-ui/react";
import { Exame } from "../models/Exame";
import { User } from "../models/User";
import HeadingDetalhes from "./HeadingDetalhes";

function Hemograma({ user }: { user: User }) {
    const exames = user.exames.filter(({ group }) => group == "hemograma");

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
                    iconSrc="red-blood-cell.svg"
                    exames={exames}
                />
                <Divider my={2} />
                <ExameGroup
                    title="Glóbulos Brancos"
                    exames={exames}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Plaquetas"
                    exames={exames}
                    iconSrc="red-blood-cell.svg"
                />
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
                            <Heading size="md">{title}</Heading>
                            <Image src={iconSrc} alt="" w={8} />
                            <Spacer />
                            <AccordionIcon />
                        </HStack>
                    </AccordionButton>
                    <ExamePannel
                        title="Hemácias"
                        valor={4.3}
                        faixa={[3.4, 6.6]}
                        units={"milhões/µL"}
                    />
                    <FaixaDeReferencia faixa={[4, 7]} value={5} />
                    <ExamePannel
                        title="Hemácias"
                        valor={4.3}
                        faixa={[3.4, 6.6]}
                        units={"milhões/µL"}
                    />
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
    const low = faixa[0];
    const high = faixa[1];

    const curColor = valor < low || valor > high ? "red.300" : "green.300";

    return (
        <AccordionPanel
            pb={2}
            mb={3}
            pl={0}
            borderBottom={"1px solid lightgray"}
        >
            <HStack pos="relative" align="baseline">
                <Heading fontSize={"xl"} fontFamily={"mono"}>
                    {title}
                </Heading>
                <Spacer />
                <Text fontSize={"xl"} fontWeight="bold" fontFamily={"mono"}>
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
    );
}

type FaixaDeReferenciaProps = {
    value: number;
    faixa: [low: number, high: number];
};

function FaixaDeReferencia({ value, faixa }: FaixaDeReferenciaProps) {
    const low = faixa[0];
    const high = faixa[1];

    const curColor = value < low || value > high ? "red.300" : "green.300";

    const sliderPos = value * (33.3 / low);

    return (
        <Slider isReadOnly aria-label="slider-ex-6" defaultValue={sliderPos}>
            <SliderMark value={33.3} mt={2} ml={-2.5} fontSize="sm">
                4.5
            </SliderMark>
            <SliderMark value={67} mt={2} ml={-2.5} fontSize="sm">
                6.1
            </SliderMark>
            <HStack h="2" spacing={1.5}>
                <Box boxSize="full" rounded="full" bg="red.300" />
                <Box boxSize="full" rounded="full" bg="green.300" />
                <Box boxSize="full" rounded="full" bg="red.300" />
            </HStack>
            <SliderThumb boxSize={5} borderColor={curColor} borderWidth="2px">
                <Circle size={3} bg={curColor} />
            </SliderThumb>
        </Slider>
    );
}
export default Hemograma;