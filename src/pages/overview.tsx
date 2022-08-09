import { VStack, Heading } from "@chakra-ui/react";

import BioImpedancia from "../components/BioImpedancia";
import Hemograma from "../components/Hemograma";

const Overview = () => {
    return (
        <VStack alignItems="flex-start" pt={6} spacing={6}>
            <Heading size="xl">Visão Geral</Heading>
            <BioImpedancia />
            <Hemograma />
        </VStack>
    );
};

export default Overview;
