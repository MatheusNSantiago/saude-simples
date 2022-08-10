import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Exame, IExame } from "../models/Exame";
import { User } from "../models/User";
import { IUser } from "../server/models/User";

const initialState: IUser = {
    nome: "",
    cpf: "",
    nascimento: Date.now(),
    altura: -1,
    exames: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { nome, cpf, nascimento, altura, exames, email, foto } =
                action.payload;

            state.nome = nome;
            state.cpf = cpf;
            state.nascimento = Date.parse(nascimento);
            state.altura = altura;
            state.exames = exames;
            state.email = email;
            state.foto = foto;
        },
        addExames: (state, action: PayloadAction<IExame[]>) => {
            const exames = action.payload;

            state.exames = [...state.exames, ...exames];
        },
        updateProfile: (state, action) => {
            const { name, altura, email } = action.payload;
            
            state.nome = name;
            state.altura = altura;
            state.email = email;
        },
    },
});

export const { setUser, addExames, updateProfile } = userSlice.actions;

export const selectUser = ({ user }: RootState) => {
    if (user.nome === "") return undefined;

    return new User(
        user.nome,
        user.cpf,
        new Date(user.nascimento),
        user.exames.map(
            ({ group, name, value, date }) =>
                new Exame(group, name, value, new Date(date))
        ),
        user.altura,
        user.email,
        user.foto
    );
};

export default userSlice.reducer;
