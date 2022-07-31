import {
    Box,
    Center,
    VStack,
    Button,
    Checkbox,
    Text,
    useToast,
    Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FaLock, FaRegIdCard } from "react-icons/fa";
import { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/userSlice";
import { useRouter } from "next/router";
import CustomInput from "../components/CustomInput";

const Login: NextPage = () => {
    var router = useRouter();
    const dispatch = useAppDispatch();
    const toast = useToast();

    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit() {
        axios
            .get("/api/getUser", { params: { cpf: cpf } })
            .then((value) => {
                setIsLoading(true);

                dispatch(setUser(value.data));

                router.push("/");
            })
            .catch(() => {
                setCpf("");

                toast({
                    title: "CPF não encontrado",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                });
            });
    }

    return (
        <Center h="100vh">
            <Box p={6} rounded="2xl" shadow="1px 1px 10px rgba(0, 0, 0, 0.2)">
                <VStack spacing={4} align="flex-start">
                    <CustomInput
                        placeholder="CPF"
                        onChange={setCpf}
                        type={"number"}
                        leftElement={<FaRegIdCard />}
                    />
                    <CustomInput
                        placeholder="Senha"
                        type="password"
                        onChange={setCpf}
                        leftElement={<FaLock />}
                        isDisabled
                    />
                    <Checkbox>Continuar conectado?</Checkbox>
                    <Button
                        type="submit"
                        width="full"
                        onClick={onSubmit}
                        isLoading={isLoading}
                    >
                        Entrar
                    </Button>
                    <Text>
                        Não tem conta?{" "}
                        <NextLink href="/signup" passHref>
                            <Link>Registrar-se</Link>
                        </NextLink>
                    </Text>
                </VStack>
            </Box>
        </Center>
    );
};

export default Login;
