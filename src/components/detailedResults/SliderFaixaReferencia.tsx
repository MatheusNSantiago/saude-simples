import {
    Box,
    Circle,
    HStack,
    Slider,
    SliderMark,
    SliderThumb,
} from "@chakra-ui/react";

type FaixaDeReferenciaProps = {
    value: number;
    faixa: [low: number, high: number];
};

function FaixaDeReferencia({ value, faixa }: FaixaDeReferenciaProps) {
    const [low, high] = faixa;

    const curColor = value < low || value > high ? "red.300" : "green.300";

    const sliderPos = value * (33.3 / low);

    return (
        <Slider isReadOnly aria-label="slider-ex-6" defaultValue={sliderPos}>
            <SliderMark value={15} mt={4} fontSize="sm">
                Anemia
            </SliderMark>
            <SliderMark value={67} mt={4} ml={"15%"} fontSize="sm">
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

export default FaixaDeReferencia;
