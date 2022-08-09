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
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import { Exame } from "../models/Exame";
import { User } from "../models/User";
import HeadingDetalhes from "./HeadingDetalhes";

function Hemograma() {
    const user = useAppSelector(selectUser)!;
    const exames = user.exames.filter(({ group }) => group == "hemograma");

    const hemacias = exames.filter(exame => exame.group === "hemograma" && exame.name === "Hemácias")
    const hemoglobina = exames.filter(exame => exame.group === "hemograma" && exame.name === "Hemoglobina")
    const hematocrito = exames.filter(exame => exame.group === "hemograma" && exame.name === "Hematócrito")
    const vcm = exames.filter(exame => exame.group === "hemograma" && exame.name === "Volume Corpuscular Médio (VCM)")
    const hcm = exames.filter(exame => exame.group === "hemograma" && exame.name === "Hemoglobina Corpuscular Média (HCM)")
    const chcm = exames.filter(exame => exame.group === "hemograma" && exame.name === "Concentração da Hemoglobina Corpuscular Média (CHCM)")
    const rdw = exames.filter(exame => exame.group === "hemograma" && exame.name === "Amplitude de Distribuição dos Glóbulos Vermelhos (RDW)")
    const leucocitos = exames.filter(exame => exame.group === "hemograma" && exame.name === "Leucócitos")
    const bastonetes = exames.filter(exame => exame.group === "hemograma" && exame.name === "Bastonetes")
    const segmentados = exames.filter(exame => exame.group === "hemograma" && exame.name === "Segmentados")
    const linfocitos = exames.filter(exame => exame.group === "hemograma" && exame.name === "Linfócitos")
    const monocitos = exames.filter(exame => exame.group === "hemograma" && exame.name === "Monócitos")
    const eosinofilos = exames.filter(exame => exame.group === "hemograma" && exame.name === "Eosinófilos")
    const basofilos = exames.filter(exame => exame.group === "hemograma" && exame.name === "Basófilos")
    const plaquetas = exames.filter(exame => exame.group === "hemograma" && exame.name === "Plaquetas")

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
                    exames={hemacias}
                />
                <Divider my={2} />
                <ExameGroup
                    title="Hemoglobina"
                    exames={hemoglobina}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Hematócrito"
                    exames={hematocrito}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="VCM"
                    exames={vcm}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="HCM"
                    exames={hcm}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="CHCM"
                    exames={chcm}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="RDW"
                    exames={rdw}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Leucócitos"
                    exames={leucocitos}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Bastonetes"
                    exames={bastonetes}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Segmentados"
                    exames={segmentados}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Linfócitos"
                    exames={linfocitos}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Monócitos"
                    exames={monocitos}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Eosinófilos"
                    exames={eosinofilos}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Basófilos"
                    exames={basofilos}
                    iconSrc="red-blood-cell.svg"
                />
                <Divider my={2} />
                <ExameGroup
                    title="Plaquetas"
                    exames={plaquetas}
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

    function renderizaExame(exame: Exame, isExpanded: boolean) {
        return (
            <>
                {isExpanded && <FaixaDeReferencia faixa={[4, 7]} value={exame.value} />}
                <ExamePannel
                    data={exame.date}
                    title="Hemácias"
                    valor={exame.value}
                    faixa={[3.4, 6.6]}
                    units={"milhões/µL"}
                />
            </>
        )
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
                    {exames.map(exame => renderizaExame(exame, isExpanded))}
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
    data: Date;
};

function ExamePannel({ data, title, valor, faixa, units }: ExamePannelProps) {
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
                <Text fontSize={["sm", "sm"]} fontFamily={"mono"} color="gray">
                    {data.toLocaleString()}
                </Text>
                <Spacer />
                <Text
                    fontSize={["lg", "xl"]}
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
        <Slider isReadOnly aria-label="slider-ex-6" marginBottom={15} defaultValue={sliderPos}>
            <SliderMark value={15} mt={4} fontSize="sm">
                Anemia
            </SliderMark>
            <SliderMark value={67} mt={4} ml={'15%'} fontSize="sm">
                Alto
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
