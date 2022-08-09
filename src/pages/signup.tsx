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
    const toast = useToast({
        status: "error",
        isClosable: true,
        position: "top",
    });
    const [isLoading, setisLoading] = useState(false);

    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [altura, setAltura] = useState<number>();
    const [email, setEmail] = useState<string>();
    const [foto, setFoto] = useState<string>();

    const onSubmit = async () => {
        // setisLoading(true);
        axios
            .post("/api/registerUser", {
                cpf: cpf,
                nome: nome,
                nascimento: nascimento,
                altura: altura,
                email: email,
                foto: foto,
            })
            .then((res) => {
                dispatch(setUser(res.data));
                router.push("/");
            })
            .catch(({ response }) => {
                if (response.data === "ValidationError")
                    toast({ title: "Complete os dados obrigatórios" });
                else if (response.data === "CPF já cadastrado")
                    toast({ title: "CPF já cadastrado" });
                else toast({ title: "Erro no servidor" });
            })
            .finally(() => setisLoading(false));
    };
    return (
        <Center h="100vh">
            <Box p={6} rounded="2xl" shadow="1px 1px 10px rgba(0, 0, 0, 0.2)">
                <VStack spacing={4} align="flex-start">
                    <CustomInput
                        placeholder="Nome Completo"
                        onChange={setNome}
                        value={nome}
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
                    <Button
                        type="submit"
                        width="full"
                        onClick={onSubmit}
                        isLoading={isLoading}
                    >
                        Registrar
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default Signup;
