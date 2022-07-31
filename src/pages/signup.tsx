import React from "react";
import {
    Box,
    Center,
    VStack,
    Button,
    useToast,
    Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/userSlice";
import { useRouter } from "next/router";
import CustomInput from "../components/CustomInput";

const Signup = () => {
    var router = useRouter();
    const dispatch = useAppDispatch();
    const toast = useToast();

    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState<string>();
    const [altura, setAltura] = useState<number>();
    const [email, setEmail] = useState<string>();
    const [foto, setFoto] = useState<string>();

    async function onSubmit() {
        axios
            .post("/api/registerUser", {
                cpf: cpf,
                nome: nome,
                nascimento: nascimento ? new Date(nascimento) : null,
                altura: altura,
                email: email,
                foto: foto,
            })
            .then(({ data }) => {
                dispatch(setUser(data));
                router.push("/");
            })
            .catch(() =>
                toast({
                    title: "CPF já cadastrado",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top",
                })
            );
    }
    return (
        <Center h="100vh">
            <Box p={6} rounded="2xl" shadow="1px 1px 10px rgba(0, 0, 0, 0.2)">
                <VStack spacing={4} align="flex-start">
                    <CustomInput
                        placeholder="Nome Completo"
                        onChange={setNome}
                        isRequired
                    />
                    <CustomInput placeholder="CPF" onChange={setCpf} />
                    <CustomInput
                        label="Data de Nascimento"
                        type={"date"}
                        onChange={setNascimento}
                    />
                    <CustomInput
                        placeholder="Altura (cm)"
                        type="number"
                        onChange={setAltura}
                    />
                    <Divider />
                    <CustomInput
                        placeholder="Email (opcional)"
                        onChange={setEmail}
                    />
                    <CustomInput
                        placeholder="Foto (opcional)"
                        onChange={setFoto}
                    />
                    <Button type="submit" width="full" onClick={onSubmit}>
                        Registrar
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Signup;
