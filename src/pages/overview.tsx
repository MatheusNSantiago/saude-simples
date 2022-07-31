import { VStack, Heading } from "@chakra-ui/react";

import { User } from "../models/User";
import BioImpedancia from "../components/BioImpedancia";
import Hemograma from "../components/Hemograma";

const Overview = () => {
    const user = User.getFakeUser();

    return (
        <VStack alignItems="flex-start" pt={6} spacing={6}>
            <Heading size="xl">Visão Geral</Heading>
            <BioImpedancia user={user} />
            <Hemograma user={user} />
        </VStack>
    );
};

export default Overview;
