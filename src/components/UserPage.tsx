import { VStack, Heading, Button, useToast, useTabs } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { selectUser, updateProfile } from "../features/userSlice";
import CustomInput from "./CustomInput";

export const UserPage = () => {
    const user = useAppSelector(selectUser)!;
    const dispatch = useDispatch();

    const toast = useToast({
        position: "bottom",
        isClosable: true,
        duration: 1500,
    });

    const [name, setName] = useState("");
    const [altura, setAltura] = useState<number | null>(null);
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function saveUser() {
        setIsLoading(true);

        const inputData = {
            cpf: user.cpf,
            name: name === "" ? user.nome : name,
            altura: altura ?? user.altura,
            email: email === "" ? user.email : email,
        };

        axios
            .put("/api/updateUser", inputData)
            .then(() => {
                let { name, altura, email } = inputData;

                dispatch(updateProfile({ name, altura, email }));

                toast({
                    title: "Usuário atualizado com sucesso",
                    status: "success",
                });
            })
            .catch((_) => {
                toast({ title: "Sei lá brother", status: "error" });
            })
            .finally(() => {
                setIsLoading(false);
                setName(""), setAltura(null), setEmail("");
            });
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
                onChange={(valor: string) =>
                    setAltura(valor === "" ? null : parseInt(valor))
                }
                value={altura?.toString() ?? ""}
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
