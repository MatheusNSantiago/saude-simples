import {
    VStack,
    Text,
    Heading,
    IconButton,
    Image,
    Box,
    Container,
    HStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { User } from "../models/User";
import BioImpedancia from "../components/BioImpedancia";
import Hemograma from "../components/Hemograma";

const Overview = () => {
    const user = User.getFakeUser();

    return (
            <VStack
                alignItems="flex-start"
                width="full"
                px={10}
                pt={6}
                spacing={6}
            >
                <HStack height={16} width="full">
                    <Image src={user.foto!} height={16} rounded={14} />
                    <VStack
                        h={16}
                        w="full"
                        pl={5}
                        alignItems="flex-start"
                        justify={"center"}
                        spacing={1.5}
                    >
                        <Text fontWeight={"bold"} fontSize={"xl"} m={0}>
                            {user.nome}
                        </Text>
                        <Text fontSize={"sm"}>{user.idade} anos</Text>
                    </VStack>
                    {/* <DebugUser /> */}
                </HStack>
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
