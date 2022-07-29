import { Button, Heading, HStack, Spacer, Text, Icon, Box } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";

const HeadingDetalhes = ({ title }: { title: string }) => {
    return (
        <Box mb={2.5}>
            <HStack w="full" align={"baseline"}>
                <Heading size="lg">{title}</Heading>
                <Spacer />
                <Button colorScheme="whiteAlpha" variant="ghost">
                    <Text fontWeight="medium" color="blackAlpha.900">
                        Mais Detalhes
                    </Text>
                    <Icon as={FaAngleRight} color="blackAlpha.900" />
                </Button>
            </HStack>
        </Box>
    );
};

export default HeadingDetalhes;
