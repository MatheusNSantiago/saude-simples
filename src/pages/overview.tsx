import {
    VStack,
    Text,
    Heading,
    IconButton,
    Image,
    Box,
} from "@chakra-ui/react";

import { User } from "../models/User";
import BioImpedancia from "../components/BioImpedancia";
import Hemograma from "../components/Hemograma";

const Overview = () => {
    const user = User.getFakeUser();

    return (
        <VStack alignItems="flex-start" width="full" px={8} pt={6} spacing={6}>
            <Heading size="xl">Visão Geral</Heading>
            <BioImpedancia user={user} />
            <Hemograma user={user} />

            {/* <HStack overflowX="auto" w="100%" pr="4" className="hide-scroll">
                <Card label="Coração" imgSrc="coracao.png" caption="3 exames" />
                <Card
                    label="Vitaminas"
                    imgSrc="coracao.png"
                    caption="2 exames"
                />
                <Card label="Sei lá" imgSrc="coracao.png" caption="12 exames" />
                <Card
                    label="Outra parada"
                    imgSrc="coracao.png"
                    caption="12 exames"
                />
            </HStack> */}
        </VStack>
    );
};

export default Overview;

type CardProps = {
    label: string;
    caption: string;
    imgSrc: string;
};

const Card = ({ label, caption, imgSrc }: CardProps) => {
    return (
        <Box>
            <IconButton
                aria-label={label}
                w="140px"
                h="200px"
                bgGradient='linear(-45deg, red, #FF0080) rounded="2xl"'
                rounded="2xl"
                shadow="2xl"
                _focus={{ bgColor: "white" }}
            >
                <VStack pb="7" align={"flex-start"} w="55%">
                    <Image
                        aria-label="Coração"
                        rounded="2xl"
                        bgColor={"white"}
                        h={"fit-content"}
                        mt="6"
                        shadow="2xl"
                        p="4"
                        src={imgSrc}
                    />
                    <Text color="white" fontWeight={"bold"}>
                        {label}
                    </Text>
                    <Text color="white">{caption}</Text>
                </VStack>
            </IconButton>
        </Box>
    );
};

