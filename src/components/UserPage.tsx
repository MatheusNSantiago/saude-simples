import { VStack, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/userSlice";
import CustomInput from "./CustomInput";

export const UserPage = () => {
    const user = useAppSelector(selectUser);
    
    const [name, setName] = useState<string>(user?.nome ?? '');
    const [altura, setAltura] = useState<number>(user?.altura ?? 0);
    const [email, setEmail] = useState<string>(user?.email ?? '');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function saveUser() {
        /* TODO :: Salvar usuário */
        /* TODO :: Adicionar loading */
    }

    return (
        <VStack alignItems="flex-start" pt={6} spacing={6}>
            <Heading size="xl">Gerenciar dados</Heading>
            <CustomInput
                placeholder="Nome"
                onChange={setName}
                value={name}
                type={"string"}
            />
            <CustomInput
                placeholder="Altura (cm)"
                type="number"
                onChange={setAltura}
                value={altura.toString()}
                />
            <CustomInput
                placeholder="Email (opcional)"
                onChange={setEmail}
                value={email}
            />
            <VStack alignItems="flex-start" pt={5} />
            <Button
                type="submit"
                width="full"
                onClick={saveUser}
                isLoading={isLoading}
            >
                Salvar
            </Button>
            <VStack alignItems="flex-start" pt={10} />
        </VStack>
    );
};
