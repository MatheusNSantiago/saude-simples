import {
    Box,
    Center,
    VStack,
    Button,
    Checkbox,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
} from "@chakra-ui/react";
import { FaLock, FaRegIdCard } from "react-icons/fa";
import { useState } from "react";
import { NextPage } from "next";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser, selectUser } from "../features/userSlice";
import { useRouter } from "next/router";

const Login: NextPage = () => {
    var router = useRouter();
    const dispatch = useAppDispatch();
    const toast = useToast();
    const user = useAppSelector(selectUser);

    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit() {
        axios
            .get("/api/getUser", { params: { cpf: cpf } })
            .then((value) => {
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
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaRegIdCard />}
                        />
                        <Input
                            placeholder="CPF"
                            type={"number"}
                            variant="filled"
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FaLock />}
                        />
                        <Input
                            placeholder="Senha"
                            type="password"
                            variant="filled"
                            disabled
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    <Checkbox>Continuar conectado?</Checkbox>
                    <Button type="submit" width="full" onClick={onSubmit}>
                        Login
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Login;
